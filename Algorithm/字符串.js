// 字符串匹配
// 字符串排序
// 异位词
// 字符串压缩和解码
// 字符串反转、翻转和旋转
// 单词
// 替换字符串
// 子串
// 唯一字符
// 字符串运算
// 字符串转换
// 字符串游戏
// 括号
// 回文

//字符串和数字的转换
// js字符串转换成数字

// 将字符串转换成数字，得用到parseInt函数。
// parseInt(string) ： 函数从string的开始解析，返回一个整数。


// 举例：
// parseInt('123') : 返回 123（int）；
// parseInt('1234xxx') : 返回 1234（int）；

// js数字转换成字符串

// 将字符串转换成数字，得用到String类的toString方法

// 举例：
// var i = 10;
// var s = i.toString();
// alert(typeof s); //将输出 String


// 38.外观数列（模拟题）
// 连续以i开头的重复子串（片段）
// let j = i;
// while(j<i && s[j] ===s[i]) j++;
var countAndSay = function(n) {
    let s = '1';
    for(let i=0; i  < n-1; i++) {// 遍历每一个n去操作，n等于几就操作几次
        let ns = '';//定义一个空字符串
        for(let j= 0; j<s.length; j++) {//遍历s字符串
            let k = j;// 双指针，j<k<s.length k大于j小于s串
            while(k < s.length && s[k] === s[j]) k++;// k遍历，如果k往后移动，和j的位置的数字一样，就k++
            ns += (k-j).toString()+ s[j];// 如111 就转换成 31（111为3位数 即k-j）再加上j的值
            j = k-1;// 因为有个j++的操作，将j移动到k的位置继续后面的遍历
        }
        s = ns;//n循环了一次，就重新赋给s
    }
    return s;//返回s
};

// 49.字母异位词分组
var groupAnagrams = function(strs) {
    // 由于互为字母异位词的两个字符串包含的字母相同，因此对两个字符串分别进行排序之后得到的字符串一定是相同的，故可以将排序之后的字符串作为哈希表的键。
    const map = new Map();
    for(let str of strs) {// 拿出strs每一个元素如eat
        let array = Array.from(str);// 将str转为数组
        array.sort();// 按字典序排序
        let key = array.toString();// 转为字符串操作 比如aet
        let list = map.get(key) ? map.get(key) : new Array();// get方法读取key对应的键值，二维数组里面的数组
        list.push(str);// 将str添加到list数组中
        map.set(key, list);// 设置对应键值对
    }
    return Array.from(map.values());// 返回键对应的值，转换为数
};

// 151. 翻转字符串里的单词
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};

// c++ 版本
// class Solution {
//     public:
//         string reverseWords(string s) {
//             int k = 0;
//             for(int i=0;i<s.size();i++) {
//                 while(i<s.size() && s[i]==' ')i++;
//                 if(i==s.size())break;
    
//                 int j = i;
//                 while(j<s.size() && s[j] != ' ')j++;
//                 reverse(s.begin()+i, s.begin()+j);
    
//                 if(k) s[k++] = ' ';// 在第一个之后单词后面才加上
//                 while(i<j){
//                     s[k] = s[i];
//                     k++;
//                     i++;
//                 }
//             }
//             s.erase(s.begin() + k, s.end());
//             reverse(s.begin(), s.end());
//             return s;
//         }
//     };

// 165.比较版本号
var compareVersion = function(s1, s2) {// 这个版本有错误
    let i = 0, j = 0;
    while(i < s1.length || j < s2.length) {
        let k1 = i;
        let k2 = j;
        while(k1 < s1.length && s1[k1] !== '.')k1++;
        while(k2 < s2.length && s2[k2] !== '.')k2++;

        let a = k1 === i ? 0 : parseInt();// 获取每一段的字符串
        let b = k2 === j ? 0 : parseInt();

        if(a>b)return 1;
        if(a<b)return -1;
        i = k1+1;
        j = k2+1;
    }
    return 0;
};

