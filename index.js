/* Linear search 
1. look through an array 1-by-1 until you find what you're looking for 
2. class ex is the indexOf funciton => searchs for a particular value within an array 
*/
/*Big O:
1. Best case O(1) -> value is at the start of the array
2. Worst case O(n) -> you have to search through the entire array to find a key doesn't exist
3. Average case O(n) -> takes place when item you're looking for is in the center of the array
*/
function indexOf(array, value) {
    //loop through array - checking each value until you find value that matches 
    for(let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            //you return i => index you're current on 
            return i; 
        }
    }
    //if you reach the end of loop w.o finding item return -1 => indicates item wasn't found
    return -1; 
}

console.log(indexOf(['Hello', 2, true, false, 'World'], true)) //output: 2


/* Binary search 
1. Faster search method => only works on sorted arrays 
2. Dividing the range in half each time (divide & conquer) to find the item you're looking for
*/

//4 args: value(to search for). & optional start and end indicies
/*Big O:
1. Best case: O(1) => item you're looking for is in the middle of array 
2. worst & average: O(log(n)) => w. each iteration you can cut area search in hald 
*/
function binarySearch(array, value, start, end) {
    //if start & end are omitted => function uses start & end of array by default 
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    //if array if start index is > than end index = value hasn't been found  (because they're in sorted order)
    if (start > end) {
        return -1;
    }

    //pick an  index in the middle of start & end indixies & check the item at that index 
    const index = Math.floor((start + end) / 2);
    const item = array[index];

    //if item is = to the value then you have found the correct index
    console.log(start, end);
    if (item == value) {
        return index;
    }
    //Otherwise, recursively search in either left or right hald of sorted array
    //depending on whether the item was < or > than the value 
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};

/* Searching & Traversal in a tree  */
//Search => can be done in a few different ways (DFS & BFS)

/* Depth-first search (DFS) 
1. You can start from a given node (usually root) & traverse as far down as you can
2. When you reach a node - which has no children to visit or all node on path have been visited 
    - you start backtracking 
*/

//big O: O(n) => each node needs to be visited 
class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    dfs(values=[]) {
        //if there's a left hand branch
        if (this.left) {
            //recursively search nodes there 
            values = this.left.dfs(values);
        }
        //then add the value at current node to the array 
        values.push(this.value);

        if (this.right) {
            value = this.right.dfs(values);
        }
        return values; 
    }

    /* Breadth-first search 
    1. Works across rows of a tree = top row will be handled 1st, then 2nd row etc. 
    2. To carry out BFS = need 'first-in, first-out queue 
        - so you can store all siblings in the queue & process them in correct order
    3. When you visit a node you add it to the queue 
    4. The nodes are then removed from the queue & children are visited - adding more values onto queue
    */
   //Big O: O(n) => each node needs to visited once 
   bfs(tree, values = []) {
       const queue = new queue(); //Assuming a Queue is implemented
       const node = tree.root; 
       queue.enqueue = tree.root; 
       while (queue.length) {
           const node = queue.dequeue(); //remove from the queue
           values.push(node.value); //add that value from queue to an array

           if (node.left) {
               queue.dequeue(node.left) //add left child to the queue
           }
           if (node.right) {
               queue.enqueue(node.rigth) //add right child to the queue
           }
           return values; 
       }
   }
}
