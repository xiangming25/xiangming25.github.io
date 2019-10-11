---
layout: post
title: call、apply、bind对比
categories: javascript
description: call、apply、bind对比
keywords: call, apply, bind, new compare
---

分析call、apply、bind、new 的异同以及实现原理

## 作用

改变函数的 this 对象的指向

## 相同点

1. 都是改变函数 this 指向的
2. 第一个参数都是 this 要指向的对象
3. 都可以利用后续的参数进行传参

## 不同点

1. `bind` 方法返回的是一个改变 this 后的函数，`call`、`apply`是直接返回改变 this 后函数的执行结果
2. `call` 的传参方式是直接按顺序传入，`apply` 的传参方式是传入一个数组
3. `bind` 的传参可以和 `call` 一样，也可以在返回的函数就再次执行时再传入对应的参数

## 举例说明

- 基础数据

```
var person1 = {
    name: '张三',
    age: 12,
    sex: 1,
    info: function(interest, address, work) {
        var str = 'name: '+this.name + ' age: ' + this.age + ' sex: '+this.sex;
        if (interest) {
            str += ' interest: '+interest;
        }
        if (address) {
            str += ' address: '+address;
        }
        if (work) {
            str += ' work: '+work;
        }
        console.log(str);
    }
}

var person2 = {
    name: '李四',
    age: 18,
    sex: 0,
}

```

- 不添加额外参数

```
>> person1.info()       // name: 张三 age: 12 sex: 1

>> person1.info.call(person2)       // name: 李四 age: 18 sex: 0

>> person1.info.apply(person2)       // name: 李四 age: 18 sex: 0

>> person1.info.bind(person2)()     // name: 李四 age: 18 sex: 0
```

- 添加额外参数

```
>> person1.info('篮球', '四川省', 'business')       // name: 张三 age: 12 sex: 1 interest: 篮球 address: 四川省 work: business

>> person1.info.call(person2, '足球', '广西省', 'actor')       // name: 李四 age: 18 sex: 0 interest: 足球 address: 广西省 work: actor

>> person1.info.apply(person2, ['足球', '广西省', 'actor'])       // name: 李四 age: 18 sex: 0 interest: 足球 address: 广西省 work: actor

// 使用 bind 传参第一种方式
>> person1.info.bind(person2, '足球', '广西省', 'actor')()     // name: 李四 age: 18 sex: 0 interest: 足球 address: 广西省 work: actor

// 使用 bind 传参第二种方式
>> person1.info.bind(person2)('足球', '广西省', 'actor')     // name: 李四 age: 18 sex: 0 interest: 足球 address: 广西省 work: actor
```

## 性能对比

call 的性能高于 apply，原因是 call 方法的参数格式是内部方法需要的格式，不需要进行转换。

[github call 和 apply 性能对比结果](https://github.com/noneven/__/issues/6)

## 实现原理

### call

```
Function.prototype.myCall = function(context) {
    var context = context || window;
    context.fn = this;      // 这里 this 指向调用myCall 的function
    var params = [...arguments].slice(1);
    var result = context.fn(params);
    delete context.fn;      // context.fn，这个会影响指向的新对象，所以调用完后需要删除它
    return result;
}
```

### apply

```
Function.prototype.myApply = function(context) {
    var context = context || window;
    context.fn = this;      // 这里 this 指向调用myCall 的function
    var params = [...arguments][1];
    var result = null;
    if (!params) {
        result = context.fn();
    } else {
        result = context.fn(...params);     // ** 注意这里的 params 一定要用 ...展开，否则会把params当成只有一个参数，参数的值为一个数组
    }
    delete context.fn;      // context.fn，这个会影响指向的新对象，所以调用完后需要删除它
    return result;
}

>> person1.info.myApply(person2, ['乒乓球', '北京']);   // name: 李四 age: 18 sex: 0 interest: 乒乓球 address: 北京
```

### bind

```
Function.prototype.myBind = function(content) {
    var _this = this;
    var params = [...arguments].slice(1);
    // 返回一个函数，在函数中再重新指定this的指向
    return function() {
        return _this.call(content, ...params, ...arguments);
        //return _this.apply(content, [...params, ...arguments]);
    }
}
```

## 相关功能 - new

### 作用

[new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)创建一个用户定义的对象类型或具有构造函数的内置对象的实例

### 实现原理

```
function myNew() {
    var obj = new Object();
    var Constructor = [].shift().call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}
```

- 用 new Object() 创建了一个新对象 obj
- 取出第一个参数，也就是传入的构造函数，shift会改变原数组的值，所以经过 shift 后的arguments没有了之前的第一个参数
- 将 obj 的原型链指向构造函数，这样 obj 就能访问到构造函数原型中的属性
- 使用 apply 将构造函数的 this 指向 obj，这样 obj 就能访问到构造函数中的属性
- 判断 ret 的值，如果 ret 是对象，就直接返回执行后的结果，如果不是对象，就返回 obj

## 参考链接

- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [https://www.cnblogs.com/cosiray/p/4512969.html](https://www.cnblogs.com/cosiray/p/4512969.html)
- [https://segmentfault.com/a/1190000016705780](https://segmentfault.com/a/1190000016705780)
- [JavaScript深入之new的模拟实现](https://juejin.im/post/590a99015c497d005852cf26)