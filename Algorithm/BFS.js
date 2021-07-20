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

