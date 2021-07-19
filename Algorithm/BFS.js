// ms不咋考
// 走迷宫 最短路问题 DP是特殊的最短路问题（没有环）
// 不同路径
var uniquePaths = function(m, n) {
    let dp = new Array(m).fill([]).map(()=>new Array(n).fill(0));

    // 从第一个下标位置（0，0）开始算才可以
    for(let i =0;i<m;i++) {
        dp[i][0] = 1;// 初始化：dp[i][0]只能由左边得到也就是只有一条，因为从(0, 0)的位置到(i, 0)的路径只有一条
    }
    for(let j =0;j<n;j++) {
        dp[0][j] = 1;// 同理上
    }

    for(let i=1;i<m;i++) {
        for(let j =1;j<n;j++) {
            dp[i][j] = dp[i-1][j]+dp[i][j-1];//递推公式，从前往后遍历
        }
    }

    return dp[m-1][n-1];//返回
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