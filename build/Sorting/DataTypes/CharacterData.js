"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterData = void 0;
class CharacterData {
    constructor(data) {
        this.data = data;
    }
    get length() {
        return this.data.length;
    }
    swap(i, j) {
        const chars = this.data.split("");
        const iVal = chars[i];
        chars[i] = chars[j];
        chars[j] = iVal;
        this.data = chars.join("");
    }
    compare(i, j) {
        return this.data[i].toLowerCase() > this.data[j].toLowerCase();
    }
    rearrange(indexes) {
        if (indexes.length !== this.length)
            throw new Error('incomplete index list');
        let temp = '';
        for (let i = 0; i < indexes.length; i++) {
            temp += this.data[indexes[i]];
        }
        this.data = temp;
    }
}
exports.CharacterData = CharacterData;
