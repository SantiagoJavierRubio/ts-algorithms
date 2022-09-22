import { Sortable, Sorter } from "./Sort";

export class BubbleSort implements Sorter {
  constructor(public data: Sortable) {}
  sort(): void {
    const { length } = this.data;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (this.data.compare(j, j + 1)) {
          this.data.swap(j, j + 1);
        }
      }
    }
  }
}
