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

// 剑指 Offer 29. 顺时针打印矩阵
var spiralOrder = function(nums) {
    if(!nums.length)return [];
    let res= [];
    let row = nums.length;
    let col = nums[0].length;
    let top = 0;
    let bottom = row - 1;
    let left = 0;
    let right = col - 1;
    let length = row * col;

    while(res.length !== length) {// 四个方向分别模拟，画图
        for(let i=left;i<=right;i++) {// 从左到右
            res.push(nums[top][i]);
        }
        top++;

        for(let i=top;i<=bottom;i++) {
            res.push(nums[i][right]);
        }
        right--;

        if (res.length === length) break;// 这句要加不然就会超时

        for(let i=right;i>=left;i--) {
            res.push(nums[bottom][i]);
        }
        bottom--;

        for(let i=bottom;i>=top;i--) {
            res.push(nums[i][left]);
        }
        left++;
    }
    return res;
};