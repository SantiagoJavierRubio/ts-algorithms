import { Sortable } from "../Sort";

export class NumberData implements Sortable{
  constructor(public data: number[]) {}

  get length(): number {
    return this.data.length;
  }
  swap(i: number, j: number): void {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  compare(i: number, j: number): boolean {
    return this.data[i] > this.data[j];
  }
  rearrange(indexes: number[]): void {
    if (indexes.length !== this.length) throw new Error('incomplete index list')
    const temp = []
    for (let i=0; i<indexes.length; i++) {
      temp[i] = this.data[indexes[i]]
    }
    this.data = temp;
  }
}
