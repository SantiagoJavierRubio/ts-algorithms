import { Sortable } from "../Sort";

class LLNode {
  next: LLNode | null = null;

  constructor(public data: number) {}
}

export class LinkedList implements Sortable {
  head: LLNode | null = null;

  get length(): number {
    if (!this.head) return 0;
    let len = 1;
    let node = this.head;
    while (node.next) {
      len++;
      node = node.next;
    }
    return len;
  }
  add(data: number): void {
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

  at(index: number): LLNode {
    if (!this.head) throw new Error("No items for provided index");
    let count = 0;
    let node: LLNode | null = this.head;
    while (node) {
      if (count === index) return node;
      count++;
      node = node.next;
    }
    throw new Error("No items found");
  }

  compare(i: number, j: number): boolean {
    if (!this.head) throw new Error("Linked list is empty");
    return this.at(i).data > this.at(j).data;
  }
  swap(i: number, j: number): void {
    const iNode = this.at(i);
    const jNode = this.at(j);
    const iVal = iNode.data;
    iNode.data = jNode.data;
    jNode.data = iVal;
  }
  rearrange(indexes: number[]): void {
    if (indexes.length !== this.length) throw new Error('incomplete index list')
    const orderedCopy: LLNode[] = []
    for (let i=0; i<indexes.length; i++) {
      orderedCopy.push(this.at(indexes[i]))
    }
    this.head = new LLNode(orderedCopy[0].data);
    for (let j=1; j<orderedCopy.length; j++) {
      this.add(orderedCopy[j].data)
    }
  }

  print(): void {
    if (!this.head) return;
    let node: LLNode | null = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}
