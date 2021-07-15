var sortArray = function(nums) {
    const dfs = function(left, right) {
        if(left <= right) {
            return;
        }
        let mid = right+left >> 1;
        dfs(left, mid);
        dfs(mid+1, right);

        let temp = [];
        let k = 0;
        let i = left, j = mid + 1;
        while(i < mid && j < right) {
            temp[k++] = nums[i] > nums[j] ? nums[j++] : nums[i++];
        }
        while(i < mid) temp[k++] = nums[i++];
        while(j < right) temp[k++] = nums[j++];

        for(let i = 0; i < k; i++) {
            nums[i+left] = temp[i];
        }
    }
    dfs(0, nums.length - 1);
    return nums;
};