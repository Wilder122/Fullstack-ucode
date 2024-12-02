const LLData = require("./LLData");

class LList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const newItem = new LLData(value);
    if (!this.head) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      this.tail.next = newItem;
      this.tail = newItem;
    }
  }

  addFromArray(arrayOfData) {
    arrayOfData.forEach(data => this.add(data));
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  remove(value) {
    if (!this.head) return;

    if (this.head.data === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === value) {
        current.next = current.next.next;
        if (!current.next) this.tail = current;
        return;
      }
      current = current.next;
    }
  }

  removeAll(value) {
    while (this.contains(value)) {
      this.remove(value);
    }
  }

  contains(value) {
    let current = this.head;
    while (current) {
      if (current.data === value) return true;
      current = current.next;
    }
    return false;
  }

  clear() {
    this.head = null;
    this.tail = null;
  }

  count() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  toString() {
    let values = [];
    let current = this.head;
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    return values.join(', ');
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  filter(callback) {
    const filteredList = new LList();
    let current = this.head;
    while (current) {
      if (callback(current.data)) {
        filteredList.add(current.data);
      }
      current = current.next;
    }
    return filteredList;
  }
}

module.exports = { LList };