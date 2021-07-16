// 平衡二叉树
// 使用的后序遍历
var isBalanced = function(root) {
    const dfs = function(root) {
        if(!root) return 0;
        let leftmin = dfs(root.left);
        if(leftmin === -1)return -1;// 如果已经不是平衡树了，直接返回即可，
        let rightmin = dfs(root.right);
        if(rightmin === -1)return -1;
        let res;
        if(Math.abs(leftmin - rightmin) > 1) {// 差值大于1 就不是平衡树
            res = -1;
        }else {
            res = 1 + Math.max(leftmin, rightmin);// 否则是平衡树 返回其中的高度
        }
        return res;
    }
    return dfs(root) !== -1;// 返回判断res的值 是不是等于-1;
};

//相同的树
var isSameTree = function(p, q) {
    if(p && !q)return false;
    else if(!p && q)return false;
    else if(p && q && p.val !== q.val)return false;
    else if(!q && !p)return true;

    let sameleft = isSameTree(p.left, q.left);
    let sameright = isSameTree(p.right, q.right);
    return sameleft && sameright;// 返回所有的有true的并集
};

//二叉树的所有路径
var binaryTreePaths = function(root) {
    let res = [];
    const dfs = function(root, path) {
        if(!root) return [];
        path += root.val.toString();// 左右节点不为空的话 就加入操作，然后就到if，不满足的话 就执行else
        if(!root.left && !root.right) {
            res.push(path);
        }else {
            path += '->';
            dfs(root.left, path);
            dfs(root.right, path);
        }
    }
    dfs(root, '');
    return res;
};

// 左叶子之和
var sumOfLeftLeaves = function(root) {
    if(!root)return 0;
        let leftval = sumOfLeftLeaves(root.left);
        let rightval = sumOfLeftLeaves(root.right);
        let sum = 0;
        if(root.left && !root.left.left && !root.left.right) {
            sum = root.left.val;
        }
        return sum + leftval +rightval;
};

// 路径总和 
// 这题需要返回值
// 因为终止条件是判断叶子节点，所以递归的过程中就不要让空节点进入递归了。
var hasPathSum = function(root, targetSum) {
    if(!root)return false;
    if(!root.left && !root.right && root.val === targetSum) return true;
    let leftpath = hasPathSum(root.left, targetSum-root.val);
    let rightpath = hasPathSum(root.right, targetSum-root.val);
    return leftpath || rightpath;// 有一条成功就行
};

// 另外的一种解法
var hasPathSum = function(root, targetSum) {
    if(!root) return false;
    const dfs = function(root, count) {
        if(!root.left && !root.right && 0 === count) return true;
        if(!root.left && !root.right && 0 !== count) return false;
        if(root.left) {
        if(dfs(root.left, count-root.left.val))return true;
        // 递归函数是有返回值的，如果递归函数返回true，说明找到了合适的路径，应该立刻返回。
        }
        if(root.right) {
            // 这个地方是有隐藏着的回溯
        if(dfs(root.right, count-root.right.val))return true;
        }
        //这里是回溯的完整过程
        // if(root.left) {
        //     count-=root.left.val;
        // if(dfs(root.left, count))return true;
        //     count+=root.left.val;
        // }
        // if(root.right) {
        //     count-=root.right.val;
        // if(dfs(root.right, count))return true;
        //     count+=root.right.val;
        // }
        return false;
    }
    return dfs(root, targetSum-root.val);// 这里初始化为targetSum-root.val的原因
};

// 113路径总和II
var pathSum = function(root, targetSum) {
    if(!root) return [];
    let res = [];
    const dfs = function(root, count, path) {
        if(!root.left && !root.right && 0 === count) return res.push([...path]);
        if(root.left) {// 采用回溯的形式
            path.push(root.left.val);
            if(dfs(root.left, count-root.left.val, path));
            path.pop();//回溯
        }
        if(root.right) {//空节点就不遍历
            path.push(root.right.val);
            if(dfs(root.right, count-root.right.val, path));
            path.pop();
        }
    }
    dfs(root, targetSum-root.val, [root.val]);
    return res;
};
//路径总和：2个的区别 一个是返回有没有true或者false就行，一个是返回所有路径

