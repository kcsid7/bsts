class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let curNode = this.root;
    
    while (true) {
      if (val < curNode.val) {
        // Left is the smaller value
        if (!curNode.left) {
          curNode.left = new Node(val);
          return this;
        } else {
          curNode = curNode.left;
        }
      } else if (val > curNode.val) {
        // Right is the larger value
        if (!curNode.right) {
          curNode.right = new Node (val);
          return this;
        } else{
          curNode = curNode.right;
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
        return this
      } else {
        return this.insertRecursively(val, node.right);
      }
    } 
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.left);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let node = this.root;
    let notFound = true;

    if (node.val === val) return node;

    while(node && notFound) {
      if (val > node.val) {
        node = node.right;
      } else if (val < node.val) {
        node = node.left
      } else {
        notFound = false;
      }
    }

    if (notFound) {
      return undefined
    } else {
      return node
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    
    if (!node) return undefined;

    if (val > node.val) {
      if (!node.right) return undefined;
      return this.findRecursively(val, node.right);
    } else if (val < node.val) {
      if (!node.left) return undefined;
      return this.findRecursively(val, node.left);
    }

    return node;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const res = [];

    const order = (node) => {
      res.push(node.val);
      if (node.left) order(node.left);
      if (node.right) order(node.right);
    }

    order(this.root);
    return res;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const res = [];

    const order = (node) => {
      if (node.left) order(node.left);
      res.push(node.val);
      if (node.right) order(node.right);
    }

    order(this.root);
    return res;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
      const res = [];
  
      const order = (node) => {
        if (node.left) order(node.left);
        if (node.right) order(node.right);
        res.push(node.val);
      }
  
      order(this.root);
      return res;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const queue = [];
    const res = [];
    let node = this.root;

    queue.push(node);

    while(queue.length) {
      node = queue.shift();
      res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return res;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    //Start from the root
    let node = this.root;
    let pNode;

    // If the value is not in the root tree then look into the left or right nodes
    while (val !== node.val) {
      pNode = node;
      if (val < node.val) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    // If the current node is not the root
    if (node !== this.root) {
      if (!node.left && !node.right) {
        if (pNode.left === node) {
          pNode.left = null;
        } else {
          pNode.right = null;
        }
      }
      else if (node.left && node.right) {
        let newP = node;
        let right = node.right;
        if (!right.left) {
          right.left = node.left;
          if (pNode.left === node) {
            pNode.left = right;
          } else {
            pNode.right = right;
          }
        }
        else {
          while (right.left) {
            newP = right;
            right = right.left;
          }
          if (pNode.left === node) {
            pNode.left.val = right.val;
          } else {
            pNode.right.val = right.val;
          }
          if (right.right) {
            newP.left = right.right;
          } else {
            newP.left = null;
          }
        }
      } else {
        if (pNode.left === node) {
          if (!node.right) {
            pNode.left = node.left;
          } else {
            pNode.left = node.right;
          }
        } else {
          if (!node.right) {
            pNode.right = node.left;
          } else {
            pNode.right = node.right;
          }
        }
      }
    } 
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(curNode = this.root) {
    if (!curNode) return;
    

    const minD = curNode => {
      if (!curNode) return 0;
      const val = Math.min(minD(curNode.right), minD(curNode.left)) + 1;
      return val;
    }
    
    const maxD = curNode => {
      if (!curNode) return 0;
      const val = Math.max(maxD(curNode.right), maxD(curNode.left)) + 1;
      return val;
    }

    const balancedVal = maxD(curNode) - minD(curNode) <= 1;

    return balancedVal;

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(curNode = this.root) {
    if (!this.root) return;
    if (!this.root.left && !this.root.right) return;

    while(curNode) {
      if (curNode.left && !curNode.right) {
        return this.findSecondHighest(curNode.left);
      }

      if (curNode.right) {
        if (!curNode.right.left && !curNode.right.right) return curNode.val;
      }

      curNode = curNode.right;
    }
  }
}

module.exports = BinarySearchTree;
