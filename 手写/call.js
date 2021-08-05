var obj ={
    value:2
}

function bar(name,age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

Function.prototype.call2 = function (context) {
    context = context || window;
    context.fn = this;// this代表第一个函数
    var agrs = [];
    for(var i = 1; i<arguments.length; i++){// 与apply区别，这里是从1开始
        agrs.push('arguments[' + i + ']');
    }
    var res = eval('context.fn(' + agrs + ')');
    delete context.fn;
    return res;
}

bar.call2(obj,'james',18)// 就是一个函数调用另外一个函数
