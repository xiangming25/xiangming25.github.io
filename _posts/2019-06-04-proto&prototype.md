---
layout: post
title: JS原型及原型链
categories: javascript
description: JS原型及原型链
keywords: javascript, prototype
---

## 什么是原型
原型在JS中的名称是 `prototype` ，它是挂载在[构造函数](https://www.jianshu.com/p/95a5faee17f1)上的一个用于[继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)时可以共享的一个对象，在我们声明一个函数时，这个对象会自动创建。它是一个显示的属性，并且只有函数才有，但有一个例外：

```
let fun = Function.prototype.bind()
```

## 什么是原型链

原型链在JS中的名称是 `__proto__`，它是每个对象都有的一个隐式原型属性，指向创建该对象的构造函数的原型。由于 `prototype` 也是一个对象，所以`prototype`也有一个`__proto__`指向生成它的构造函数的原型，这样一层一层地原型指向，形成了原型链。

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var person1 = new Person();

person1.__proto__ === Person.prototype;

Person.prototype.__proto__ === Object.prototype;

person1.hasOwnProperty("name");

```
可以看到，`person1` 通过一层一层的原型链关联，最后它拥有 `Object` 原型函数下面所带有的方法。

## 它们有什么作用

用于 `JS` 中使用继承功能时共享父函数中部分属性。


## 参考链接
1. [深度解析原型中的各个难点](https://github.com/KieSun/Dream/issues/2)
2. [简书-最详尽的 JS 原型与原型链终极详解，没有「可能是」](https://www.jianshu.com/p/dee9f8b14771)
2. [阮一峰-Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
3. [人人都能懂的构造函数](https://www.jianshu.com/p/95a5faee17f1)
4. [封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
4. [构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
5. [非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)
