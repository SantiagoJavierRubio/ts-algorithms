"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionSort = void 0;
class SelectionSort {
    constructor(data) {
        this.data = data;
    }
    sort() {
        const { length } = this.data;
        for (let i = 0; i < length; i++) {
            let min = i;
            for (let j = i + 1; j < length; j++) {
                if (this.data.compare(min, j)) {
                    min = j;
                }
            }
            if (min === i)
                continue;
            this.data.swap(i, min);
        }
    }
}
exports.SelectionSort = SelectionSort;
