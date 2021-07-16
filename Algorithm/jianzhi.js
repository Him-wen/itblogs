// 剑指offer
// 二维数组的查找
function Find(target, array) {
    // write code here
  // 从左下角开始算，大于目标的话 往上，小于的话往右
  let x = array.length - 1;
  let y = 0;
  while(x>=0 && y<=array[0].length) {
    if(array[x][y] === target) {
      return true;
    }else if(array[x][y] > target) {
      x--;
    } else {
      y++;
    }
  }
  return false;
}

// 数组中重复的数字
var findRepeatNumber = function(nums) {
  const array = nums.sort();
  for(let i=0; i<array.length; i++) {
      if(array[i] === array[i+1]) {
          return array[i];// 排序去重
      }
  }
};
var findRepeatNumber = function(nums) {
  const s = new Set();//Set去重
  for(let n of nums) {
      if (!s.has(n)) {
          s.add(n);
      } else return n;
  }
  return -1;
};

// 替换空格
var replaceSpace = function(s) {
  let res = '';
  for(let n of s) {
      if(n === ' ')res += '%20';
      else res += n;
  }
  return res;
};

// 从尾到头打印链表
var reversePrint = function(head) {
  let res = [];
  while(head) {
      res.push(head.val);
      head = head.next;
  }
  return res.reverse();
};

// 重建二叉树
var buildTree = function(preorder, inorder) {
  if(preorder.length === 0)return null;
  const cur = new TreeNode(preorder[0]);// 以前序遍历的第一个为根节点
  const index = inorder.indexOf(preorder[0]);// 找到中序遍历的中间值
  cur.left = buildTree(preorder.slice(1, index+1), inorder.slice(0,index));
  cur.right = buildTree(preorder.slice(index+1), inorder.slice(index+1));
  return cur;
};
// 斐波那契数列 迭代
var fib = function(n) {
  let a = 0, b = 1,sum = 0;
  for(let i=0; i<n; i++){
      sum = (a+b)%1000000007;
      a = b;
      b = sum;
  }
  return a;
};
// 递归
var fib = function(n) {
  if(n<=1)return n;
  return (fib(n-1)+fib(n-2))%1000000007;
};