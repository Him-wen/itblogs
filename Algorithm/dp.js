/**
 * @param {number[]} nums
 * @return {boolean}
 */
 // 分割等和子集 可以转化为背包问题
 // 给一个可装载重量为 sum / 2 的背包和 N 个物品，每个物品的重量为 nums[i]。现在让你装物品，是否存
 // 在一种装法，能够恰好将背包装满？
 var canPartition = function(nums) {
    let sum=0
    let n = nums.length
    for(let i=0;i<n;i++){
        sum+=nums[i]
    }
    if(sum%2!==0){
        // 如果能分割 必定是偶数
        return false
    }
    sum=sum/2
    // 定义dp数组
    // dp[i][j] = x 表示，对于前 i 个物品，当前背包的容量为 j 时，若 x 为 true，则说明可以恰好将背包装满，若 x 为 false，则说明不能恰好将背包装满
    // 最后结果是 dp[n][sum] 表示前n个能否把背包容量为sum的恰好装满
    // 前n个就是0...n-1
    // 这里用到dp[n]下标n===>对于数组长度就是n+1
    let dp= new Array(n+1).fill(0).map(() => new Array(sum + 1).fill(false))
    // base case 就是 dp[..][0] = true 和 dp[0][..] = false
    // 背包没有空间的时候，就相当于装满了
    // dp[0][..] = false 而当没有物品可选择的时候，肯定没办法装满背包
    for(let i=0;i<=n;i++){
       dp[i][0]=true
    }
    for(let i=1;i<=n;i++){
        let num=nums[i-1] // 前i个
        // 可以直接从1开始 因为j为0的情况 我们知道base case 减少一些循环
        for(let j=0;j<=sum;j++){
            // 背包容量不足，不能装入第 i 个物品
            if(j-num<0){
              // 这时候看前面i-1个是否把容量为j的背包恰好装满了
              dp[i][j] = dp[i - 1][j];
            } else {
               // 不装入背包或者装入
               // dp[i - 1][j-num]的含义是前i-1个把容量为j-num恰好装满了
               dp[i][j] = dp[i - 1][j] || dp[i - 1][j-num];
            }
        }
    }
    return dp[n][sum]
  };


//不同路径II（和不同路径的区别是有障碍，就不需要赋初值 或者推导出来）
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = new Array(m).fill([]).map(()=>new Array(n).fill(0));
    // 从第一个下标位置（0，0）开始算才可以
    for(let i =0;i<m && obstacleGrid[i][0]==0;i++) {
        dp[i][0] = 1;// 初始化：dp[i][0]只能由左边得到也就是只有一条，因为从(0, 0)的位置到(i, 0)的路径只有一条
    }
    for(let j =0;j<n && obstacleGrid[0][j]==0;j++) {
        dp[0][j] = 1;// 同理上
    }

    for(let i=1;i<m;i++) {
        for(let j =1;j<n;j++) {
        if(obstacleGrid[i][j]==1)continue;
            dp[i][j] = dp[i-1][j]+dp[i][j-1];//递推公式，从前往后遍历
        }
    }

    return dp[m-1][n-1];
};

//整数拆分
var integerBreak = function(n) {
    let dp = new Array(n+1).fill(0);
    dp[2] = 1;//初始化
    for(i=3;i<=n;i++) {//从初始化的下一个i开始遍历
        for(let j =1;j<i-1;j++) {// 将j从1到i-1都遍历到
            dp[i] = Math.max(dp[i], Math.max((i-j)*j, dp[i-j]*j));//递推公式
        }
    }
    return dp[n];
};

//二维数组找初始值：要保证数组下标>=0，递推的时候的i和j的起点选择初始化未覆盖的值就可以了

//最小路径和
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    if(m<0 || n<0)return 0;

    let dp = new Array(m+1).fill([]).map(()=>new Array(n+1).fill(0));
    dp[0][0]= grid[0][0];// 初始化的时候 看递推公式里面i为0的时候 i-1=-1了数组肯定不能这样
    // 我们的初始值是计算出所有的 dp[0] [0….n] 和所有的 dp[0….m] [0]。
    for(let i = 1;i<m;i++) {
        dp[i][0] = grid[i][0] + dp[i-1][0];
    }
    for(let j = 1;j<n;j++) {
        dp[0][j] = grid[0][j] + dp[0][j-1];
    }
    //递推公式
    for(let i =1;i<m;i++) {
        for(let j =1;j<n;j++) {
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1])+grid[i][j];
        }
    }
    return dp[m-1][n-1];
};

