// 二分查找（推荐写左闭又闭）
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;// 区别1 左闭右闭
    while(left <= right) {// 等号
        let mid = left + right >> 1;
        if(nums[mid] > target) {
            right = mid-1;// 从前一个算
        }else if(nums[mid]<target) {
            left = mid+1;
        }else {
            return mid;
        }
    }
    return -1;
};
var search = function(nums, target) {
    let left = 0;
    let right = nums.length;// 区别1 左闭右开
    while(left < right) {// 无等
        let mid = left + right >> 1;
        if(nums[mid] > target) {
            right = mid;// 从原来的开始算
        }else if(nums[mid]<target) {
            left = mid+1;
        }else {
            return mid;
        }
    }
    return -1;
};

// 在排序数组中查找元素的第一个和最后一个位置
// 板子🔗：https://www.acwing.com/solution/content/8235/
var searchRange = function(nums, target) {
    let res = [-1, -1];
    if(nums.length === 0) return res;
    // mid是否满足条件 是在target左边还是右边
    let left =0, right =nums.length-1;
    while(left < right) {// 循环结束的时候，l和r是相等的
        let mid = left+right >> 1;
        if(nums[mid] >= target) {// 如果满足性质，那说明答案target是在mid的左边，所以左边边界也能
            right = mid;//相当于取左半边
        }else {
            left = mid+1;
        }
    } 
    if(nums[left] != target) return res;// 判断不存在的情况
    res[0] = left;

    left =0, right =nums.length-1;
    while(left < right) {
        let mid = left+right+1 >> 1;//为什么需要+1？原因是如果不加上1，那么mid得到的是下取整的数，那么有可能[m,r]更新过后m会一直等于m（m+1==r的情况）会陷入死循环。
        if(nums[mid] <= target) {// 如果满足性质，那说明答案target肯定是在mid的右半边
            left = mid;
        }else {
            right = mid-1;
        }
    } 
    res[1] = right;
    return res;
};

// 704二分查找
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let res = -1;
    while(left < right) {
        let mid = left + right >> 1;
        if(nums[mid] >= target) {// 选上面的一个板子就行
            right = mid;
        } else {
            left = mid+1;
        }
    }
    if(nums[left]===target) res = left;
    return res;
};