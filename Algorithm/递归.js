// 递归
// 面试题 08.06. 汉诺塔问题
// 思路：https://leetcode-cn.com/problems/hanota-lcci/solution/tu-jie-yi-nuo-ta-de-gu-shi-ju-shuo-dang-64ge-pan-z/
var hanota = function(A, B, C) {
    const hanio = function(nums, A, B, C) {
        if(nums === 1) {
            C.push(A.pop());
            return;
        }
        hanio(nums - 1, A, C, B);
        C.push(A.pop());
        hanio(nums - 1, B, A, C);
    }
    hanio(A.length, A, B, C);
};