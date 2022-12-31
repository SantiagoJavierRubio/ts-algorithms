import { BubbleSort } from "./Sorting/BubbleSort";
import { SelectionSort } from "./Sorting/SelectionSort";
import { InsertionSort } from "./Sorting/InsertionSort";
import { MergeSort } from "./Sorting/MergeSort";
import { NumberData } from "./Sorting/DataTypes/NumberData";
import { CharacterData } from "./Sorting/DataTypes/CharacterData";
import { LinkedList } from "./Sorting/DataTypes/LinkedList";

import { Maze } from "./Pathfinding/DataTypes/Maze";
import { Dijkstra } from "./Pathfinding/Dijkstra";

const m = new Maze(25);

m.printMaze()

const d = new Dijkstra(m)

d.solve();
d.printSolution();


