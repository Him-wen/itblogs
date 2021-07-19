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