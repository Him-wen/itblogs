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
    let dp =new Array(n+1).fill(1);
    for(let i =1;i<=n;i++) {
        dp[i]=1;
    }
    for(let i=1;i<=n;i++){
        for(let j=0;j<i;j++){
            // 这层for循环得出dp[i]
            // 当前元素大于前面的一个 dp[j]+1
			// 但是dp[i]有多个子问题(for循环) 需要从这个子问题选取最大的
			// Math.max(dp[i],dp[j]+1) 这里的dp[i]表示前面的子问题筛选出的结果和当前子问题
				dp[i] = Math.max(dp[i], dp[j] + 1)
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