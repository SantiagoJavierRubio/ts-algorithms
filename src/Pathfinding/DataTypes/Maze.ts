import { Node, NodeMap } from "./Node";
import { createCanvas, Canvas } from "canvas";
import fs from "fs";

interface coordinates {
    x: number;
    y: number;
}

export class Cell extends Node {
    constructor(
        index: number,
        public coordinates: coordinates,
        public isWall: boolean = false,
        public isStart: boolean = false,
        public isTarget: boolean = false,
        public fValue: number = 0
    ) {
        super(index);
        if(isTarget || isStart) this.isWall = false
    }
    print(): string {
        return `(${this.coordinates.x},${this.coordinates.y})`
    }
}

export class Maze implements NodeMap {
    public data: Cell[] = []
    public height: number
    private canvas?: Canvas
    constructor(
        public width: number,
        height?: number,
        public draw: boolean = false,
        public wallChance: number = 0,
        public resolution: number = 10,
        public allowDiagonals: boolean = false
    ) {
        this.height = height || width;
        this.fillMaze()
        this.calcNeighbours();
        this.canvas = draw ? createCanvas(this.width*this.resolution, this.height*this.resolution) : undefined
    }
    private fillMaze() {
        const start = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        const target = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        this.data = new Array(this.height*this.width);
        for(let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                this.data[i*this.width+j] = new Cell(
                    i*this.width + j,
                    {x: j, y: i},
                    Math.random() < this.wallChance,
                    start[0] === j && start[1] === i,
                    target[0] === j && target[1] === i
                )
            }
        }
    }
    private calcNeighbours() {
        this.data.forEach(cell => {
            const n = []
            let up = cell.coordinates.y > 0
            let down = cell.coordinates.y < this.height-1
            let left = cell.coordinates.x > 0
            let right = cell.coordinates.x < this.width-1
            if(left) {
                n.push(this.data[(cell.coordinates.y*this.width+cell.coordinates.x)-1].index)
                this.allowDiagonals && up && n.push(this.data[((cell.coordinates.y-1)*this.width+cell.coordinates.x)-1].index)
                this.allowDiagonals && down && n.push(this.data[((cell.coordinates.y+1)*this.width+cell.coordinates.x)-1].index)
            } 
            if(right){
                n.push(this.data[(cell.coordinates.y*this.width+cell.coordinates.x)+1].index)
                this.allowDiagonals && up && n.push(this.data[((cell.coordinates.y-1)*this.width+cell.coordinates.x)+1].index)
                this.allowDiagonals && down && n.push(this.data[((cell.coordinates.y+1)*this.width+cell.coordinates.x)+1].index)
            } 
            up && n.push(this.data[(cell.coordinates.y-1)*this.width+cell.coordinates.x].index)
            down && n.push(this.data[(cell.coordinates.y+1)*this.width+cell.coordinates.x].index) 
            cell.setNeighbours(n)
        })
    }
    cleanData() {
        this.data.forEach(node => {
            node.setComesFrom(undefined);
            node.setFValue(0);
            node.setGValue(0);
            node.setHValue(0);
            node.visited = false;
        })
    }
    calculateDistance(a: number, b: number): number {
        let nodeA = this.data[a];
        let nodeB = this.data[b];
        let c1 = Math.pow((nodeB.coordinates.x - nodeA.coordinates.x), 2)
        let c2 = Math.pow((nodeB.coordinates.y - nodeA.coordinates.y), 2)
        return Math.sqrt(c1+c2)
    }
    print(path?: number[], name?: string, debug: boolean = false) {
        if(!this.canvas) return;
        const ctx = this.canvas.getContext('2d')
        this.data.forEach(node => {
            ctx.fillStyle = node.isWall ? "#000" : node.visited ? '#ADD8E6' : "#fff";
            ctx.fillRect(node.coordinates.x*this.resolution, node.coordinates.y*this.resolution, this.resolution, this.resolution)
            let margin = Math.floor(this.resolution/5)
            if(!!path && path.includes(node.index)) {
                ctx.fillStyle = "#0f0"
                ctx.fillRect(
                    node.coordinates.x*this.resolution + margin,
                    node.coordinates.y*this.resolution + margin,
                    this.resolution - margin*2,
                    this.resolution - margin*2
                )
            }
            if(node.isTarget || node.isStart) {
                ctx.fillStyle = "#f00"
                ctx.font = `${Math.floor(this.resolution/2)}px`
                ctx.textAlign = "center";
                ctx.fillText(
                    node.isStart ? "S" : "T",
                    node.coordinates.x*this.resolution + this.resolution/2,
                    node.coordinates.y*this.resolution + this.resolution/2 + margin,
                )
            } 
            else if(debug) {
                ctx.fillStyle = "#000";
                ctx.font = "10px";   
                ctx.textAlign = "left";
                const text = `f=${node.fValue.toFixed(2)}\ng=${node.gValue}\nh=${node.hValue.toFixed(2)}`
                ctx.fillText(
                    text,
                    node.coordinates.x*this.resolution + margin,
                    node.coordinates.y*this.resolution + margin,
                    this.resolution
                )
            }
        })
        const buffer = this.canvas.toBuffer('image/png')
        let solved = !!path ? 'solved' : 'raw'
        fs.writeFileSync(`./src/Pathfinding/images/mazes/maze_${this.width}x${this.height}-${solved}${name ? '_with_'+name : ''}-${Date.now()}.png`, buffer);
    }
}