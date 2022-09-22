import { Sortable, Sorter } from "./Sort";

export class SelectionSort implements Sorter {
  constructor(public data: Sortable) {}

  sort(): void {
    const { length } = this.data;
    for (let i = 0; i < length; i++) {
      let min = i;
      for (let j = i + 1; j < length; j++) {
        if (this.data.compare(min, j)) {
          min = j;
        }
      }
      if (min === i) continue;
      this.data.swap(i, min);
    }
  }
}
