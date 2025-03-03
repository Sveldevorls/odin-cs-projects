function mergeSort(arr) {
    // Base case: array can not be further split into two subarrays
    if (arr.length == 1) return arr

    let pivot = Math.ceil(arr.length / 2);
    let leftArr = arr.slice(0, pivot);
    let rightArr = arr.slice(pivot);
    
    leftArr = mergeSort(leftArr);
    rightArr = mergeSort(rightArr);

    // Merge left and right arrays back into one array
    let [li, ri, ai] = [0, 0, 0];
    while (li < leftArr.length || ri < rightArr.length) {
        if (ri >= leftArr.length || leftArr[li] < rightArr[ri]) {
            arr[ai] = leftArr[li]
            li++
        }
        else {
            arr[ai] = rightArr[ri]
            ri++
        }
        ai++
    }
    
    return arr
}