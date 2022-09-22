"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class LLNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    get length() {
        if (!this.head)
            return 0;
        let len = 1;
        let node = this.head;
        while (node.next) {
            len++;
            node = node.next;
        }
        return len;
    }
    add(data) {
        const node = new LLNode(data);
        if (!this.head) {
            this.head = node;
            return;
        }
        let tail = this.head;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = node;
    }
    at(index) {
        if (!this.head)
            throw new Error("No items for provided index");
        let count = 0;
        let node = this.head;
        while (node) {
            if (count === index)
                return node;
            count++;
            node = node.next;
        }
        throw new Error("No items found");
    }
    compare(i, j) {
        if (!this.head)
            throw new Error("Linked list is empty");
        return this.at(i).data > this.at(j).data;
    }
    swap(i, j) {
        const iNode = this.at(i);
        const jNode = this.at(j);
        const iVal = iNode.data;
        iNode.data = jNode.data;
        jNode.data = iVal;
    }
    print() {
        if (!this.head)
            return;
        let node = this.head;
        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }
}
exports.LinkedList = LinkedList;
