class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    #loadFactor;
    #capacity;
    #buckets;
    #size;

    constructor() {
        this.#loadFactor = 0.75;
        this.#capacity = 16;
        this.#buckets = Array(this.#capacity).fill(null);
        this.#size = 0;
    }

    // djb2
    #hash(key) {
        let hashValue = 5381;
        for (let c of key) {
            hashValue = ((hashValue << 5) + hashValue) + c.charCodeAt();
            hashValue %= this.#capacity;
        }
        return hashValue
    }

    #growCapacity() {
        for (let i = 0; i < this.#capacity; i++) {
            this.#buckets.push(null);
        }
        this.#capacity *= 2;

        // Relocate preexisting items to new fitting bucket indices
        let oldEntries = this.entries();
        this.clear();

        for (let [key, value] of oldEntries) {
            this.set(key, value);
        }
    }

    set(key, value) {
        let keyHashedValue = this.#hash(key);
        let bucketValue = keyHashedValue % this.#capacity;

        // Bucket is empty
        if (this.#buckets[bucketValue] == null) {
            this.#buckets[bucketValue] = new Node(key, value);

            this.#size += 1;
            if (this.#size > this.#loadFactor * this.#capacity) {
                this.#growCapacity();
            }
        }

        // Bucket is occupied
        else {
            let curr = this.#buckets[bucketValue];

            // Find target node, returns the last node if key doest not already exist in list
            while (curr.next != null) {
                if (curr.key == key) break
                curr = curr.next;
            }

            if (curr.key == key) {
                curr.value = value;
            }
            else {
                curr.next = new Node(key, value);

                this.#size += 1;
                if (this.#size > this.#loadFactor * this.#capacity) {
                    this.#growCapacity();
                }
            }
        }
    }

    get(key) {
        let keyHashedValue = this.#hash(key);
        let bucketValue = keyHashedValue % this.#capacity;
        
        if (this.#buckets[bucketValue] == null) return null

        let curr = this.#buckets[bucketValue];
        while (curr.next != null) {
            if (curr.key == key) break
            curr = curr.next;
        }

        return curr.key == key ? curr.value : null
    }

    has(key) {
        let keyHashedValue = this.#hash(key);
        let bucketValue = keyHashedValue % this.#capacity;
        
        if (this.#buckets[bucketValue] == null) return false

        let curr = this.#buckets[bucketValue];
        while (curr.next != null) {
            if (curr.key == key) break
            curr = curr.next;
        }

        return curr.key == key
    }

    remove(key) {
        let keyHashedValue = this.#hash(key);
        let bucketValue = keyHashedValue % this.#capacity;

        if (this.#buckets[bucketValue] == null) return false

        // Key at list head
        if (this.#buckets[bucketValue].key == key) {
            this.#buckets[bucketValue] = this.#buckets[bucketValue].next
            this.#size--
            return true
        }
        // Key not at list head
        else {
            let curr = this.#buckets[bucketValue];
            let fast = curr.next;
            while (fast != null) {
                if (fast.key == key) {
                    curr.next = fast.next
                    this.#size--
                    return true
                }
            }
            
            return false
        }
    }

    length() {
        return this.#size;
    }

    clear() {
        this.#buckets = Array(this.#capacity).fill(null);
        this.#size = 0;
    }

    keys() {
        let result = [];
        for (let bucket of this.#buckets) {
            if (bucket != null) {
                let curr = bucket;
                while (curr != null) {
                    result.push(curr.key);
                    curr = curr.next;
                }
            }
        }
        return result
    }

    values() {
        let result = [];
        for (let bucket of this.#buckets) {
            if (bucket != null) {
                let curr = bucket;
                while (curr != null) {
                    result.push(curr.value);
                    curr = curr.next;
                }
            }
        }
        return result
    }

    entries() {
        let result = [];
        for (let bucket of this.#buckets) {
            if (bucket != null) {
                let curr = bucket;
                while (curr != null) {
                    result.push([curr.key, curr.value]);
                    curr = curr.next;
                }
            }
        }
        return result
    }
}