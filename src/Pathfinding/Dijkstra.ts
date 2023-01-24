import { Pathfinder } from "./Pathfinder";
import { NodeMap, Node } from "./DataTypes/Node";
import { PriorityQueue } from "./Helpers/PriorityQueue";

export class Dijkstra implements Pathfinder {
    private startNode: Node
    private solvable: boolean = false;
    pathDistance: number = Infinity
    constructor(public map: NodeMap) {
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
        const open = new PriorityQueue<number>()
        open.addElement(this.startNode.index, 0)
        while(!open.isEmpty()) {
            const currentIndex = open.getFirst();
            if(currentIndex === undefined) break;
            const current = this.map.data[currentIndex];
            current.setVisited()
            if(current.isTarget) {
                this.pathDistance = current.fValue;
                break;
            };
            current.neighbours.forEach(nIndex => {
                let neighbour = this.map.data[nIndex]
                let newF = current.fValue + this.map.calculateDistance(currentIndex, nIndex)
                if(!neighbour.visited && !neighbour.isWall) {
                    neighbour.setVisited()
                    if(newF < neighbour.fValue){
                        neighbour.setComesFrom(currentIndex)
                        neighbour.setFValue(newF)
                    }
                    open.addElement(nIndex, neighbour.fValue)
                }
            })
        }
        // while(heap.size > 0) {
        //     const heapIterator = heap.values()
        //     const currentIndex = heapIterator.next().value;
        //     if(currentIndex === undefined) break;
        //     const current = this.map.data[currentIndex];
        //     if(current.isTarget) {
        //         current.setVisited()
        //         this.pathDistance = current.fValue;
        //         break;
        //     };
        //     current.neighbours.forEach(nIndex => {
        //         let neighbour = this.map.data[nIndex]
        //         if(!neighbour.visited && !neighbour.isWall) {
        //             let newF = current.fValue + this.map.calculateDistance(currentIndex, nIndex)
        //             if(newF < neighbour.fValue){
        //                 neighbour.setComesFrom(currentIndex)
        //                 neighbour.setFValue(newF)
        //             }
        //             heap.add(nIndex)
        //         }
        //     })
        //     heap.delete(currentIndex)
        //     current.setVisited();
        // }
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
    printSolution(debug: boolean = false): void {
        const t = this.map.data.find(node => node.isTarget)
        if(!this.solvable || !t) {
            this.map.print()
            return console.log('No solution available')
        } 
        if(!this.map.draw) return;
        console.log("Printing Dijkstra solution...")
        console.log("Debug: ", debug)
        const path = this.calculatePath([t.index])  
        return this.map.print(path, 'Dijkstra', debug)
    }
}