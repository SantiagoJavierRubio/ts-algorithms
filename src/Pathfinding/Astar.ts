import { Pathfinder } from "./Pathfinder";
import { NodeMap, Node } from "./DataTypes/Node";
import * as TimSort from "timsort"

export class Astar implements Pathfinder {
    private startNode: Node | undefined
    private endNode: Node | undefined
    private solvable: boolean = false
    constructor(public map: NodeMap) {
        this.startNode = this.map.data.find(node => node.isStart)
        this.endNode = this.map.data.find(node => node.isTarget)
    }
    solve(): void {
        this.map.cleanData()
        if(!this.startNode || !this.endNode) return
        this.map.data.forEach(node => {
            if(!node.isStart) {
                node.setGValue(Infinity)
                node.setFValue(Infinity)
            }
        })
        const open = [this.startNode.index]
        const closed: Set<number> = new Set<number>()
        while(open.length > 0) {
            TimSort.sort<number>(open, (a, b) => this.map.data[a].fValue - this.map.data[b].fValue)
            // open.sort((a,b) => this.map.data[a].fValue - this.map.data[b].fValue)
            const currentIndex = open.shift()
            if(currentIndex === undefined) break;
            const current = this.map.data[currentIndex]
            current.setVisited();
            closed.add(currentIndex)
            if(current.isTarget) break;
            for(let nIndex of current.neighbours) {
                let neighbour = this.map.data[nIndex];
                if(closed.has(nIndex) || neighbour.isWall) continue;
                if(neighbour.gValue > current.gValue+1) {
                    neighbour.setGValue(current.gValue+1)
                    neighbour.setHValue(this.map.calculateDistance(this.endNode?.index || 0, nIndex))
                    neighbour.setFValue(neighbour.gValue+neighbour.hValue)
                    neighbour.setComesFrom(currentIndex)
                    open.push(nIndex)
                }
            }
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
    printSolution(debug: boolean = false): void {
        if(!this.solvable || !this.endNode) {
            return console.log('No solution available')
        }
        if(!this.map.draw) return;
        console.log("Printing A* solution...")
        console.log("Debug: ", debug)
        const path = this.getSolution()
        return this.map.print(path, 'Astar', debug);
    }
}