// 一般来说当字符串下标涉及到i-1 循环从1开始比较好
//编辑距离（案例未过）
var minDistance = function(word1, word2) {
    let m = word1.length;
    let n = word2.length;
    // dp[i] [j]的含义为：当字符串 word1 的长度为 i，字符串 word2 的长度为 j 时，将 word1 转化为 word2 所使用的最少操作次数为 dp[i] [j]。
    let dp = new Array(m+1).fill([]).map(()=>new Array(n+1).fill(0));
    for(let i =1;i<=m;i++) {
        dp[i][0] = dp[i-1][0]+1;
    }
    for(let j =1;j<=n;j++) {
        dp[0][j] = dp[0][j-1]+1;
    }

    for(let i=1;i<=m;i++) {
        for(let j=1;j<=n;j++) {
            // 当word1[i] = word2[j]时，表示相同直接跳过，操作数和前一步一样，即dp[i][j] = dp[i-1][j-1]
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            }
            dp[i][j] = Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]))+1;
        }
    }
    return dp[m][n];
};

//字符串的删除操作
var minDistance = function(word1, word2) {
    let m = word1.length;
    let n = word2.length;
    let dp = new Array(m+1).fill([]).map(()=>new Array(n+1).fill(0));
    for(let i =0;i<=m;i++)dp[i][0] = i;
    for(let j =0;j<=n;j++)dp[0][j] = j;//初始化

    for(let i=1;i<=m;i++) {
        for(let j=1;j<=n;j++) {
            if(word1[i-1] === word2[j-1]) {// 当word1[i - 1] 与 word2[j - 1]相同的时候，dp[i][j] = dp[i - 1][j - 1];
                dp[i][j] = dp[i-1][j-1];
            }
            // 都删掉，删掉i的，删掉j的最后当然是取最小值
            else dp[i][j] = Math.min(dp[i-1][j-1]+2, Math.min(dp[i-1][j]+1, dp[i][j-1]+1));
        }
    }
    return dp[m][n];
};

//最长公共子序列
// f[i][j]f[i][j] 表示a的前i个字母，和b的前j个字母的最长公共子序列长度
// 关于初始化情况：先看看dp[i][0]应该是多少呢？
// test1[0, i-1]和空串的最长公共子序列自然是0，所以dp[i][0] = 0;
// 同理dp[0][j]也是0。
// 其他下标都是随着递推公式逐步覆盖，初始为多少都可以，那么就统一初始为0。
var longestCommonSubsequence = function(text1, text2) {
    let n = text1.length;
    let m = text2.length;
    let dp = Array.from(new Array(n+1),() => new Array(m+1).fill(0));// 这里就统一赋值为0
    for(let i = 1;i <= n;i++){
        for(let j = 1;j<= m;j++){
            if(text1[i] === text2[j]){// 
                dp[i][j] = dp[i-1][j-1] + 1;// 
            }else{
                dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j]);
            }
        }
    }
    return dp[n][m];
};

//三角形最小路径和
var minimumTotal = function(triangle) {
    let n = triangle.length;
    let dp = new Array(n+1).fill([]).map(()=>new Array(n+1).fill(0));

    // for(let i=1;i<n;i++) {
    // dp[i][n] = triangle[i][n];
    // }

    for(let i =n-1;i>=0;i--) {
        for(let j = 0;j <= i;j++) {
            dp[i][j] = Math.min(dp[i+1][j], dp[i+1][j+1])+triangle[i][j];
        }
    }
    return dp[0][0];
};

//最长上升子序列
var lengthOfLIS = function(nums) {
    let n = nums.length;
    let dp =new Array(n+1).fill(1);// 包含初始值部分
    // for(let i =1;i<=n;i++) {
    //     dp[i]=1;// 这里不需要的原因是初始值已经是为1了
    // }
    for(let i=1;i<=n;i++){
        for(let j=0;j<i;j++){
            // 这层for循环得出dp[i]
            // 当前元素大于前面的一个 dp[j]+1
			// 但是dp[i]有多个子问题(for循环) 需要从这个子问题选取最大的
			// Math.max(dp[i],dp[j]+1) 这里的dp[i]表示前面的子问题筛选出的结果和当前子问题
			// dp[i] = Math.max(dp[i], dp[j] + 1)
            if(nums[i]>nums[j]){
                dp[i]=Math.max(dp[j]+1,dp[i]);
            }
        }
    }
    let res=0;
    for(let i=1;i<=n;i++) {
        res =Math.max(res,dp[i]);
    }
    return res;
};

// 最长连续递增子序列
// 以下标i为结尾的数组的连续递增的子序列长度为dp[i]。
// 这题和最长公共子序列的区别 就是因为本题要求连续递增子序列，所以就必要比较nums[i + 1]与nums[i]，而不用去比较nums[j]与nums[i] （j是在0到i之间遍历）。既然不用j了，那么也不用两层for循环，本题一层for循环就行，比较nums[i + 1] 和 nums[i]。
var findLengthOfLCIS = function(nums) {
    let n = nums.length;
    if(!n)return 0;
    let dp = new Array(n+1).fill(1);// 初始化全部为1
    let res = 1;
    for(let i =1;i<n;i++) {// 从1到n-1
        if(nums[i]>nums[i-1]){// 那么以 i 为结尾的数组的连续递增的子序列长度 一定等于 以i-1为结尾的数组的连续递增的子序列长度 + 1 。
            dp[i] = dp[i-1]+1;
        }
        res = Math.max(res, dp[i]);
    }
    return res;
};

// 最长重复子数组