---
layout: post
title: AMD&CommonJS
categories: javascript
description: AMD&CommonJS
keywords: javascript, AMD, CommonJS 
---

最近在学习nodejs的KOA框架，在查资料的时候遇见了点问题，顺着信息一步一步找下去，让我了解了一下一直以来不是很明白的什么时候用AMD规范，什么时候用CommonJS规范问题。

## 使用场景
1. ==CommonJS一般用于服务器端==，因为CommonJS规范的==加载是同步的==，也就是只有加载完成，才能执行后面的操作，由于服务器的代码文件，一般存在于本地硬盘，所以加载起来比较快，在这个方面，使用CommonJS比较合适。

2. ==AMD一般用于用户（浏览器）端==，AMD规范的加载是==异步==的，允许加载哪个先加载完就先执行哪个内容，在访问过程中，由于网络问题或电脑配置问题，请求资源速度不能得到很好的保障，所以使用异步更合适。

## 区别

1. CommonJS定义一个单独的文件就是一个模块，通过exports返回，比如:

```
文件//message.js
　　exports.message = {
　　　　console.log("this is a message module");
　　};
```

在另外一个文件中，就可以通过require的方式对它进行加载：

```
文件//use.js
　　//加载
　　var message = require('message');
　　//使用下面的方法
　　message.message(); 　　　　==> "this is a message module"
```

2. AMD规范是非同步的，允许指定回调函数，主要用于客户端编程。

```
//module a.js
　　define([],function(){
　　　　var obj = {
　　　　　　show:function(){
　　　　　　　　console.log("show");
　　　　　　}
　　　　}
　　　　return obj;
　　});

　　//在b.js模块中引入a.js
　　define(['a'],function(a){
　　　　var obj_b = {
　　　　　　hideAfterShow:function(){
　　　　　　　　a.show();
　　　　　　　　console.log('hide');
　　　　　　}
　　　　}
　　　　return obj_b;
　　});
```

## 参考链接
- [http://www.open-open.com/doc/view/f7df10bb81c347f79b436faa85dcfd81](http://www.open-open.com/doc/view/f7df10bb81c347f79b436faa85dcfd81)
