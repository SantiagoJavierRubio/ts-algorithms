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
    setVisited() {
        this.visited = true;
    }
    setComesFrom(n?: number) {
        this.comesFrom = n
    }
    print(): string {
        return ''
    }
}

export interface Map {
    data: Node[]
    wallChance: number
    calculateDistance(a: number, b: number): number
    cleanData(): void
    print(data?: number[], name?: string): void
}