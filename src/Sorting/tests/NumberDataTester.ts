import { NumberData } from "../DataTypes/NumberData";
import { Sorter, SorterConstructor } from "../Sort";
import { expect } from "chai";

const checkIfNumbersDisordered = (collection: number[]): boolean => {
  let res = false;
  for (let i = 0; i < collection.length - 1; i++) {
    if (collection[i] > collection[i + 1]) {
      res = true;
      break;
    }
  }
  return res;
};

function createRandomNumArray(
  length?: number | undefined,
  maxSize: number = 1000,
  decimals: boolean = false
): number[] {
  const dataLength = length || Math.random() * 100;
  const fakeData: number[] = [];
  for (let i = 0; i < dataLength; i++) {
    const newVal = (Math.random() - Math.random()) * maxSize;
    fakeData.push(decimals ? newVal : Math.round(newVal));
  }
  return fakeData;
}

export class NumberDataTester {
  testCollection = new NumberData([]);
  sorter: Sorter;
  constructor(SorterConstructor: SorterConstructor<Sorter>) {
    this.sorter = new SorterConstructor(this.testCollection);
  }

  run(): void {
    for (let i = 1; i < 100; i++) {
      this.testCollection.data = createRandomNumArray(i*100, i * 100, i % 2 > 0);
      this.sorter.sort();
      expect(checkIfNumbersDisordered(this.testCollection.data)).to.be.false;
    }
  }
}
