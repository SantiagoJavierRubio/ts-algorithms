import { Pathfinder } from "./Pathfinder";
import { Map, Node } from "./DataTypes/Node";

export class Astar implements Pathfinder {
    private startNode: Node | undefined
    private endNode: Node | undefined
    private solvable: boolean = false
    constructor(public map: Map) {
        this.startNode = this.map.data.find(node => node.isStart)
        this.endNode = this.map.data.find(node => node.isTarget)
    }
    solve(): void {
        this.map.cleanData()
        if(!this.startNode || !this.endNode) return
        this.map.data.forEach(node => !node.isStart && node.setGValue(Infinity))
        const open = [this.startNode.index]
        const closed: Set<number> = new Set<number>()
        while(open.length > 0) {
            open.sort((a,b) => this.map.data[a].fValue - this.map.data[b].fValue)
            const currentIndex = open.shift()
            if(currentIndex === undefined) break;
            const current = this.map.data[currentIndex]
            current.visited = true;
            closed.add(current.index)
            if(current.isTarget) break;
            current.neighbours.filter(n => !closed.has(n) && !this.map.data[n].isWall)
            .forEach(nIndex => {
                let neighbour = this.map.data[nIndex]
                if(neighbour.isWall) closed.add(nIndex)
                if(neighbour.gValue > current.gValue+1 && !neighbour.isWall) {
                    neighbour.setGValue(current.gValue+1)
                    neighbour.setHValue(this.map.calculateDistance(currentIndex, this.endNode?.index || 0))
                    neighbour.setFValue(neighbour.gValue+neighbour.hValue)
                    neighbour.setComesFrom(currentIndex)
                    open.push(nIndex)
                }
            })
        }
        this.solvable = !!closed.has(this.endNode.index)
    }
    private calculatePath(prevNodes: number[]): number[] {
        const curr = this.map.data[prevNodes[0]]
        if(curr.isStart || !curr.comesFrom) return prevNodes;
        return this.calculatePath([curr.comesFrom, ...prevNodes])
    }
    getSolution(): number[] {
        if(!this.solvable || !this.endNode) {
            return []
        }
        return this.calculatePath([this.endNode.index])
    }
    printSolution(): void {
        if(!this.solvable || !this.endNode) {
            return console.log('No solution available')
        }
        const path = this.getSolution()
        return this.map.print(path, 'Astar');
    }
}

