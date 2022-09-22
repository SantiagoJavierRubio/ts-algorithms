"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleSort = void 0;
class BubbleSort {
    constructor(data) {
        this.data = data;
    }
    sort() {
        const { length } = this.data;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                if (this.data.compare(j, j + 1)) {
                    this.data.swap(j, j + 1);
                }
            }
        }
    }
}
exports.BubbleSort = BubbleSort;
