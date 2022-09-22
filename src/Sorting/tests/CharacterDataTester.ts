import { generate } from "randomstring";
import { expect } from "chai";
import { Sorter, SorterConstructor } from '../Sort';
import { CharacterData } from "../DataTypes/CharacterData";


const checkForUnorderedCharacters = (value: string): boolean => {
    let res = false
    for (let i=0; i<value.length-1; i++) {
        if (value[i].toLowerCase() > value[i+1].toLowerCase()) {
            res = true;
            break;
        }
    }
    return res;
}

export class CharacterDataTester {
    testCollection = new CharacterData('');
    sorter: Sorter;
    constructor(SorterConstructor: SorterConstructor<Sorter>) {
        this.sorter = new SorterConstructor(this.testCollection);
    }

    run(): void {
        for (let i = 1; i < 10; i++) {
            this.testCollection.data = generate({length: i * 100});
            this.sorter.sort();
            expect(checkForUnorderedCharacters(this.testCollection.data)).to.be.false;
          }
    }
}