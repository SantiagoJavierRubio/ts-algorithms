import { Pathfinder } from "./Pathfinder";
import { Map, Node } from "./DataTypes/Node";

export class Dijkstra implements Pathfinder {
    private startNode: Node
    private solvable: boolean = false;
    constructor(public map: Map) {
        this.startNode = this.findStartingNode() || this.map.data[0]
    }
    private findStartingNode(): Node | undefined {
        return this.map.data.find(node => node.isStart)
    }
    solve() {
        this.map.cleanData()
        this.map.data.forEach(node => node.setFValue(Infinity))
        this.startNode.setFValue(0);
        const heap: Set<number> = new Set<number>([this.startNode.index]);
        while(heap.size > 0) {
            const heapIterator = heap.values()
            const currentIndex = heapIterator.next().value;
            if(currentIndex === undefined) break;
            const current = this.map.data[currentIndex];
            if(current.isTarget) {
                current.setVisited()
                break;
            };
            current.neighbours.forEach(nIndex => {
                let neighbour = this.map.data[nIndex]
                if(!neighbour.visited && !neighbour.isWall) {
                    neighbour.setFValue(current.fValue+1)
                    neighbour.setComesFrom(current.index)
                    heap.add(neighbour.index)
                }
            })
            heap.delete(currentIndex)
            current.setVisited();
        }
        this.solvable = !!this.map.data.find(node => node.isTarget && node.visited)
    }
    private calculatePath(prevNodes: number[]): number[] {
        const curr = this.map.data[prevNodes[0]];
        if(curr.isStart || !curr.comesFrom) return prevNodes;
        return this.calculatePath([curr.comesFrom, ...prevNodes])
    }
    getSolution(): number[] {
        const t = this.map.data.find(node => node.isTarget)
        if(!this.solvable || !t) {
            return []
        } 
        return this.calculatePath([t.index])  
    }
    printSolution(): void {
        const t = this.map.data.find(node => node.isTarget)
        if(!this.solvable || !t) {
            this.map.print()
            return console.log('No solution available')
        } 
        const path = this.calculatePath([t.index])  
        return this.map.print(path, 'Dijkstra')
    }
}