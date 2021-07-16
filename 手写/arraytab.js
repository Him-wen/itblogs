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