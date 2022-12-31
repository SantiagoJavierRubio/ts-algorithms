import { Node, Map } from "./Node";
import { createCanvas, Canvas } from "canvas";
import fs from "fs";

interface coordinates {
    x: number;
    y: number;
}

export class Cell extends Node {
    constructor(
        public coordinates: coordinates,
        public isWall: boolean = false,
        public isStart: boolean = false,
        public isTarget: boolean = false,
        public value: number = 0
    ) {
        super();
        if(isTarget || isStart) this.isWall = false
    }
    setValue(val: number) {
        this.value = val
    }
    print(): string {
        return `(${this.coordinates.x},${this.coordinates.y})`
    }
}

export class Maze implements Map {
    public data: Cell[] = []
    public height: number
    private canvas: Canvas
    constructor(public width: number, height?: number) {
        this.height = height || width;
        this.fillMaze()
        this.calcNeighbours();
        this.canvas = createCanvas(this.width*10, this.height*10)
    }
    private fillMaze() {
        const start = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        const target = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        this.data = new Array(this.height*this.width);
        for(let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                this.data[i*this.width+j] = new Cell(
                    {x: j, y: i},
                    Math.random() < 0.333,
                    start[0] === j && start[1] === i,
                    target[0] === j && target[1] === i
                )
            }
        }
    }
    private calcNeighbours() {
        this.data.forEach(cell => {
            const n = []
            cell.coordinates.x > 0 && n.push(this.data[(cell.coordinates.y*this.width+cell.coordinates.x)-1])
            cell.coordinates.x < this.width-1 && n.push(this.data[(cell.coordinates.y*this.width+cell.coordinates.x)+1])
            cell.coordinates.y > 0 && n.push(this.data[(cell.coordinates.y-1)*this.width+cell.coordinates.x])
            cell.coordinates.y < this.height-1 && n.push(this.data[(cell.coordinates.y+1)*this.width+cell.coordinates.x])
            cell.setNeighbours(n)
        })
    }
    print(path?: Cell[]) {
        const ctx = this.canvas.getContext('2d')
        this.data.forEach(node => {
            ctx.fillStyle = node.isWall ? "#000" : "#fff";
            ctx.fillRect(node.coordinates.x*10, node.coordinates.y*10, 10, 10)
            if(!!path && path.includes(node)) {
                ctx.fillStyle = "#0f0"
                ctx.fillRect(node.coordinates.x*10+2, node.coordinates.y*10+2, 6, 6)
            }
            if(node.isTarget || node.isStart) {
                ctx.fillStyle = "#f00"
                ctx.font = "bold 10pt"
                ctx.textAlign = "center";
                ctx.fillText(node.isStart ? "S" : "T", node.coordinates.x*10+5, node.coordinates.y*10+10)
            }
        })
        const buffer = this.canvas.toBuffer('image/png')
        fs.writeFileSync(`./src/Pathfinding/images/mazes/maze_${this.width}x${this.height}-${Date.now()}.png`, buffer);
    }
}