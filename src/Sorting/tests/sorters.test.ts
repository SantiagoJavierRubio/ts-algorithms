import "mocha";
import { BubbleSort } from "../BubbleSort";
import { InsertionSort } from "../InsertionSort";
import { SelectionSort } from "../SelectionSort";
import { MergeSort } from "../MergeSort";
import { NumberDataTester } from "./NumberDataTester";
import { CharacterDataTester } from "./CharacterDataTester";
import { LinkedListTester } from "./LinkedListTester";

describe("Bubble Sort", () => {
  describe("with number arrays", () => {
    it("should always return number array ordered from smallest to biggest", () => {
      const tester = new NumberDataTester(BubbleSort);
      tester.run();
    });
  });
  describe("with strings", () => {
    it("should always return string in order (letters only alphabetical)", () => {
      const tester = new CharacterDataTester(BubbleSort);
      tester.run();
    });
  });
  describe("with linked lists", () => {
    it("should always return linked list with values in order", () => {
      const tester = new LinkedListTester(BubbleSort);
      tester.run();
    });
  });
});
describe("Insertion Sort", () => {
  describe("with number arrays", () => {
    it("should always return number array ordered from smallest to biggest", () => {
      const tester = new NumberDataTester(InsertionSort);
      tester.run();
    });
  });
  describe("with strings", () => {
    it("should always return string in order (letters only alphabetical)", () => {
      const tester = new CharacterDataTester(InsertionSort);
      tester.run();
    });
  });
  describe("with linked lists", () => {
    it("should always return linked list with values in order", () => {
      const tester = new LinkedListTester(InsertionSort);
      tester.run();
    });
  });
});
describe("Selection Sort", () => {
  describe("with number arrays", () => {
    it("should always return number array ordered from smallest to biggest", () => {
      const tester = new NumberDataTester(SelectionSort);
      tester.run();
    });
  });
  describe("with strings", () => {
    it("should always return string in order (letters only alphabetical)", () => {
      const tester = new CharacterDataTester(SelectionSort);
      tester.run();
    });
  });
  describe("with linked lists", () => {
    it("should always return linked list with values in order", () => {
      const tester = new LinkedListTester(SelectionSort);
      tester.run();
    });
  });
});
describe("Merge Sort", () => {
  describe("with number arrays", () => {
    it("should always return number array ordered from smallest to biggest", () => {
      const tester = new NumberDataTester(MergeSort);
      tester.run();
    });
  });
  describe("with strings", () => {
    it("should always return string in order (letters only alphabetical)", () => {
      const tester = new CharacterDataTester(MergeSort);
      tester.run();
    });
  });
  describe("with linked lists", () => {
    it("should always return linked list with values in order", () => {
      const tester = new LinkedListTester(MergeSort);
      tester.run();
    });
  });
});
