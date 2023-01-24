import { Pathfinder } from "./Pathfinder";
import { NodeMap, Node } from "./DataTypes/Node";
import { PriorityQueue } from "./Helpers/PriorityQueue";

export class Astar implements Pathfinder {
    private startNode: Node | undefined
    private endNode: Node | undefined
    private solvable: boolean = false
    pathDistance: number = Infinity
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
            } else {
                node.setHValue(this.map.calculateDistance(node.index, this.endNode?.index || 0))
                node.setFValue(node.hValue)
            }
        })
        const closed: Set<number> = new Set<number>()
        const open = new PriorityQueue<Node>();
        open.addElement(this.startNode, 0)
        while(!open.isEmpty()) {
            const current = open.getFirst();
            if(!current) break;
            closed.add(current.index);
            if(current.isTarget) {
                this.pathDistance = current.gValue
                break;
            } 
            for(let nIndex of current.neighbours) {
                let neighbour = this.map.data[nIndex]
                let newG = this.map.calculateDistance(current.index, nIndex) + current.gValue
                if(closed.has(nIndex) && (newG >= neighbour.gValue) || neighbour.isWall) continue;
                if(newG < neighbour.gValue) {
                    neighbour.setComesFrom(current.index)
                    let h = this.map.calculateDistance(this.endNode?.index || 0, nIndex)
                    neighbour.setGValue(newG)
                    neighbour.setHValue(h)
                    neighbour.setFValue(newG+h)
                    open.addElement(neighbour, neighbour.fValue)
                    neighbour.setVisited()
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

