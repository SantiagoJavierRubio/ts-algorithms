"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomNumArray = void 0;
function createRandomNumArray(length, maxSize = 1000, decimals = false) {
    const dataLength = length || Math.random() * 100;
    const fakeData = [];
    for (let i = 0; i < dataLength; i++) {
        const newVal = (Math.random() - Math.random()) * maxSize;
        fakeData.push(decimals ? newVal : Math.round(newVal));
    }
    return fakeData;
}
exports.createRandomNumArray = createRandomNumArray;
