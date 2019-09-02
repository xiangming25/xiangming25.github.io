---
layout: post
title: javascript实现继承的七种方式
categories: javascript
description: javascript实现继承的多种方式
keywords: javascript extends, javascript 继承
---

JS 实现继承的方式目前有 7 类

- 构造函数继承
- 原型链继承
- 组合继承
- class 继承
- 实例继承
- 拷贝继承
- 寄生组合继承
 

### 基类

```
function Animal(name, age) {
    this.name = name || 'Animal';
    this.age = age || 5;
    this.sleep = function() {
        console.log(this.name + '正在睡觉');
    }
}

Animal.prototype.eat = function(food) {
    console.log(this.name + ' 正在吃 ' + food);
}
```

### 1. 构造函数继承

核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（原型链上的属性不会被复制）

```
function Cat() {
    Animal.call(this);
    this.name = 'Tom';
    this.gender = 'male';
}

var cat = new Cat();
console.log(cat, new Animal());
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
```
![image.png](/assets/images/2019/07/9418595-0ca2dd38e800de38.jpg)

由上面的示例结果可以看出，使用构造函数来继承，它只继承了父类中绑定在this下面的属性，原型链上的属性是没有被继承的

优点：
1. 解决了子类实例共享父类引用属性的问题
2. 创建子类实例，可以向父类传递参数
3. 可以实现多继承（call 多个父类对象）
 
缺点：
1. 实例并不是父类的实例，只是子类的实例
2. 只能继承父类的构造函数时声明的属性和方法，不能继承父级原型链上的属性和方法
3. 无法实现函数复用，每个子类都有父类实例函数的复本，影响性能


### 2. 原型链继承

核心：将父类的实例作为子类的原型

```
Animal.prototype.body = ['head', 'arm'];
function Cat() {
    this.name = 'Tom';
}
Animal.prototype.eat = function() {
    console.log('I can eat');
}
Cat.prototype = new Animal();
var cat = new Cat();
console.log(cat, new Animal());
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
var cat1 = new Cat();
var cat2 = new Cat();
cat1.body.push('foot');
console.log(cat1, cat2);
```

![image.png](/assets/images/2019/07/9418595-e72451c13695d37e.jpg)

![image.png](/assets/images/2019/07/9418595-766be81acd48d59a.jpg)

由上面的结果可以看出，实例化了两个对象，更改其中一个对象的值，另外一个对象的值也受到了影响

优点：
1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2. 父类新增原型方法 / 属性，所有的子类都能访问到
3. 实现起来很简单
 
缺点：
1. 可以在Cat构造函数中，为Cat实例增加实例属性。但要新增原型属性和方法，则必须放在new Animal()这样的语句之后
2. 无法实现多继承
3. 来自原型对象的所有属性被所有实例共享
4. 创建子类实例时，无法向父类构造函数传参

### 3. 组合继承

核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```
Animal.prototype.body = ['head', 'arm'];
function Cat() {
    Animal.call(this);
    this.name = 'Tom';
}
Animal.prototype.eat = function() {
    console.log('I can eat');
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
var cat1 = new Cat();
var cat2 = new Cat();
cat1.body.push('foot');
console.log(cat1, cat2);
```

优点：
1. 弥补了方式2的缺陷，可以继承实例属性 / 方法，也可以继承原型属性 / 方法
2. 既是子类的实例，也是父类的实例
3. 不存在引用属性共享问题
4. 可传参
5. 函数可复用
 
缺点：
1. 调用两次父类构造函数，生成了两实例（子类实例将子类原型上的那人屏蔽了）

### 4.class 继承

核心：class 是 ES6 新增的语法，真的 class 创建一个类，使用extends来继承

```
class Animal {
    constructor() {
        this.name = 'Tom';
    }
    play() {
        console.log('animal');
    }
}

class Cat extends Animal {
    constructor(type) {
        super(type);
        this.type = 'cat';
    }
}

var cat = new Cat();
```
方便快捷地完成继承，但是仅支持 ES6 及以上的版本，使用的时候需要考虑兼容性

### 5. 实例继承

为父类实例添加新特性，作为子类实例返回

```
function Cat() {
    var instance = new Animal();
    instance.name = 'Tom';
    return instance;
}

var cat = new Cat();
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
```

优点：
1. 不限制调用方式，不管使用 new 还是 子类 ，返回的对象都具有相同的效果

缺点：
1. 实例是父类的实例，不是子类的实例
2. 不支持多继承
 
### 6 拷贝继承

核心：将父类的构造属性通过循环的方式绑定到新的构造函数上来

```
function Cat() {
    var animal = new Animal();
    for (var p in animal) {
        Cat.prototype[p] = p;
    }
    Cat.prototype.name = 'Tom';
}
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
```

优点：
可以实现多继承

缺点：
1. 效率低，内存占用高
2. 不能继承父类不可枚举的值
 

### 7 寄生组合继承

核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次方法 / 实例，避免组合继承的缺点

```
function Cat(name) {
    Animal.call(this);
    this.name = name || 'Tom';
}

(function () {
    var Super = function() {};
    Super.prototype = Animal.prototype;
    Cat.prototype = new Super();
    Cat.prototype.constructor = Cat;
})();

var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat);    // true
```

优点：
较为完美的实现

缺点：
实现较为复杂

