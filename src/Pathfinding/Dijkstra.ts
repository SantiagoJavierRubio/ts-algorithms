import { Pathfinder } from "./Pathfinder";
import { Map, Node } from "./DataTypes/Node";

export class Dijkstra implements Pathfinder {
    startNode: Node
    solvable: boolean = false;
    constructor(public map: Map) {
        this.startNode = this.findStartingNode() || this.map.data[0]
    }
    private findStartingNode(): Node | undefined {
        return this.map.data.find(node => node.isStart)
    }
    solve() {
        this.map.data.forEach(node => node.setValue(Infinity))
        this.startNode.setValue(0);
        const heap = [this.startNode];
        while(heap.length > 0) {
            const current = heap.shift();
            current?.neighbours.forEach(neighbour => {
                if(!neighbour.visited && !neighbour.isWall) {
                    neighbour.setValue(current.value+1)
                    heap.push(neighbour)
                }
            })
            current?.setVisited();
        }
        this.solvable = !!this.map.data.find(node => node.isTarget && node.visited)
    }
    calculatePath(prevNodes: Node[]): Node[] {
        const curr = prevNodes[0];
        if(curr.isStart) return prevNodes;
        const bestNode = curr.neighbours.filter(node => node.visited && !prevNodes.includes(node)).sort((a,b) => a.value - b.value)[0]
        return this.calculatePath([bestNode, ...prevNodes])
    }
    printSolution(): void {
        const t = this.map.data.find(node => node.isTarget)
        if(!this.solvable || !t) return console.log('No solution available')
        const path = this.calculatePath([t])  
        return console.log(path.map(node => node.print()))
    }
}