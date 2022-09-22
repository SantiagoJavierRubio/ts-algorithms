import { Sorter, Sortable } from "./Sort";

export class MergeSort implements Sorter {
    constructor(public data: Sortable) {}

    sort(): void {
        const indexArray = [...Array(this.data.length).keys()]
        const sortedIndexes = this.mergeSort(indexArray)
        this.data.rearrange(sortedIndexes)
    }

    
    mergeSort(indexArray: number[]): number[] {
        if (indexArray.length <= 1) return indexArray
        const half = Math.floor(indexArray.length / 2)
        const left = this.mergeSort(indexArray.slice(0, half))
        const right = this.mergeSort(indexArray.slice(half))
        return this.merge(left, right)
    }
    merge(left: number[], right: number[]): number[] {
        const sorted: any[] = []
        while (left.length && right.length) {
            if (this.data.compare(right[0], left[0])) {
                sorted.push(left.shift())
            } else {
                sorted.push(right.shift())
            }
        }
        return [...sorted, ...left, ...right]
    }
}