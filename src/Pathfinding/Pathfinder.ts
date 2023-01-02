import { NodeMap } from "./DataTypes/Node";

export interface Pathfinder {
    map: NodeMap;
    solve(): void;
    getSolution(): number[];
    printSolution(debug?: boolean): void;
}