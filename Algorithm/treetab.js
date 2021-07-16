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
        path += root.val.toString();
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

// 重建二叉树
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0)return null;
    const cur = new TreeNode(preorder[0]);
    const index = inorder.indexOf(preorder[0]);
    cur.left = buildTree(preorder.slice(1, index+1), inorder.slice(0,index));
    cur.right = buildTree(preorder.slice(index+1), inorder.slice(index+1));
    return cur;
};