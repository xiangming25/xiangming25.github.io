---
layout: post
title: typescript catch 值类型报错解决方案
categories: [TypeScript]
description: typescript catch 值类型报错解决方案
keywords: typescrpit catch value type error, 如何修改catch值类型, catch 值类型在 window和mac上显示不一致
---

抓狂：`typescript` 不设置 `catch` 值类型，会报 `unknown` 错误，设置了又会报 `Catch 子句变量不能有类型批注` 错误。这个该怎么办？

## 前言

使用 `vscode` 开发 `react` + `typescript` 有一段时间了，被 `vscode` 里面的插件机制深深地吸引了，需要什么快捷提示，安装一个它对应的插件即可。心里默默赞叹，这开发工具，真的帮助开发省去了不少时间。

然后，奇怪的事情，就这样发生了~~~

## 问题

为方便开发 `typescript` 项目，在插件库中搜索了 `JavaScript and TypeScript Nightly` 插件，`582k` 的安装量，心想应该不会有什么问题吧。于是，不知什么时候，之前开发过程中使用得很开心的`try catch`语句，神奇地报了个错误。

![catch报错信息](https://gitee.com/xiangming25/picture/raw/master/2021-6-9/1623249502793-image.png)

`(local var) err: unknown`？

## 操作

好吧！没有定义它的类型是吧~~~

来来来，直接上代码

``` typescript
try {
  // do something
} catch (err: any) {
  showErrorMsg(err.message);
}
```

完事儿，就这么简单？

确实，我的电脑上是 `OK` 了。

同事使用 `mac` 电脑 `pull` 下来了最新的代码后

![catch 报错](https://gitee.com/xiangming25/picture/raw/master/2021-6-9/1623250032077-image.png)

设置成 `any` 也会报错，这是什么情况？

然后各种 `google` 查找资料。

大家的回答都很统一（可能大家没有遇见和我相似的问题），回答的大概内容是，`通过抛出不同的 error，catch 对应的 error 值类型也可能是多样的，不确定的`，如果我们想具体处理 error 中的值，需要在 `catch` 判断 `error` 值的类型，然后分开处理。示例如下：

```
try {
  myroutine(); // There's a couple of errors thrown here
} catch (e) {
  if (e instanceof TypeError) {
    // A TypeError
  } else if (e instanceof RangeError) {
    // Handle the RangeError
  } else if (e instanceof EvalError) {
    // you guessed it: EvalError
  } else if (typeof e === "string") {
    // The error is a string
  } else if (axios.isAxiosError(e)) {
    // axios does an error check for us!
  } else {
    // everything else  
    logMyErrors(e);
  }
}
```

> The broad set of possible values, the single catch clause, and the uncertainty of errors that happen only allow two possible types for e: `any` and `unknown`.

[https://fettblog.eu/typescript-typing-catch-clauses/](https://fettblog.eu/typescript-typing-catch-clauses/)

我真的要这样做吗？我只想在 `catch` 中提示一下 `error` 中的 `message` 信息，如果每个地方都要这样写，那我不知要多花多少时间来处理这个才行。

不行，一定有解决办法的！

查找了几乎所有的和这个问题相关的信息。最后，还是没有找到我需要的答案。

回到问题发生的地方，突然眼前一亮。

![catch 初始时的值类型](https://gitee.com/xiangming25/picture/raw/master/2021-6-9/1623250594962-image.png)

大约几秒钟之后，再看它的类型：

![catch报错信息](https://gitee.com/xiangming25/picture/raw/master/2021-6-9/1623249502793-image.png)

从 `any` 变成了 `unknown`?

问题找到了，不是 `windows` 和 `mac` 系统差异问题，很有可能是自己使用 `vscode` 的问题。

然后查找了一下我目前当前的 `typescript` 插件，确实有安装过`JavaScript and TypeScript Nightly`插件，尝试把它卸载后，重启 `vscode`，没有再报这个错误了。再安装回来，一阵 `loading` 后，又报上了上面提到的错误。基本可以确定，问题就是在这里。

## 总结

- 写完全符合 `typescript` 规范的代码（上面的错误有报 `ts1196` 错误，那就是不应该给 `catch` 添加类型）
- 公司开发过程中，大家的插件尽量保持一致，好用的一起用，不好用的，大家慎用，提高开发效率的同时，尽可能的减少这些不必要的排查问题时间