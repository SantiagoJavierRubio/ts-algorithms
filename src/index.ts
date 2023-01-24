import { Maze } from "./Pathfinding/DataTypes/Maze";
import { Dijkstra } from "./Pathfinding/Dijkstra";
import { Astar } from "./Pathfinding/Astar";
import fs from "fs"


function run() {
    const m = new Maze(100, 100, true, 0.48, true, 50);
    
    const astar = new Astar(m)
    const dijkstra = new Dijkstra(m)
    
    dijkstra.solve()
    dijkstra.printSolution(true)
    const dS = dijkstra.getSolution().length
    astar.solve()
    astar.printSolution(true)
    const aS = astar.getSolution().length

    console.log(dijkstra.pathDistance, dS)
    console.log(astar.pathDistance, aS)
    console.log('\n')
    if(astar.pathDistance !== dijkstra.pathDistance && dS !== aS) process.exit()
    // if(dijkstra.pathDistance.toFixed(2) !== astar.pathDistance.toFixed(2)) console.log('dif')
}

setInterval(run, 1000)
