---
layout: post
title: css实现上中下布局，footer一直在最底部的多种方式
categories: css
description: css实现上中下布局，footer一直在最底部的多种方式
keywords: css, 上中下布局, footer一直在最底部
---

整理实现上中下布局，footer一直在页面最底部的多种实现方式

## 效果图

内容较少时

![内容较少时](/assets/images/2019/10/content-less.png)

内容较多时

![内容较少时](/assets/images/2019/10/content-more.png)


## 基础代码

css
```
<style type="text/css">
* {
  margin: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
</style>
```

html

```
<main>
    <header></header>
    <article></article>
    <footer></footer>
</main>
```

## 方法一 absolute

footer 设置绝对定位到最底部。main 的高度设置为 100%，设置 padding-bottom 的高度为 footer 的高度，并设置 main 的 position 为 relative，设置 footer 定位为 absolute, bottom: 0

```
main {
  position: relative;
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
}
header {
  width: 100%;
  height: 100px;
  background-color: #f00;
}
article {
  background-color: #0f0;
}
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #00f;
}
```

兼容性：

- 通用

## 方法二 flex

```
main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
header {
  width: 100%;
  height: 100px;
  background-color: #f00;
}
article {
  flex: 1;
  background-color: #0f0;
}
footer {
  width: 100%;
  height: 100px;
  background-color: #00f;
}
```

具体flex使用方式，[参考链接](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

兼容性：

- IE 11
- IE10 需要加 -ms-

## 方法三 display: table

```
main {
  display: table;
  width: 100%;
  min-height: 100%;
}
header {
  display: table-row;
  width: 100%;
  height: 100px;
  background-color: #f00;
}
article {
  display: table-row;
  background-color: #0f0;
}
footer {
  display: table-row;
  width: 100%;
  height: 100px;
  background-color: #00f;
}
```

兼容性:

- IE8
 

## 方法四 js

通过js获取header以及中间内容的高度，如果高度小于window的高度减去footer的高度，就给footer动态添加一个悬浮在底部的样式

```
html,
body,
main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
header {
  height: 100px;
  background-color: #f00;
}
article {
  background-color: #0f0;
}
footer {
  height: 100px;
  background-color: #00f;
}
/* 动态为footer添加类fixed-bottom */
.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
```

```
$(function(){
  function footerPosition(){
      $("footer").removeClass("fixed-bottom");
      var contentHeight = document.body.scrollHeight,//网页正文全文高度
          winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
      if(!(contentHeight > winHeight)){
          //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
          $("footer").addClass("fixed-bottom");
      }
  }
  footerPosition();
  $(window).resize(footerPosition);
});
```

兼容性：

- IE8
- iphone手机端可能会出现定位问题

## 方法五 calc

使用 calc

```
header {
  height: 100px;
  background-color: #f00;
}
article {
  min-height: calc(100vh - 200px);
  background-color: #0f0;
}
footer {
  height: 100px;
  background-color: #00f;
}
```

兼容性：

- IE9

## 参考链接

- [https://aotu.io/notes/2017/04/13/Sticky-footer/index.html](https://aotu.io/notes/2017/04/13/Sticky-footer/index.html)
- [https://segmentfault.com/a/1190000004453249](https://segmentfault.com/a/1190000004453249)