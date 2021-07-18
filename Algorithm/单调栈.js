// 单调栈
var dailyTemperatures = function(nums) {
    let res = new Array(nums.length).fill(0);
    let stk = [];// 这里面存的是下标，便于计算
    for(let i=nums.length-1; i>=0; i--) {
        while(stk.length && nums[i] >= nums[stk[stk.length - 1]]) {
            stk.pop();
        }
        if(stk.length) {
            res[i] = stk[stk.length - 1] - i;// nums[stk[stk.length - 1]]为单调递增栈顶最大的元素，因为是从右边开始算的，所以说是当前元素i最右边的第一个比他大的数的下标
        }
        stk.push(i);
    }
    return res;
};