---
layout: post
title: 使用react-native遇见过的坑
categories: react-native
description: 使用react-native遇见过的坑
keywords: react-native different
---

在使用react-native开发APP时，对遇见的一些坑，进行总结，整理。

## new Date()
1. 使用new Date()获取时间，取的时间的设备是什么？   
如果是使用xcode给真机装的debug包，它请求的时间是给它安装的电脑的本地时间，而不是请求的手机的本地时间.

2. ios 手机上使用new Date()设置一个具体的时间   
. 不能用 new Date('2017-08-01')， 需要使用new Date('2017/08/01 00:00:00');    
. 并且，这个在debug上不会出现问题，在release安装到真机上时， 使用new Date('2017-08-01').getTime()获取到的时间戳是NaN.

## scrollView下嵌套listView
如果scrollView是竖向的，listView的onReachEnd会一直被触发。

## Android启动时，报SDK location not found错误
Android 启动时，报A problem occurred configuring project ':app'. > SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

1. 去到项目的android目录。
2. 创建一个文件 local.properties。
3. sdk.dir = /Users/USERNAME/Library/Android/sdk

其中的USERNAME 是电脑的当前用户名字 。

## 参考链接
- [https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found](https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found)
