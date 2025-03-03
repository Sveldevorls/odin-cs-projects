function iterativeFib(n) {
    let ans = [];
    let [prevprev, prev, curr] = [0, 0, 0];
    
    for (let i = 0; i < n; i++) {
        curr = i <= 1? i : prevprev + prev;
        ans.push(curr)
        prevprev = prev;
        prev = curr;
    }

    return ans
}

function recursiveFib(n) {
    // Base cases
    if (n == 1) return [0]
    if (n == 2) return [0, 1]

    let ans = recursiveFib(n-1);
    ans.push(ans[ans.length - 2] + ans[ans.length - 1]);

    return ans
}