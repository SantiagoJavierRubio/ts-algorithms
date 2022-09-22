"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedListTester = void 0;
const LinkedList_1 = require("../DataTypes/LinkedList");
const chai_1 = require("chai");
const checkIfNumbersDisordered = (collection) => {
    let res = false;
    for (let i = 0; i < collection.length - 1; i++) {
        if (collection.at(i).data > collection.at(i + 1).data) {
            res = true;
            break;
        }
    }
    return res;
};
function addRandomNums(list, length, maxSize = 1000, decimals = false) {
    const dataLength = length || Math.random() * 100;
    for (let i = 0; i < dataLength; i++) {
        const newVal = (Math.random() - Math.random()) * maxSize;
        list.add(decimals ? newVal : Math.round(newVal));
    }
}
class LinkedListTester {
    constructor(SorterConstructor) {
        this.testCollection = new LinkedList_1.LinkedList();
        this.sorter = new SorterConstructor(this.testCollection);
    }
    run() {
        for (let i = 1; i < 10; i++) {
            addRandomNums(this.testCollection, i * 100, i * 100, i % 2 > 0);
            this.sorter.sort();
            (0, chai_1.expect)(checkIfNumbersDisordered(this.testCollection)).to.be.false;
        }
    }
}
exports.LinkedListTester = LinkedListTester;
