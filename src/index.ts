import { Maze } from "./Pathfinding/DataTypes/Maze";
import { Dijkstra } from "./Pathfinding/Dijkstra";

const m = new Maze(20);

const d = new Dijkstra(m)

d.solve();
d.printSolution();


