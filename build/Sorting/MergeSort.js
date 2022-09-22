"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeSort = void 0;
class MergeSort {
    constructor(data) {
        this.data = data;
    }
    sort() {
        const indexArray = [...Array(this.data.length).keys()];
        const sortedIndexes = this.mergeSort(indexArray);
        this.data.rearrange(sortedIndexes);
    }
    mergeSort(indexArray) {
        if (indexArray.length <= 1)
            return indexArray;
        const half = Math.floor(indexArray.length / 2);
        const left = this.mergeSort(indexArray.slice(0, half));
        const right = this.mergeSort(indexArray.slice(half));
        return this.merge(left, right);
    }
    merge(left, right) {
        const sorted = [];
        while (left.length && right.length) {
            if (this.data.compare(right[0], left[0])) {
                sorted.push(left.shift());
            }
            else {
                sorted.push(right.shift());
            }
        }
        return [...sorted, ...left, ...right];
    }
}
exports.MergeSort = MergeSort;
