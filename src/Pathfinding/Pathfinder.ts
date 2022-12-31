import { Map } from "./DataTypes/Node";

export interface Pathfinder {
    map: Map;
    solve(): void;
    getSolution(): number[];
    printSolution(): void;
}