// 全排列
var permute = function(nums) {
    if(!nums.length) return [];
    let res = [];
    let link = [];
    let used = new Array(nums.length).fill(false);// 将标识符都置为false；

    const dfs = function() {
        //当link排列的数字个数为nums的数字个数
        if(link.length === nums.length) {
            res.push([...link]);
            return;// 返回到n-1的时候的dfs（也就是上一层进来的时候的dfs）
        }
        //当link排列的数字个数小于nums的数字个数，就执行DFS过程
        for(let i =0; i < nums.length; i++) {
            if(used[i]=== false) {// 筛选出来之前没用过的数字
                link.push(nums[i])//插入
                used[i] = true;//表示已经用过了
                dfs();//递归处理下一层
                used[i] = false;
                link.pop();
            };
        }
    }
    dfs();
    return res;
};

// 组合（无序，子集问题也是无序）
// 一个集合来求组合的话，就需要startIndex
// 包含一个剪枝优化 for (int i = startIndex; i <= n - (k - path.size()) + 1; i++) 
var combine = function(n, k) {
    let res = [];
    let link = [];
    if(n<=0 || k<=0) {
        return res;
    }
    const dfs = function(startIndex) {// 每次startIndex+1开始，排除之前选过的元素
        if(link.length === k) {
            res.push([...link]);
            return;
        }
        for(let i = startIndex; i <= n; i++) {
            link.push(i);
            dfs(i+1);
            link.pop();
        }
    }
    dfs(1);
    return res;
};

// 216. 组合总和 III
var combinationSum3 = function(k, n) {
    let res = [];
    let link = [];
    let sum = 0;
    if(k<=0 || n<=0)return res;

    const dfs = function(startIndex) {
        if(link.length === k) {
            if(sum === n) res.push([...link]);
            return;
        }
        for(let i=startIndex; i<=9; i++) {
            link.push(i);
            sum += i;
            dfs(i+1);
            sum -= i;
            link.pop();
        }
    }
    dfs(1);
    return res;
};

// 39. 组合总和
// 数组无重复元素，元素重复选取
var combinationSum = function(candidates, target) {
    let res = [];
    let link = [];
    
    const dfs = function(target) {
        if(target === 0) {
            res.push([...link])
          return;
        }
        if(target < 0)return;
        for(let i=0;i<candidates.length;i++) {
            link.push(candidates[i]);
            dfs(target-candidates[i]);
            link.pop();
        } 
    }
    dfs(target);
    return res;
};
// 40. 组合总和 II
// 数组有重复元素，集合不能有相同的，保证同一个树枝上可以重复，同一个树层上面不可以重复
/**
 * 
 * @param {*} candidates 
 * @param {*} target 
 * @returns 
 * 解集中不能包含重复的，就可以用这个方法去重，就需要先排序
 * 都知道组合问题可以抽象为树形结构，那么“使用过”在这个树形结构上是有两个维度的，一个维度是同一树枝上使用过（单个组合里面），一个维度是同一树层上（res里面的不同组合里面）使用过。
 * 「没有理解这两个层面上的“使用过” 是造成大家没有彻底理解去重的根本原因。」
 */
var combinationSum2 = function(candidates, target) {
    let res = [];
    let link = [];
    let used = new Array(candidates.length).fill(false);// 初始值均为false；

    const dfs = function(target, startIndex) {
        if(target === 0) {
            res.push([...link]);
            return;
        }

        if(target<0)return;// 这个条件要 不然就会超时

        for(let i = startIndex; i<candidates.length; i++) {
            // used[i - 1] == true，说明同一树支candidates[i - 1]使用过
            // used[i - 1] == false，说明同一树层candidates[i - 1]使用过
            if(i>0 && candidates[i]===candidates[i-1] && used[i-1]===false)continue;
            used[i] = true;
            link.push(candidates[i]);
            dfs(target-candidates[i], i+1);
            used[i] = false;
            link.pop();
        }
    }

    candidates.sort((x, y)=> x - y);
    dfs(target, 0);
    return res;
};

// 关于startIndex的选择
// 「本题还需要startIndex来控制for循环的起始位置，对于组合问题，什么时候需要startIndex呢？」

// 我举过例子，如果是一个集合来求组合的话，就需要startIndex，例如：回溯算法：求组合问题！，回溯算法：求组合总和！。

// 如果是多个集合取组合，各个集合之间相互不影响，那么就不用startIndex，例如：回溯算法：电话号码的字母组合

// 子集
var subsets = function(nums) {
    let res = [];
    let link = [];

    const dfs = function(startIndex) {
        res.push([...link]);// 要遍历整个树，就每次都添加进去

        for(let i =startIndex; i<nums.length;i++) {
            link.push(nums[i]);
            dfs(i+1);
            link.pop();
        }
    }
    dfs(0);
    return res;
};

//子集II
// 和组合总和II一个思想，需要处理去重操作
var subsetsWithDup = function(nums) {
    let res = [];
    let link = [];
    let used = new Array(nums.length).fill(false);
    const dfs = function(startIndex) {
        res.push([...link]);// 要遍历整个树，就每次都添加进去

        for(let i =startIndex; i<nums.length;i++) {
            if(nums[i]===nums[i-1] && used[i-1] ===false)continue;
            used[i] = true;
            link.push(nums[i]);
            dfs(i+1);
            link.pop();
            used[i] = false;
        }
    }
    nums.sort((x, y)=> x-y);
    dfs(0);
    return res;
};