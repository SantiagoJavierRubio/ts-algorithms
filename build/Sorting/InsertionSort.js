"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertionSort = void 0;
class InsertionSort {
    constructor(data) {
        this.data = data;
    }
    sort() {
        const { length } = this.data;
        for (let i = 0; i < length - 1; i++) {
            if (this.data.compare(i, i + 1)) {
                this.data.swap(i, i + 1);
                for (let j = i; j > 0; j--) {
                    if (this.data.compare(j - 1, j)) {
                        this.data.swap(j - 1, j);
                    }
                    else
                        break;
                }
            }
        }
    }
}
exports.InsertionSort = InsertionSort;
