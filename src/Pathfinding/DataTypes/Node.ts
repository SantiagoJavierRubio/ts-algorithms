export class Node {
    constructor(
        public index: number,
        public fValue: number = 0,
        public hValue: number = 0,
        public gValue: number = 0,
        public neighbours: number[] = [],
        public isTarget: boolean = false,
        public isStart: boolean = false,
        public isWall: boolean = false,
        public visited: boolean =  false,
        public comesFrom: number | undefined = undefined
    ) {}
    setNeighbours(n: number[]) {
        this.neighbours = n
    }
    setFValue(val: number) {
        this.fValue = val 
    }
    setGValue(val: number) {
        this.gValue = val 
    }
    setHValue(val: number) {
        this.hValue = val 
    }
    setVisited(val: boolean = true) {
        this.visited = val;
    }
    setComesFrom(n?: number) {
        this.comesFrom = n
    }
    print(): string {
        return ''
    }
}

export interface NodeMap {
    data: Node[]
    wallChance: number
    resolution: number
    draw: boolean
    calculateDistance(a: number, b: number): number
    cleanData(): void
    print(data?: number[], name?: string, debug?: boolean): void
}