---
layout: post
title: react-native中的平台差异
categories: react-native
description: react-native中的平台差异
keywords: react-native, platform different
---

使用react-native过程中，经常发现由于平台不同而导致的bug，在此对常见的差异进行总结，防止后面继续踩坑

## 1. 在View里面用绝对定位给右上角设置一个图标，超出View部分
- IOS ---- 显示
- Android ---- 被截断
解决办法：
```
设置一个大的View将它们两个都包裹起来，右上角的小图标以距离大图标的右边以及上边来确定位置
```

## 2. 给TextInput设置高度，高度为32
- IOS ---- 输入的内容正常显示
- Android ---- 输入的内容顶部被截断（默认有paddingVertical问题）
解决办法：
```
给TextInput设置 paddingVertical： 0
```

## 3. 给一个View设置阴影
- IOS ---- 能通过代码直接设置
- Android ---- 不能通过代码直接设置
解决办法：
```
1. 判断平台，如果是安卓，就用一张带阴影的背景图片
2. 平台区分，android平台用另外一种样式代替，比如加border
```

## 4. 弹出框取消
- IOS ---- 无物理返回键
- Android ---- 有物理返回键
解决办法：
```
1. 弹框上面有关闭按钮
2. 弹出框使用Modal组件，给组件添加`onRequestClose={this.close}`事件监听，监听到点击了物理返回键，做对应的处理
```

内容持续更新中~~~~~~

