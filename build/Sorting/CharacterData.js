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
}
exports.CharacterData = CharacterData;
