class QElement<T> {
    constructor(public data: T, public priority: number) {}
}

export class PriorityQueue<T> {
    constructor(public queue: QElement<T>[] = []) {}

    addElement(data: T, priority: number) {
        let element = new QElement<T>(data, priority)
        let contain = false

        for(let i=0; i<this.queue.length; i++) {
            if(this.queue[i].priority > element.priority) {
                this.queue.splice(i, 0, element)
                contain = true;
                break;
            }
        }
        if(!contain) this.queue.push(element)
    }
    getFirst(): T | undefined {
        return this.queue.shift()?.data;
    }
    isEmpty(): boolean {
        return this.queue.length === 0
    }
}