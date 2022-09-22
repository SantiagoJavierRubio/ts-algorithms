"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const BubbleSort_1 = require("../BubbleSort");
const InsertionSort_1 = require("../InsertionSort");
const SelectionSort_1 = require("../SelectionSort");
const NumberDataTester_1 = require("./NumberDataTester");
describe("Bubble Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(BubbleSort_1.BubbleSort);
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
});
describe("Selection Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered from smallest to biggest", () => {
            const tester = new NumberDataTester_1.NumberDataTester(SelectionSort_1.SelectionSort);
            tester.run();
        });
    });
});
