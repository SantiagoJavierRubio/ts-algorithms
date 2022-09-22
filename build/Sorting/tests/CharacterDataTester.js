"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterDataTester = void 0;
const randomstring_1 = require("randomstring");
const chai_1 = require("chai");
const CharacterData_1 = require("../DataTypes/CharacterData");
const checkForUnorderedCharacters = (value) => {
    let res = false;
    for (let i = 0; i < value.length - 1; i++) {
        if (value[i].toLowerCase() > value[i + 1].toLowerCase()) {
            res = true;
            break;
        }
    }
    return res;
};
class CharacterDataTester {
    constructor(SorterConstructor) {
        this.testCollection = new CharacterData_1.CharacterData('');
        this.sorter = new SorterConstructor(this.testCollection);
    }
    run() {
        for (let i = 1; i < 10; i++) {
            this.testCollection.data = (0, randomstring_1.generate)({ length: i * 100 });
            this.sorter.sort();
            (0, chai_1.expect)(checkForUnorderedCharacters(this.testCollection.data)).to.be.false;
        }
    }
}
exports.CharacterDataTester = CharacterDataTester;
