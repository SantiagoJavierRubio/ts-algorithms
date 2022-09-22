"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const BubbleSort_1 = require("../BubbleSort");
const InsertionSort_1 = require("../InsertionSort");
const SelectionSort_1 = require("../SelectionSort");
const MergeSort_1 = require("../MergeSort");
const NumberDataTester_1 = require("./NumberDataTester");
const CharacterDataTester_1 = require("./CharacterDataTester");
const LinkedListTester_1 = require("./LinkedListTester");
describe("Bubble Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(BubbleSort_1.BubbleSort);
            tester.run();
        });
    });
    describe("with strings", () => {
        it("should always return string in order (letters only alphabetical)", () => {
            const tester = new CharacterDataTester_1.CharacterDataTester(BubbleSort_1.BubbleSort);
            tester.run();
        });
    });
    describe("with linked lists", () => {
        it("should always return linked list with values in order", () => {
            const tester = new LinkedListTester_1.LinkedListTester(BubbleSort_1.BubbleSort);
            tester.run();
        });
    });
});
describe("Insertion Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(InsertionSort_1.InsertionSort);
            tester.run();
        });
    });
    describe("with strings", () => {
        it("should always return string in order (letters only alphabetical)", () => {
            const tester = new CharacterDataTester_1.CharacterDataTester(InsertionSort_1.InsertionSort);
            tester.run();
        });
    });
    describe("with linked lists", () => {
        it("should always return linked list with values in order", () => {
            const tester = new LinkedListTester_1.LinkedListTester(InsertionSort_1.InsertionSort);
            tester.run();
        });
    });
});
describe("Selection Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(SelectionSort_1.SelectionSort);
            tester.run();
        });
    });
    describe("with strings", () => {
        it("should always return string in order (letters only alphabetical)", () => {
            const tester = new CharacterDataTester_1.CharacterDataTester(SelectionSort_1.SelectionSort);
            tester.run();
        });
    });
    describe("with linked lists", () => {
        it("should always return linked list with values in order", () => {
            const tester = new LinkedListTester_1.LinkedListTester(SelectionSort_1.SelectionSort);
            tester.run();
        });
    });
});
describe("Merge Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(MergeSort_1.MergeSort);
            tester.run();
        });
    });
    describe("with strings", () => {
        it("should always return string in order (letters only alphabetical)", () => {
            const tester = new CharacterDataTester_1.CharacterDataTester(MergeSort_1.MergeSort);
            tester.run();
        });
    });
    describe("with linked lists", () => {
        it("should always return linked list with values in order", () => {
            const tester = new LinkedListTester_1.LinkedListTester(MergeSort_1.MergeSort);
            tester.run();
        });
    });
});
