export interface Sortable {
  swap(i: number, j: number): void;
  compare(i: number, j: number): boolean;
  length: number;
  rearrange(indexes: number[]): void;
}

export interface Sorter {
  sort(): void;
  data: Sortable;
}

export type SorterConstructor<T> = new(...args: any[]) => T