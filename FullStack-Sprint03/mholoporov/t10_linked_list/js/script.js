class ListNode {
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    add(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    remove(value) {
        let current = this.head;
        let previous = null;

        while (current) {
            if (current.data === value) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }

                if (current === this.tail) {
                    this.tail = previous;
                }
                this.length--;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    [Symbol.iterator]() {
        let current = this.head;
        return {
            next: () => {
                if (current) {
                    const value = current.data;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    count() {
        return this.length;
    }

    log() {
        let current = this.head;
        const values = [];
        while (current) {
            values.push(current.data);
            current = current.next;
        }
        console.log(values.join(', '));
    }
}

function createLinkedList(arr) {
    const ll = new LinkedList();
    for (const value of arr) {
        ll.add(value);
    }
    return ll;
}

const ll = createLinkedList([100, 1, 2, 3, 100, 4, 5, 100]);
ll.log(); // "100, 1, 2, 3, 100, 4, 5, 100"
while (ll.remove(100));
ll.log(); // "1, 2, 3, 4, 5"
ll.add(10);
ll.log(); // "1, 2, 3, 4, 5, 10"
console.log(ll.contains(10)); // "true"
let sum = 0;
for (const n of ll) {
    sum += n;
}
console.log(sum); // "25"
ll.clear();
ll.log(); // ""