---
layout: post
title: javascript-this
categories: javascript
description: javascript-this理解
keywords: javascript, this 
---

深入理解Javascript中关于this的指向

<!-- more -->

### 面向对象语言和javascript语言中关于this的区别
在JAVA等面向对象的语言中，this关键字的含义是明确且具体的，即指代前面对象。一般在编译期确定下来，称为编译期绑定。而在 JavaScript 中，this 是动态绑定，或称为运行期绑定的，这就导致 JavaScript 中的 this 关键字有能力具备多重含义。

### 对this 的错误理解
对`this`字面意思本身的误解

#### 误解一
指向本身

哪些情况下函数内部会引用函数本身 ---- 递归

错误举例

```
function foo(num) {
    console.log("foo:  " + num);
    this.count++;       => 记录foo被调用的次数;
}

foo.count = 0;

var i;

for(i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}
=> foo: 6;
=> foo: 7;
=> foo: 8;
=> foo: 9;

=> foo 被调用了多少次？;

console.log(foo.count);         // 0
```

```
var birth = '1992';
function user(name, age) {
    this.name = name;
    this.age = age;
	console.log(this.birth);
}
这里的this指向的是全局
```

经过测试，foo函数里面的this指向的是全局的

将 foo.count = 0; 改为 var count = 0;

最后打印 count的值，它的值就是4

或者将 foo.count 改为 var data = { count: 0 };  词汇作用域的方式

this.count++ 改为 data.count++;

**哪种情况下，函数能指向自身呢？**
```
具名函数.
function foo() {
    foo.count = 4;
}
```
匿名函数无法指向自身，它指向的是全局

```
setTimeout(function() {
    // 无法在这里指向自身
}, 100);
```
==Anonymous functions are not bound to an object in this context, meaning the this object points to window unless executing in strict mode (where this is undefined).==

==翻译：在这个上下文（执行环境）中匿名函数并没有绑定到任何一个对象中，意味着this指向window（除非这个上下文（执行环境）是在严格模式下执行的，而严格模式下该this指向undefined）==


### 误解2 ---- this指向函数的作用域
需要明确的是，this在任何情况下都不指向函数的词法作用域。

什么是词法作用域 ---- JS 采用的是静态使用域，在函数定义的时候就决定了。

与它相对的是动态使用域，js中可以通过`eval`来实现。

```
function foo() {
    var a = 2;
    this.bar();
    console.log(this.a);        =>  undefined;
}

function bar() {
    console.log(this.a);
}

foo();  // ReferenceError: a is not defined
```

### this到底是什么
this是在运行时进行绑定的，并不是在编写是绑定的，它的上下文取决于函数调用时的各种条件。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文），这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这个记录的一个属性，会在函数执行的过程中用到。

this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

总的原则：**this指的是，调用函数的那个对象**。


### 对象中嵌套的方法中，使用的this，它指向的位置是哪里？
作为函数调用时，this绑定到全局对象，作为方法调用时，this绑定到该方法所属的对象上，对象中嵌套的方法中，使用的this，它指向的位置是哪里？

```
var point = { 
x : 0, 
y : 0, 
moveTo : function(x, y) { 
    // 内部函数
	var z = 9;
	function showZ() {
		console.log("this:---", this);
	}
    // 内部函数
    var moveX = function(x) { 
    this.x = x;//this 绑定到了哪里？;
   }; 
   // 内部函数
   var moveY = function(y) { 
   this.y = y;//this 绑定到了哪里？
   }; 
 
   moveX(x); 
   moveY(y); 
   } 
}; 
point.moveTo(1, 1); 
point.x; //==>0 
point.y; //==>0 
x; //==>1 
y; //==>1
this:--- window
```
内部定义的函数还是绑定到了window上


```
var point = {
x : 0, 
y : 0, 
z : 1,
moveTo : function(x, y) { 
    // 内部函数
	var z = 9;
	function showZ() {
		console.log(this.z);
	}
    var moveX = function(x) { 
    this.x = x;//this 绑定到了哪里？;
   }; 
   // 内部函数
   var moveY = function(y) { 
   this.y = y;//this 绑定到了哪里？
   }; 
	return {
		moveX: moveX,
		moveY: moveY,
		showZ: showZ,
		// z: 3,
	};
 	showZ();
   } 
};

// point.moveTo().showZ();     => 3
point.moveTo().showZ();     => undefined
```

