const http = require("http");

// Define a Node in the linked list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Define the Linked List
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a node to the linked list
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Remove a node from the linked list
  remove(data) {
    if (!this.head) return false;
    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      return true;
    }
    return false;
  }

  // Display all elements in the linked list
  display() {
    const elements = [];
    let current = this.head;
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    return elements;
  }
}

// Create a linked list instance
const linkedList = new LinkedList();

