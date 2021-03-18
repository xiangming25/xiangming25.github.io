---
layout: post
title: 2021年前端面试总结
categories: [common]
description: 2021年面试+真题总结
keywords: 面试, 前端面试, 2021前端面试题
---

经过在魔方工作整整四年，最终，我还是决定要离开公司了，跳出自己的舒适区，去迎接新一轮的挑战。魔方是一个很不错的公司，在这四年中，有陪伴我一起成长的伙伴，也有在迷茫时指点我的领导，我在这里学到了很多，成长了很多，非常幸运地在人生中能有这样的一段工作经历。我不知道未来会怎样，但是，我不想就这样一直下去，我相信，我可以做得更好！！！

从今年的三月初，我前前后后面试了约十家公司。刚开始时，我很忐忑，很紧张。因为很久没有找过工作，很久没有面试过了，对未知的恐惧，不知道面试官要问些什么？，我告诉自己，我必须要踏出这一步！！！那，我就找我认为比较好的公司，先试试吧，万一有机会呢，『情况总不会比现在更遭』（引用一下前辈提点的话）。

经过好几家公司的面试，我大约知道了，其实，大家问的差不多就是那几个问题，反反复复，乐此不疲。以下，我将我面试的大多能记住的题目总结如下，希望加深自己的记忆，让自己对掌握不太好的地方印象更加的深刻，同时，也想分享出来，帮助有需要的朋友，可以提前做好一些准备，为未来的升职加薪做上更加充足的准备~~~

> PS: 后面的题目，有的有给答案并加上了对应的参考链接，有的仅是我自己思考的答案，希望大家在看到后，也有自己的思考，想出属于自己的解题思路。其中，加 『*』号的地方是各个公司问的频率较高的地方

## 基本面试流程

