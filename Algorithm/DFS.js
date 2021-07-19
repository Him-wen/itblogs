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
            //和子集相比的多了一个这个
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

//全排列II
var permuteUnique = function(nums) {
    if(!nums.length) return [];
    let res = [];
    let link = [];
    let used = new Array(nums.length).fill(false);

    const dfs = function() {
        if(link.length === nums.length) {
            res.push([...link]);
            return;
        }

        for(let i =0; i < nums.length; i++) {
            //和全排列相比的多了一个这个
            if(i>0 && nums[i] === nums[i-1] && used[i-1] === false)continue;// 解集的去重同子集和组合的题目
            if(used[i]=== false) {// 没用过的才能加入进来
                link.push(nums[i])
                used[i] = true;
                dfs();
                used[i] = false;
                link.pop();
            }
        }
    }
    nums.sort((x, y) => x - y);
    dfs();
    return res;
};

// n皇后
var solveNQueens = function(n) {
    function isValid(row, col, chessBoard, n) {
        for(let i = 0; i < row; i++) {
            if(chessBoard[i][col] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    let result = []
    function backtracing(row,chessBoard) {
        if(row === n) {
            const stringsBoard = chessBoard.slice(); // 拷贝一份board
            for (let i = 0; i < n; i++) {
                stringsBoard[i] = stringsBoard[i].join(''); 
                // 将每一行拼成字符串
            }
            result.push(stringsBoard); // 推入res数组
            return;
        }
        for(let col = 0; col < n; col++) {
            if(isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1,chessBoard)
                chessBoard[row][col] = '.'
            }
        }
    }
    let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))
    backtracing(0,chessBoard)
    return result
    
};

// 79单词搜索
// 一般做返回boolean值的题目 基本上都是判断dfs是否为true或者false；
var exist = function(nums, word) {
    let x = nums.length;// 获取行数
    let y = nums[0].length;// 获取列数

    const dfs = function(i, j, index) {
        //各种越界的处理
        if(i<0 || i>=x || j<0 || j>=y || nums[i][j] !== word[index]) return false;
        if(index === word.length-1)return true;
        
        let temp = nums[i][j];//暂时存储
        nums[i][j] = '1';
        // 这里就是选择的过程 4种情况，相当于是组合排列里面的for循环，也就是树里面的宽度，进行递归
        let res = dfs(i-1, j, index+1) || dfs(i, j-1, index+1) || dfs(i+1, j, index+1) || dfs(i, j+1, index+1);
        nums[i][j] = temp;// 还原现场
        if(res)return true;
    }

    for(let i=0; i<x;i++)
        for(let j=0;j<y;j++)
            if(dfs(i, j, 0))return true;
    return false;
};