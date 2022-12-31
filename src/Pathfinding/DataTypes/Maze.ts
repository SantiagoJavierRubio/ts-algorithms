import { Node, Map } from "./Node";

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
    public maze: Cell[][] = []
    public height: number
    constructor(public width: number, height?: number) {
        this.height = height || width;
        this.fillMaze()
        this.calcNeighbours();
        this.data = this.maze.flat()
    }
    private fillMaze() {
        const start = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        const target = [Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
        for(let i=0; i<this.height; i++) {
            this.maze.push([])
            for(let j=this.width-1; j>=0; j--) {
                this.maze[i].push(new Cell(
                    {x: j, y: i},
                    Math.random() < 0.33,
                    start[0] === j && start[1] === i,
                    target[0] === j && target[1] === i
                ))
            }
            this.maze[i].reverse()
        }
    }
    private calcNeighbours() {
        this.maze.forEach(row => {
            row.forEach(cell => {
                const n = []
                cell.coordinates.x > 0 && n.push(this.maze[cell.coordinates.y][cell.coordinates.x-1])
                cell.coordinates.x < this.width-1 && n.push(this.maze[cell.coordinates.y][cell.coordinates.x+1])
                cell.coordinates.y > 0 && n.push(this.maze[cell.coordinates.y-1][cell.coordinates.x])
                cell.coordinates.y < this.height-1 && n.push(this.maze[cell.coordinates.y+1][cell.coordinates.x])
                cell.setNeighbours(n)
            })
        })
    }
    printMaze() {
        const m = this.maze.map(row => {
            return (row.map((cell) => {
                if(cell.isStart) return 'S'
                if(cell.isTarget) return 'T'
                return cell.isWall ? '_' : ' '
            }
            ).join(' | ')+'\n')
        }).join('\n')
        return console.log(m)
    }
}