---
layout: post
title: VSCode自定义快捷键
categories: [VScode]
description: 如何在VSCode中设置快捷键
keywords: vscode快捷键,自定义快捷键, vscode, close others, vscode 快速折叠菜单栏文件夹
---

## 为什么要设置

`VSCode` 自己默认设置了许多（包含80%以上）的快捷键，对于普通用户来说，已经完全足够了。但是，在开发中，有一些功能键出于某些特殊的原因，并没有设置快捷键，那些功能又对我们的开发有所帮助。此时，将那些没有快捷键的功能设置自定义快捷键就非常有必要了。

## 举例说明

1. 在一个 `VSCode` 窗口中打开了许多的文件，开发完成后，觉得除当前文件外，其它文件都可以关闭了，此时，右键当前文件名，选择 `close others` 就可以关闭。
2. 现在的大多数文件，都支持按住 `ctrl` 然后点击对应的方法名，就可以跳转到它定义的地方，如果这是一个 `node_modules` 里面的包，这下就会把 `node_modules` 展开，导致左边菜单栏展开得很长，不方便后续其它文件的查找。当然，使用鼠标，滚动到左边的最上面，再点一下 `node_modules` 文件夹也可以关闭。

或者点击这里，折叠起所有的文件夹

![](https://gitee.com/xiangming25/picture/raw/master/2021-7-23/1627008581100-image.png)

当然，这些通过鼠标都可以操作。但是，如果能直接用快捷键操作，是不是可以更快速？？？

## 如何设置

### 找到对应要设置快捷键的功能在 `VSCode` 中对应的名称

![](https://gitee.com/xiangming25/picture/raw/master/2021-7-23/1627007895590-image.png)

`File > preferences > keyboard shortcuts`

或者

`ctrl + K + S`

搜索需要设置快捷键的功能，比如 `close other`

双击 `keybinding`

![](https://gitee.com/xiangming25/picture/raw/master/2021-7-23/1627008267412-image.png)

输入需要设置的快捷键 `alt + Q` （这个快捷键完全自定义，没有限制，不过为防止和其它应用程序快捷键冲突，建议不要设置为太通用的一些快捷键，比如： `ctrl + C` 这些）

按 `enter` 后即可

添加成功后，在用鼠标执行某些功能时，也会有对应的快捷键提示

![](https://gitee.com/xiangming25/picture/raw/master/2021-7-23/1627008324426-image.png)

## 自定义快捷键对照表

名称 | 快捷键
---|---
关闭除当前窗口的其它页面 | alt + Q
全局搜索（包含更多上下文信息） | ctrl + alt + F
快速折叠左边导航栏文件 | alt + C
--- | ---

