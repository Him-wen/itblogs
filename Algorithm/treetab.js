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