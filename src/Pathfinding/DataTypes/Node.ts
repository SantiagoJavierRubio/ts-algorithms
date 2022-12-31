export class Node {
    constructor(
        public value: number = 0,
        public neighbours: Node[] = [],
        public isTarget: boolean = false,
        public isStart: boolean = false,
        public isWall: boolean = false,
        public visited: boolean =  false
    ) {}
    setNeighbours(n: Node[]) {
        this.neighbours = n
    }
    setValue(val: number) {}
    setVisited() {
        this.visited = true;
    }
    print(): string {
        return ''
    }
}

export interface Map {
    data: Node[]
}