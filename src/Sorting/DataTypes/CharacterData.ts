import { Sortable } from "../Sort";

export class CharacterData implements Sortable {
  constructor(public data: string) {}

  get length(): number {
    return this.data.length;
  }
  swap(i: number, j: number): void {
    const chars = this.data.split("");
    const iVal = chars[i];
    chars[i] = chars[j];
    chars[j] = iVal;
    this.data = chars.join("");
  }
  compare(i: number, j: number): boolean {
    return this.data[i].toLowerCase() > this.data[j].toLowerCase();
  }
  rearrange(indexes: number[]): void {
    if (indexes.length !== this.length) throw new Error('incomplete index list')
    let temp = ''
    for (let i=0; i<indexes.length; i++) {
      temp += this.data[indexes[i]]
    }
    this.data = temp;
  }
}
