// 单调队列
var maxSlidingWindow = function(nums, k) {
    let res = [];
    let qu = [];// 队列数组（存放的是元素下标，为了取值方便）
    for(let i =0; i<nums.length; i++) {
        // 若队列不为空，且当前元素大于等于队尾所存下标的元素，则弹出队尾
        while(qu.length && nums[i] >= nums[qu[qu.length - 1]]) {// 如果新加入的大于已经在队列的，那已经在队列的肯定不会被选
            qu.pop();// 将已经在的删掉
        }
        // 入队当前元素下标
        qu.push(i);// 将最新的加入

        // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队
        // 需要执行多次就用while 执行一次就用if
        while(qu[0] < i + 1 - k) qu.shift();// 如果已经超过了k个数字 就将前面的删re
        // 当达到窗口大小时便开始向结果中添加数据
        if(i + 1 >= k)res.push(nums[qu[0]]);// 添加到结果数组中
    }
    return res;
};