// 重建二叉树（从前序与中序遍历构造二叉树）
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0)return null;
    const cur = new TreeNode(preorder[0]);// 前序遍历根节点
    const index = inorder.indexOf(preorder[0]);// 中序遍历根节点
    // 左子树的时候 前序数组从1开始的递归操作，右子树的时候 中序数组中间index没参与递归
    cur.left = buildTree(preorder.slice(1, index+1), inorder.slice(0,index));//左子树进行递归
    cur.right = buildTree(preorder.slice(index+1), inorder.slice(index+1));//右子树进行递归
    return cur;
};

// 从中序与后序遍历序列构造二叉树
var buildTree = function(inorder, postorder) {
    if(postorder.length === 0) return null;
    let cur = new TreeNode(postorder[postorder.length - 1]);
    let index = inorder.indexOf(postorder[postorder.length - 1]);
    // 左子树的时候 中序数组中间index没参与递归（left到index的前一个，right从index+1开始），右子树的时候 后序数组递归操作到slice end=-1的时候
    cur.left = buildTree(inorder.slice(0, index), postorder.slice(0, index));
    cur.right = buildTree(inorder.slice(index+1), postorder.slice(index, -1));
    return cur;
};

// 最大二叉树
var constructMaximumBinaryTree = function(nums) {
    const dfs = function(arr, left, right) {
        if(left > right)return null;
        let maxVal = -1;
        let maxIndex = -1;
        for(let i = left; i<= right;i++) {
            if(maxVal < arr[i]) {
                maxVal = arr[i];
                maxIndex = i;
            }
        }
        let cur = new TreeNode(maxVal);
        cur.left = dfs(arr, left, maxIndex-1);
        cur.right = dfs(arr, maxIndex+1, right);
        return cur;
    }
    return dfs(nums, 0, nums.length - 1);
};

// 递归函数什么时候加if，什么时候不加if，其实就是控制空节点（空指针）是否进入递归，是不同的代码实现方式，都是可以的。
// 「一般情况来说：如果让空节点（空指针）进入递归，就不加if，如果不让空节点进入递归，就加if限制一下， 终止条件也会相应的调整。」
// 递归中如何隐藏着回溯
// 如何通过三层关系确定左叶子
// 如何通过二叉树深度来判断左下角的值
// 递归函数究竟什么时候需要返回值，什么时候不要返回值？
// 前序和中序，后序和中序构造唯一二叉树
// 使用数组构造某一特性的二叉树

// 找树左下角的值（递归，前序遍历找最深的点，还可以用层序遍历）
// 那么如果找最左边的呢？可以使用前序遍历，这样才先优先左边搜索，然后记录深度最大的叶子节点，此时就是树的最后一行最左边的值。
var findBottomLeftValue = function(root) {
    let minVal = null;// 初始化最深度的值
    let minPath = -1;// 初始化最深度的层数
    const dfs = function(root, depth) {
        if(!root.left && !root.right) {
            if(depth > minPath) {// 深度大于之前保存的深度，就替换
                minPath = depth;
                minVal = root.val;// 最大深度最左边的值
            }
        }
        if(root.left)dfs(root.left, depth+1);
        if(root.right)dfs(root.right, depth+1);
    }
    dfs(root, 1);
    return minVal;
};

// 合并二叉树
var mergeTrees = function(root1, root2) {
    if(!root1 && !root2)return null;
    if(!root1)return root2;
    if(!root2)return root1;
    root2.val += root1.val;
    root2.left= mergeTrees(root1.left, root2.left);
    root2.right= mergeTrees(root1.right, root2.right);
    return root2;
};

//二叉搜索树 一定要使用中序
// 遇到在二叉搜索树上求什么最值啊，差值之类的，就把它想成在一个有序数组上求最值，求差值，这样就简单多了。
var searchBST = function(root, val) {
    if(!root)return root;
    if(root.val === val)return root;
    if(root.val > val){
       return searchBST(root.left, val);
    }
    if(root.val < val){
       return searchBST(root.right, val);
    }
};
// 98验证二叉搜索树
var isValidBST = function(root) {
    let arr = [];
    const dfs = function(root) {
        if(!root)return true;
        dfs(root.left);
        arr.push(root.val);
        dfs(root.right);
    }
    dfs(root);
    for(let i =1;i<=arr.length;i++) {
        if(arr[i] <= arr[i-1])return false;
    }
    return true;
};