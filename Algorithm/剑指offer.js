// 剑指 Offer 15. 二进制中1的个数
var hammingWeight = function(n) {
    // let res = 0;
    // for(let i=0;i<32;i++) {
    //     // 1<<i 从0开始循环:1<<i 首先是1，然后10，100，1000 与n的二进制（比如10的二进制为1010比较）每次1<<i只有一个1，来用&循环和n对比每一位，看到底有多少个1
    //     if((n&(1<<i))!==0) {
    //         res++;
    //     }
    // }
    // return res;
    // n~\&~(n - 1)n & (n−1)，其运算结果恰为把 nn 的二进制位中的最低位的 11 变为 00 之后的结果。
    // 
    let res= 0;
    while(n) {
        n =n&(n-1);
        res++;
    }
    return res;
};

//剑指 Offer 16. 数值的整数次方
// 分情况进行讨论
var myPow = function(x, n) {
    if(n===1)return x;
    if(n===0)return 1;
    if(n===-1)return 1/x;
    if(n%2===0) {
        let temp = myPow(x, n/2);
        return temp *temp;
    }else {
        let temp1 = myPow(x, (n-1)/2);
        return temp1 * temp1 * x;
    }
};

// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
var exchange = function(nums) {
    let slow = 0;
    let fast = 0;

    while(fast<nums.length) {
        if(nums[fast] & 1) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
        fast++;
    }
    return nums;
};