var compareVersion = function(s1, s2) {
    let arr1 = s1.split('.');// 分割成为数组
    let arr2 = s2.split('.');
    let n = Math.max(arr1.length, arr2.length);// 选一个长的遍历
    for(let i=0; i<n; i++) {
        let k1 = 0;// 每次都初始化的时候为0
        let k2 = 0;// 每次都初始化的时候为0
        if(i<arr1.length) {
            k1 = parseInt(arr1[i]);
        }
        if(i<arr2.length) {
            k2 = parseInt(arr2[i]);
        }
        if(k1>k2)return 1;// 哪个大就直接返回
        if(k1<k2)return -1;
    }
    return 0;
};

//929.独特的电子邮件地址
var numUniqueEmails = function(emails) {
    let res = emails.map((item)=>{ // test.email+alex@leetcode.com
        let list = item.split('@');// [test.email+alex, leetcode.com]
        list[0] = list[0].replace(/\./g, '').split('+')[0];// 将a.b+c变成ab
        return list.join('@');//将数组变成用@拼接的字符串
    })
    // return new Set(res).size;// 去重
    return Array.from(new Set(res)).length;//这个也可以的
};

// 双指针模版(单调性+双指针)
for(let i =0;i<s.length;i++) {
    for(let j=i;j>=0;j--) {
        if(check(i, j)===false)
        break;
    }
}

//3.无重复字符的最长子串（javascipt+hash表）
var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let res = 0;
    for(let i=0, j=0; i<s.length;i++) {
        map.get(s[i])++;//这里要改写
        while(map.has(s[i])>1)map.get[s[j++]]--;//怎么改写
        res = Math.max(res, i-j+1);
    }
    return res;
};

// 利用对象模拟hash
var lengthOfLongestSubstring = function(s) {
    let res = 0;
    let temp = {};
    for(let i=0, j=0; i<s.length;i++) {
        if(!temp[s[i]]){
            temp[s[i]] = 1;
        }else {
            temp[s[i]]++;
        }
        while(temp[s[i]] > 1){
            temp[s[j]]--;
            j++;
        }
        res = Math.max(res, i-j+1);
    }
    return res;
};

//反转字符串
var reverseString = function(s) {
    for(let i=0,j=s.length-1; i < j; i++,j--) {// 从头到尾遍历
        [s[i], s[j]] = [s[j], s[i]];//交换
    }
    return s;
};

//541. 反转字符串 II
var reverseStr = function(s, k) {
    let res=s.split('');// 将字符串转为数组
    for(let start = 0; start < s.length; start += 2*k) {
        let i = start;//起点
        // 如果最后剩下不到2k个 就直接选择后面的全部数据，如果后面还有很多就选择start到k的值
        let j = start + k - 1 > s.length ? s.length : start + k - 1;
        // let j = Math.max(start+k-1, s.length-1);
        while(i<j) {//交换
            [res[i], res[j]] = [res[j], res[i]];
            i++;
            j--;
        }
    }
    return res.join('');
}

//左旋转字符串
var reverseLeftWords = function(s, n) {
    let res = [];

    for(let i=0;i<s.length;i++) {
        res[i] = s[n+i];// 将第n个字符后面的都赋值给res[i]
    }

    for(let i =0;i<n;i++) {
        res.push(s[i]);// 将反转的直接加到末尾
    }
    return res.join('');// 将数组变为字符串
};

//796.旋转字符串
var rotateString = function(A, B) {
    if(A.length !== B.length)return false;
    let A1 = A.concat(A);
    return A1.includes(B);
};

// split字符串转为数组
// join数组转为字符串

// 557.反转字符串中的单词III
var reverseWords = function(s) {
    let str = s.split(' ');// 将字符串用‘ ’转为数组
    let res= [];

    for(let i=0;i<str.length;i++) {// 取出每一个数组项
        res.push(str[i].split('').reverse().join(''));// 将数组项单词变成数组元素，再反转，然后再转为字符串
    }
    return res.join(' ');// 将数组 转为含空格的字符串
};