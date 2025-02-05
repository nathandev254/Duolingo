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

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const query = url.searchParams;

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && path === "/display") {
    // Display all nodes
    res.end(JSON.stringify({ list: linkedList.display() }));
  } else if (req.method === "POST" && path === "/add") {
    // Add a new node
    const data = query.get("data");
    if (data) {
      linkedList.add(data);
      res.end(JSON.stringify({ message: `Added ${data}`, list: linkedList.display() }));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Data is required to add a node." }));
    }
  } else if (req.method === "DELETE" && path === "/remove") {
    // Remove a node
    const data = query.get("data");
    if (data) {
      const removed = linkedList.remove(data);
      if (removed) {
        res.end(JSON.stringify({ message: `Removed ${data}`, list: linkedList.display() }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: `Node with data ${data} not found.` }));
      }
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Data is required to remove a node." }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Invalid endpoint." }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
