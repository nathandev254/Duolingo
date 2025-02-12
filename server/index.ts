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

