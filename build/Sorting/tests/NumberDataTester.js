"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberDataTester = void 0;
const NumberData_1 = require("../DataTypes/NumberData");
const chai_1 = require("chai");
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
function createRandomNumArray(length, maxSize = 1000, decimals = false) {
    const dataLength = length || Math.random() * 100;
    const fakeData = [];
    for (let i = 0; i < dataLength; i++) {
        const newVal = (Math.random() - Math.random()) * maxSize;
        fakeData.push(decimals ? newVal : Math.round(newVal));
    }
    return fakeData;
}
class NumberDataTester {
    constructor(SorterConstructor) {
        this.testCollection = new NumberData_1.NumberData([]);
        this.sorter = new SorterConstructor(this.testCollection);
    }
    run() {
        for (let i = 1; i < 100; i++) {
            this.testCollection.data = createRandomNumArray(i * 100, i * 100, i % 2 > 0);
            this.sorter.sort();
            (0, chai_1.expect)(checkIfNumbersDisordered(this.testCollection.data)).to.be.false;
        }
    }
}
exports.NumberDataTester = NumberDataTester;