- [自我介绍](#自我介绍)
- 技术问答
    - [html](#一-html)
    - [css](#二-css)
    - [javascript](#三-javascript)
    - [react](#四-react)
    - [vue](#五-vue)
    - [nodeJs](#六-nodejs)
    - [浏览器](#七-浏览器)
- [对未来的规划](#对未来的规划)
- [其他](#其他)
- [对面试官提问](#对面试官提问)

## 自我介绍

- 工作内容
- 掌握的技能
- 遇见的最有挑战的事是什么？当时是如何解决的
- 优点 / 业绩（列举两个就差不多了）
- 平时有从哪些方面提高自己。没有的朋友，可以点击 [前端学习资料整理](https://mp.weixin.qq.com/s/QPhVn2FxXzdCXA9TJXEZlg) 了解更多前端知识学习的途径

当介绍完后，面试官会根据你描述的工作内容，以及你自己觉得做得不错的地方，对其展开提问。这一环节主要考察的能力有：

- 对业务的理解程度（是否只是一个单纯的coder）
- 实际工作内容
- 对自己的总结能力（学习，就是一个不断反思，再进步的过程）
- 是否有对问题深入探讨，并想出解决办法的能力（自我驱动能力，想把事情做得更好）
- 是否有不断提高自己的自驱力

## 一、HTML

### H5新加的标签

- main
- header
- nav
- menu
- aside
- article
- section
- footer
- mark
- svg
- canvas
- figure
- figcaption

## 二、CSS

### * 说说盒模型

将内容分成一个一个的小盒子。每个小盒子都包含`margin`，`border`，`padding`，`content`四类。

有标准模型和IE模型两种

它们的区别是对宽高的计算不同。

标准模型是：`box-sizing: content-box`。它表示，最初的长宽只有`content`决定。其他的长宽分别向外扩展。

IE盒模型是：`box-sizing: border-box`。它表示，设定的长宽包含`border`，`padding`，`content`。只有设置了`margin`，才会对外有所影响。

[【CSS】CSS盒模型](https://zhuanlan.zhihu.com/p/74817089)

### * 垂直居中方法

知道长宽

- absolute + margin(负)
- absolute + top/right/bottom/left 0 + margin: auto
- absolute + calc(50% - 50px)
 
不知道长宽

- absolute + left: 50% + top: 50% + transform: translate(-50%, -50%)
- display: flex; justify-content: center; align-item: center
- display: table-cell; text-align: center; child: display: inline-block
- table + child: display: inline-block
- display: grid; align-self: center; justify-self: center;

[CSS实现水平垂直居中的10种方式（史上最全）](https://segmentfault.com/a/1190000016389031)

### 权重

`!important > 行内样式 > ID选择器 > 类选择器 | 属性选择器 | 伪类选择器 > 元素选择器 > 通配符选择器`

[你对CSS权重真的足够了解吗？](https://juejin.cn/post/6844903608199151630)

### css3新特性

- 圆角（border-radius）
- 阴影（box-shadow）
- 动画（animate）
- 弹性盒子（flex）
- 媒体查询（@media）

### * BFC

块级格式化上下文。

定义一个块级范围。里面的内容和其他块级的内容互不影响。

属于同一个`BFC`的两个`Box` 的 `margin` 会相互重叠。

[什么是BFC?](https://juejin.cn/post/6844903544726749198)

### 浮动如何清理

- 父级添加 `overflow: hidden`
- 给最后加上一个 `clear: both`

### 说说动画

使用`transition`定义过渡

使用 `animate` + `@keyframes`定义动画。

`@keyframes`可以定义不同时间段的展示方式。所需要的时间，开始时延迟的时间，动画的曲线以及动画的循环方式。

## 三、javascript

### * 什么是闭包

- 作用域
- 回收机制
 
每个函数在调用时，都会创建一个执行环境。这个执行环境有它的变量对象以及作用域链。通过作用域链，可以访问上层的作用域的内容。

#### 优点
- 它有一个很棒的特性就是延迟执行。这也导致了闭包只能取包含函数的最后一个值。

```
function foo (a) {
    return function (b) {
       return function (c) {
           console.log(a + b + c);
       }
    }
}

var foo1 = foo('我');
var foo2 = foo1('叫');
foo2('彭湖湾'); // 打印 我叫彭湖湾
```

- 它还可以访问其他函数作用域中的变量值

#### 缺点

- 它也有一个缺点，会造成额外的内存占用。

一般函数在调用结束后就会被销毁。

```
function foo (a) {
    return function () {
        console.log(a)
    }
}
 
var foo1 = foo(1);
var foo2 = foo(2);
var foo3 = foo(3);
foo1();  // 输出1
foo2();  // 输出2
foo3();  // 输出3
```

foo函数调用结束后， foo函数的变量对象并不会被立即销毁，而是只有当取得foo函数闭包的值的foo1, foo2, foo3调用结束， 这三个函数的变量对象和作用域链被销毁后， foo函数才算“完成任务”，这时，它才能被销毁。

[https://www.cnblogs.com/penghuwan/p/7404372.html](https://www.cnblogs.com/penghuwan/p/7404372.html)

### 实现一个单例闭包

[https://blog.csdn.net/xuyangxinlei/article/details/81282170](https://blog.csdn.net/xuyangxinlei/article/details/81282170)

### 如何跨页面通信

- 广播模式：Broadcast Channe / Service Worker / LocalStorage + StorageEvent
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

[https://juejin.cn/post/6844903811232825357](https://juejin.cn/post/6844903811232825357)

### * Promise工作流程

1. 求它的返回顺序

```
const first = () => (new Promise((resolve, reject) => {
  console.log(3);

  let p = new Promise((resolve, reject) => {
    console.log(7)
    setTimeout(() => {
      console.log(5)
      resolve(6)
    }, 0)
    resolve(1)
  });
  resolve(2)
  p.then(arg => {
    console.log(arg)
  })
}));

first().then(arg => {
  console.log(arg);
})

console.log(4)

3 > 7 > 4 > 1 > 2 > 5

```

2. 打印它的执行顺序

```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
 
async function async2() {
    console.log('async2');
}
 
console.log('script start');
 
setTimeout(()=>{
    console.log('setTimeout');
},0)
 
async1();
 
new Promise((resolve)=>{
    console.log('promise1');
    resolve();
}).then(()=>{
    console.log('promise2');
});
 
console.log('script end');

// Script start > Async1 start > async2 > promise1 > script end > async1 end > promise 2 > setTimeout
```

- [https://juejin.cn/post/6844903735290757133](https://juejin.cn/post/6844903735290757133)
- [promise经典面试题](https://juejin.cn/post/6844903632203153415)

### * Promise 和 async await的区别

 `async` `await` 是 `generator` 的语法糖，它返回一个 `promise` 类型值。返回值有像 `Promise` 的 `resolve` 值一样，会将后面的内容加入微任务中，等待同步任务执行完成后，再来执行 `await` 后面的内容。
 
 [async、await 实现原理](https://zhuanlan.zhihu.com/p/115112361)

### 实现一个二分查找

前提：数组有序

```
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let centerIndex = Math.ceil(left + (right - left) / 2)
        if (target < nums[centerIndex]) {
            right = centerIndex - 1
        } else if (target > nums[centerIndex]) {
            left = centerIndex + 1;
        } else if (target === nums[centerIndex]) {
            return centerIndex;
        }
    }
    return -1;
};

// 输入： [-1,0,3,5,9,12] 9
// 输出：4
```

### * 说一说箭头函数

箭头函数没有 `arguments`，`super`，`new.target`等方法

- 箭头函数能不能当构造函数

箭头函数没有 `prototype`，不可能当作构造函数 

- 可以使用call绑定吗

箭头函数不会创建自己的 `this`，不能使用`call`的方式对它重新绑定

### 如何实现数组递归

```
const baseList = [
  { id: 1001, parentId: 0, name: 'AA' },
  { id: 1002, parentId: 1001, name: 'BB' },
  { id: 1003, parentId: 1001, name: 'CC' },
  { id: 1004, parentId: 1003, name: 'DD' },
  { id: 1005, parentId: 1003, name: 'EE' },
  { id: 1006, parentId: 1002, name: 'FF' },
  { id: 1007, parentId: 1002, name: 'GG' },
  { id: 1008, parentId: 1004, name: 'HH' },
  { id: 1009, parentId: 1005, name: 'II' },
]

function format(originList, parentId) {
  let newList = []
  newList = newList.concat(originList.filter(item => item.parentId === parentId))

  newList = newList.map(item => {
    const findChildren = findChildList(item.id)
    return {
      ...item,
      children: findChildren || [],
    }
  })

  function findChildList(id) {
    let list = originList.filter(item => item.parentId === id) || []
    if (list.length) {
      list = list.map(item => ({
        ...item,
        children: findChildList(item.id),
      }))
    }
    return list
  }

  return newList
}

const result = format(baseList, 0)
```

### 如何实现事件的监听、取消监听、调用监听

```javascript
class Event {
    constructor() {
        // do something
    }
    on() {
        // do something
    }
    off() {
        // do something
    }
    emit() {
        // do something
    }
}
```

### * 说一说原型和原型链

![原型链图解](https://gitee.com/xiangming25/picture/raw/master/2021-3-1/1614593106922-prototype.png)

[https://github.com/mqyqingfeng/blog/issues/2](https://github.com/mqyqingfeng/blog/issues/2)

### 白屏时间和首屏时间如何计算

[前端性能监控方案（首屏、白屏时间等）](https://juejin.cn/post/6844904020482457613)

### 发布 / 订阅模式实现原理

EventEmitter

- on
- emit
- off

[https://kaiwu.lagou.com/course/courseInfo.htm?courseId=510#/detail/pc?id=4853](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=510#/detail/pc?id=4853)

### 已知当前时间，求『上周三』，『下周六』，『周日』的具体时间，返回 '2021-01-28' 这样的时间格式

// 发散思维

### 写方法验证 ip 地址是否正确？

// 发散思维

### 峰值位置计算

```
var peakValue = function (nums) {
  // 实现逻辑写到这个函数里，返回峰值
    let index = 0
    nums.reduce((accu, pre, next) => {
        let flag = false
        if (next > pre) {
            flag = true
        } else if (next < pre && flag) {
            index = accu
        } else {
            flag  = false
        }
        return accu + 1
    }, 0)
    return index
}
// test
console.log(peakValue([1,2,3,1]))
console.log(peakValue([1,2,1,3,5,6,4]))
console.log(peakValue([6,5,4,3,2,1]))
```

### 最小半径计算

> 有一排房子，1、2、3、4，设置基站，[1, 4]（最小半径为1），或者 [10]（最小半径为9），求它的最小覆盖半径

// 发散思维

## 四、React

### * 说说fiber

// 发散思维

- 为什么要用 `fiber`
- 解决了什么问题
- 实现原理

### * diff 原理

从上向下，从左向右

[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)

[从React渲染流程分析Diff算法](https://segmentfault.com/a/1190000016304921)

### * 原生事件和合成事件一起触发，谁先执行？

原生事件先触发，因为合成事件使用的是事件委托机制，所有的事件都有代理在 `document` 上，事件需要向上冒泡才能到达 `document` 上，然后再触发事件执行

[探索 React 合成事件](https://bbs.huaweicloud.com/blogs/213759)

### React 和 Vue 的区别

相同点：

- 都是 `view` 层
- 都是使用的 `virtual DOM`
- 单向数据流，通过 `props` 向下传递数据值
 
不同点：

- `React` 使用 `jsx` 语法调用
- `Vue` 使用 `template` 模板调用
- 更新数据方式不同。`react` 需要调用 `setState`更新，`vue` 直接修改更新

### * 事件机制

[https://www.jianshu.com/p/41776f2f4d8b](https://www.jianshu.com/p/41776f2f4d8b)

### 说说它的双缓存机制

// 发散思维

### * setState的工作原理

// 发散思维

### * setState什么时候是同步的，什么时候是异步的

`React` 合成事件触发时是异步事件，浏览器原生事件触发时是同步事件

详细的可以从 `react` 事件机制方面来说。

实战，说出分别点击下面三个按钮后的执行值。

```
import React from "react";
import "./styles.css";

export default class App extends React.Component{
  state = {
    count: 0
  }

  increment = () => {
    console.log('increment setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });

    console.log('increment setState后的count', this.state.count)
  }

  triple = () => {
    console.log('triple setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });

    this.setState({
      count: this.state.count + 1
    });

    this.setState({
      count: this.state.count + 1
    });

    console.log('triple setState后的count', this.state.count)

  }

  reduce = () => {
    setTimeout(() => {
      console.log('reduce setState前的count', this.state.count)
      this.setState({
        count: this.state.count - 1
      });

      console.log('reduce setState后的count', this.state.count)
    },0);

  }

  render() {
    return (
        <div>
          <button onClick={this.increment}>点我增加</button>
          <button onClick={this.triple}>点我增加三倍</button>
          <button onClick={this.reduce}>点我减少</button>
        </div>
    )

  }

}

```

### getDerivedStateFromProps是一个静态方法，如何在里面访问到this实例

- 使用 `componentDidUpdate` 替换
- 使用 `Hooks` 的 `useEffect` 结合第二个参数替换

### * 说说对 Redux 的理解

- 原理
- redux 是如何实现时间旅行

### * hooks 为什么出现，解决了哪些问题

// 发散思维

### react 16 与 15 相比，少了一些生命周期钩子函数，少了哪些？为什么不要它们了？

少了

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

多了

- getDerivalStateFromProps
- getSnapshotBeforeUpdate

// 发散思维
## 五、Vue

### * 如何对数组进行监听

所有的数据都存放于 `data` 中，`data` 会返回一个对象，当调用对象上面的属性时，就会触发 `getter` 方法，所以，不管是对象还是数组，都是在 `getter` 阶段收集依赖。

数组有重写 `push`、`pop`、`shift`、`unshift`、`sort`、`reverse` 等方法。数组触发更新是在触发了更改数组的这几个方法这里触发的。

[https://nlrx-wjc.github.io/Learn-Vue-Source-Code/reactive/array.html](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/reactive/array.html)

### * hash 路由和 history路由有哪些区别和优点

- `hash` 路由是根据 `hashChange` 来监听路由是否有更新。
- `history` 路由是调用 `HTML5 history interface` 中的 `pushState`、`replaceState`，通过监听 `popstate` 来监听路由的变化

### * 组件中的 data 为什么是一个函数，实例中的data为什么是一个对象

组件需要复用，所以组件中的 `data` 需要是一个函数，并且返回一个对象。让复用的组件数据间不相互影响。如果不使用函数返回一个全新的对象，那不同的组件其实就是调用的对象的引用类型，一个地方变了，其他组件也会发生变化。

实例中的 `data` 只在创建时使用，不存在复用，所以它可以直接是一个对象。

### 怎么用vm.$set()解决对象新增属性不能响应的问题

- 如果 `set` 的值是 `Array`，调用数组的 `splice` 触发响应式更新。
- 如果 `set` 的值是 `Object`，调用最初的 `defineReactive` 方法触发更新。

[https://cn.vuejs.org/v2/guide/reactivity.html](https://cn.vuejs.org/v2/guide/reactivity.html)

### computed 和 methods的区别？其实现原理

// 发散思维
### 说说 MVVM

// 发散思维
### 调度原理

// 发散思维
## 六、nodeJs

- 了解过 `nodeJs` 吗？
- 用过它的哪些框架？(koa，eggJs)

## 七、浏览器

### * 输入 url 后的一些执行流程

[在浏览器输入 URL 回车之后发生了什么？（超详细版）](https://zhuanlan.zhihu.com/p/82956784)

### 如何命中强缓存，如何命中协商缓存

[https://juejin.cn/post/6844903838768431118](https://juejin.cn/post/6844903838768431118)


## 对未来的规划

未来 `3` - `5` 年，自己有什么目标？

## 其他

### git flow 工作流程

- 平时是怎么使用 `git` 的
- 它的分支模型是什么

### 线上错误信息如何收集

- window.onerror
- react 有 componentDidCatch 钩子函数
- sentry

如果说使用了 `sentry`，应该又会问，`sentry` 是如何实现错误收集的

### 常见的状态码你了解哪些

- 200
- 204
- 301
- 304
- 400
- 403
- 404
- 500
- 503
...

更多信息，可以参考 - [前端为什么要了解HTTP？前端为什么要了解HTTP？](https://mp.weixin.qq.com/s/BFeNfdgRA-gL_cu5XdL2Hg)


## 对面试官提问

- 公司使用的技术栈
- 未来如果能去公司，自己的工作内容主要有哪些
- // 其它