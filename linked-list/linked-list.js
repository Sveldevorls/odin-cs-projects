class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.headNode = null;
    }

    head() {
        return this.headNode
    }

    tail() {
        if (this.headNode == null) return null

        let curr = this.headNode;
        while (curr.nextNode != null) {
            curr = curr.nextNode;
        }
        return curr
    }

    size() {
        if (this.headNode == null) return 0

        let curr = this.headNode;
        let listSize = 0;
        while (curr != null) {
            curr = curr.nextNode;
            listSize++
        }

        return listSize
    }

    append(value) {
        if (this.headNode == null) {
            this.headNode = new Node(value);
        }
        else {
            let curr = this.headNode;
            while (curr.nextNode != null) {
                curr = curr.nextNode;
            }
            curr.nextNode = new Node(value);
        }
    }

    prepend(value) {
        if (this.headNode == null) {
            this.headNode = new Node(value);
        }
        else {
            let oldHead = this.headNode;
            this.headNode = new Node(value);
            this.headNode.nextNode = oldHead;
        }
    }

    at(index) {
        if (this.headNode == null || index < 0) return null

        let curr = this.headNode;
        let currIndex = 0;

        // Exhuast the list in case index is too large
        while (curr != null) {
            if (currIndex == index) return curr

            curr = curr.nextNode;
            currIndex++
        }

        // Target index out of bound
        return null
    }

    pop() {
        if (this.headNode == null) {
            console.log("Unable to pop: list is empty");
            return
        }

        // List contains only one item
        else if (this.headNode.nextNode == null) {
            this.headNode = null;
        }

        // List contains more than one item
        else {
            let slow = this.headNode;
            let fast = this.headNode.nextNode;

            while (fast.nextNode != null) {
                slow = slow.nextNode;
                fast = fast.nextNode;
            }

            slow.nextNode = null;
        }
    }

    contains(target) {
        if (this.headNode == null) return null

        let curr = this.headNode;
        
        while (curr != null) {
            if (curr.value == target) return true
            curr = curr.nextNode;
        }

        return false
    }

    find(target) {
        if (this.headNode == null) return null

        let curr = this.headNode;
        let currIndex = 0;

        while (curr != null) {
            if (curr.value == target) return currIndex
            curr = curr.nextNode;
            currIndex++
        }
        
        return null
    }

    toString() {
        let listString = "";
        let curr = this.headNode;

        while (curr != null) {
            listString += `( ${curr.value} ) -> `
            curr = curr.nextNode;
        }

        listString += "null"

        return listString
    }
}