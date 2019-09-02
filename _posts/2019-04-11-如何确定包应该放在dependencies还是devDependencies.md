---
layout: post
title: 如何确定包应该放在dependencies还是devDependencies
categories: npm
description: 区分包放的位置
keywords: dependencies&devDependencies
---

包存在的位置在开发过程中不会有什么影响，但是在生产环境中，如果把开发环境的依赖包放在了生产环境的依赖包中，就会增大最后的打包体积，存在潜在的风险

## 了解什么是开发环境，什么是生产环境

1. 开发环境是指写开发这个应用时用到的环境，当中可以包含调试工具，打包工具等
2. 生产环境是指发布到线上后的环境，当中只需要用到正常使用过程中必要的包

## 明确这两个包的区别

`dependencies` 表示依赖
`devDependencies` 前面多了一个`dev`，`dev` 意思是`develop`，也就是开发环境

安装时如果使用 `--save` 就是将包放在了`dependencies` 下面
安装时如果使用 `--save-dev` 就是将包放在了`devDependencies` 下面

## 哪此包放在 `dependencies` 下面

直接影响用户使用，如果缺少app就不能使用的包，比如网络请求要用到的`axios`，整个的框架`react`，`react-native`, `redux`等

## 哪此包放在 `devDependencies` 下面

只会在开发环境使用的包，就放在`devDependencies`，比如调试要用到的日志工具`redux-logger`，打包要用到的`gulp`，`webpack`等