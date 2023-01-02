import { Maze } from "./Pathfinding/DataTypes/Maze";
import { Dijkstra } from "./Pathfinding/Dijkstra";
import { Astar } from "./Pathfinding/Astar";

console.time('create_maze')
const m = new Maze(3000, undefined, true, 0.42, 1, true);
console.timeEnd('create_maze')

const astar = new Astar(m);
const dijkstra = new Dijkstra(m)


console.time('dijkstra')
dijkstra.solve()
console.timeEnd('dijkstra')
const dSolution = dijkstra.getSolution()
dijkstra.printSolution()

console.time('astar')
astar.solve()
console.timeEnd('astar')
const aSolution = astar.getSolution()
astar.printSolution()


console.log(dSolution.length)
console.log(aSolution.length)