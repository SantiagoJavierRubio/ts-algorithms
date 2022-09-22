"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberData = void 0;
class NumberData {
    constructor(data) {
        this.data = data;
    }
    get length() {
        return this.data.length;
    }
    swap(i, j) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }
    compare(i, j) {
        return this.data[i] > this.data[j];
    }
}
exports.NumberData = NumberData;
