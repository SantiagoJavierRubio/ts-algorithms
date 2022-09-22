"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const NumberData_1 = require("../Sorting/NumberData");
const BubbleSort_1 = require("../Sorting/BubbleSort");
const sortingUtils_1 = require("../Sorting/sortingUtils");
const checkIfNumbersDisordered = (collection) => {
    let res = false;
    for (let i = 0; i < collection.length - 1; i++) {
        if (collection[i] > collection[i + 1]) {
            res = true;
            break;
        }
    }
    return res;
};
describe("Bubble Sort", () => {
    describe("with number arrays", () => {
        it("should always return number array ordered correctly", () => {
            const testCollection = new NumberData_1.NumberData([]);
            const bubble = new BubbleSort_1.BubbleSort(testCollection);
            for (let i = 1; i < 1000; i += 10) {
                testCollection.data = (0, sortingUtils_1.createRandomNumArray)(i);
                bubble.sort();
                (0, chai_1.expect)(checkIfNumbersDisordered(testCollection.data)).to.be.false;
            }
        });
    });
});
