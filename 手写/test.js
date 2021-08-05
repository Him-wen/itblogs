var obj = {
    value:2,
}

var bar = function(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}


Function.prototype.apply = function() {
    
}
bar.calls(obj, 'james', 12)