### this 的绑定方式
1 默认绑定
```
function foo() {
    console.log(this.a);
}
var a = 2;

foo(); => 2
```
函数默认绑定的this指向的是全局

2 显示绑定(call, apply, bind)   

- call

    `func.call(this, arg1, arg2);`
- apply

    `func.apply(this, [arg1, arg2])`
- bind

    第一个参数必须是this
    `function.bind(thisArg[, arg1[, arg2[, ...]]])`
    ```
    参数;
    thisArg
    调用绑定函数时作为this参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。;
    
    arg1, arg2, ...
    当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。;
    
    返回值;
    返回一个原函数的拷贝，并拥有指定的this值和初始参数。
    ```


call, apply, bind的区别

```
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```
    
3 隐式绑定

- 隐式绑定规则会把函数调用中的this绑定到这个上下文对象
- 对象属性引用链中只有上一层或者说是最后一层在调用位置中起作用

```
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    foo: foo
};
obj1.obj2.foo();            => 42
```

- 隐式丢失

```
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo;
var a = 'out data';

 bar();         => out data
```

这里的bar它引用的是foo函数本身，因此此时的bar（）其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

4 new绑定


### 优先级 
如果某个调用位置可以应用多条规则该怎么办？

默认绑定 < 隐式绑定 < 显示绑定 < new绑定

new 和 call / apply 无法同时使用，因此无法通过new foo.call(obj1) 来直接进行测试，但是我们可以通过硬绑定的方式来测试它的们优先级

### 如何判断this
1 函数是否在new中调用（new 绑定）？如果是的话this绑定的是新创建的对象。

    var bar  = new foo();
    
2 函数是否通过call、apply（显示绑定）或者硬绑定调用？如果是的话，this绑定的是指定的对象。
    
    var bar = foo.call(obj2)
    
3 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文的对象。

    var bar = obj1.foo()
    
4 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定一undefined, 否则绑定到全局对象。

    var bar = foo()
    
    
### 绑定例外



ES6的箭头函数，它实际上是根据外层的作用域来决定this的

在es6之前，有一种方式与它是一样的

```
function foo() {
    var self = this;
    setTimeout(function() {
        console.log(self.a);
    }, 100);
}

var obj = {
    a: 2,
};

foo.call(obj);  // 2
```

注意

如果你经常编写this风格的代码，但是绝大问你时候都会使用self = this, 或者箭头函数来还否定this机制，那你或许应当：

    1 只使用读书词法作用域并完全抛弃错误this风格的代码。
    2 完全采用this风格，在必要时使用bind(...)，尽量避免使用self = this和箭头函数。
    当然，包含这两种代码风格的程序可以正常运行，但是在同一个函数或者同一个程序中混合使用这两种风格通常会使代码更难维护，并且可能也会更难编写。
    

### 小结
如果要判断一个运行中函数的this绑定，就需要找到这个函数的真接调用位置，找到之后就可以顺序应用下面这四条规则来判断this的绑定对象。

1. 由new 调用？绑定到新创建的对象。
2. 由call或者apply（或者bind）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到undefined，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想『更安全』地忽略this绑定，你可以使用一个DMZ对象，比如& = Object.create(null)，以保护全局对象。

ES6中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法使用域来决定this，具体来说，箭头函数会继承外层如法炮制调用的this绑定（无论this）绑定到什么。这其实和ES6之前代码中的self = this机制一样。


### 参考链接
- [https://www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/index.html](https://www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/index.html)
- [https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)
- [简书-JavaScript bind() 的用法
](https://www.jianshu.com/p/ee175cade48b)
- [MDN-Function.prototype.bind()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [【优雅代码】深入浅出 妙用Javascript中apply、call、bind](https://www.cnblogs.com/coco1s/p/4833199.html)
