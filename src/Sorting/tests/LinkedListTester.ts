import { LinkedList } from "../DataTypes/LinkedList";
import { Sorter, SorterConstructor } from "../Sort";
import { expect } from "chai";

const checkIfNumbersDisordered = (collection: LinkedList): boolean => {
  let res = false;
  for (let i = 0; i < collection.length - 1; i++) {
    if (collection.at(i).data > collection.at(i + 1).data) {
      res = true;
      break;
    }
  }
  return res;
};

function addRandomNums(
  list: LinkedList,
  length?: number | undefined,
  maxSize: number = 1000,
  decimals: boolean = false
): void {
  const dataLength = length || Math.random() * 100;
  for (let i = 0; i < dataLength; i++) {
    const newVal = (Math.random() - Math.random()) * maxSize;
    list.add(decimals ? newVal : Math.round(newVal));
  }
}

export class LinkedListTester {
  testCollection = new LinkedList();
  sorter: Sorter;
  constructor(SorterConstructor: SorterConstructor<Sorter>) {
    this.sorter = new SorterConstructor(this.testCollection);
  }

  run(): void {
    for (let i = 1; i < 10; i++) {
      addRandomNums(this.testCollection, i*10, i * 100, i % 2 > 0);
      this.sorter.sort();
      expect(checkIfNumbersDisordered(this.testCollection)).to.be.false;
    }
  }
}
