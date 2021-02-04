---
layout: post
title: Safari开始支持WebP， WebP的春天要来了
categories: [common]
description: Safari从2020年开始支持使用WebP格式图片
keywords: WebP
---

## WebP是什么？

`WebP` 是一种同时提供了 `有损压缩` 和 `无损压缩` 的图片文件格式。目的是为了减少图片体积，加快加载图片的速度。可用于像 `jpg`、 `jpeg` 这样的图像，也可以用于像 `png` 这样的半透明图像。相比 于`jpg`和`png`，`WebP`所占资源平均比`jpg`和`png`小`30%`以上。

这个，大家可能都知道的吧。那为什么今天要专门再说一遍呢？？？

原因是：

`safari` 也支持 `WebP` 了！

`safari` 也支持 `WebP` 了！

`safari` 也支持 `WebP` 了！

重要的事情说三遍~~~

## 兼容性

目前除 `IE` 浏览器外，主流浏览器均支持 `WebP` 格式图片

![兼容性查询](https://gitee.com/xiangming25/picture/raw/master/2021-2-2/1612237697797-WebP%E5%85%BC%E5%AE%B9%E6%80%A7.png)


## 优点

最大的优点就是，体积小，所占资源少，访问时能更快地下载好。`WebP` 在不损坏图片质量的前提下，通常比 `jpg`、`jpeg`、`png` 所占的资源小 `30%`以上。


**真实数据对比**


图片 | 原图大小 | WebP大小 | 压缩率
---|---|---|---
banner1.jpg | 174kb | 50kb | 71.3%
banner2.jpg | 184kb | 128kb | 30.4%
banner3.jpg | 166kb | 92kb | 44.6%
test-png1.png | 151kb | 86.2kb | 42.9%
test-png2.png | 902kb | 545kb | 39.6%
test-png3.png | 675kb | 439kb | 35%

使用的转换工具为 [Convertio](https://convertio.co/zh/download/2e9c410c5149f58d6627af25634a90110fb2df/)

## 缺点

部分浏览器兼容性不太好，目前主要表现在 `IE`浏览器上。在 `2020年` 之前，浏览器几大巨头之一的 `safari` 不支持，这个就极大地限制了 `WebP` 的发展。好在，`2020年`，`safari 14` 也支持了 `WebP` 的使用。


> Improvements for media in WebKit include support for a new image format and new video playback capabilities. This release of WebKit in Safari 14 adds support for the WebP open-source image format. It offers content authors smaller file sizes for lossy and lossless formats with advanced features like alpha-channel transparency and animations.


我相信，再过不久，等最新的浏览器在普通用户中的覆盖率越来越大时，`WebP`的使用率一定会大大地增加。


## 现有哪些公司在使用

目前的大公司以及使用图片较多的产品都开始使用`WebP`了

1. [淘宝](http://taobao.com/)
2. [京东](https://www.jd.com/)
3. [腾讯视频](https://v.qq.com/)
4. [花瓣网](https://huaban.com/explore/huwaihunli)

......


## 图片如何存储

以淘宝中的图片为例

![淘宝首页截图](https://gitee.com/xiangming25/picture/raw/master/2021-2-2/1612250734233-taobao-webp.png)

在`Chrome`中的链接为：

```
<img src="img.alicdn.com/imgextra/i4/3818963170/O1CN01H4YB6I1ZHu22uqdrl_!!3818963170-0-daren.jpg_180x180xzq90.jpg_.webp" alt="焦点图">
```

在 `Safari`中的链接为：

```
<img src="//img.alicdn.com/imgextra/i2/2206686532409/O1CN01UgZgpA1TfMmLlAirY_!!2206686532409-0-lubanimage.jpg_290x290q90.jpg" alt="焦点图">
```

可以看到，在支持`WebP`的浏览器链接后面同时有`.jpg` 和 `.webp`，它访问的就是`WebP`图片。不支持的就使用`.jpg`类图片。

所以，目前阶段使用`WebP`需要存储两份，一份用于支持`WebP`的浏览器访问，一份用于不支持`WebP`的浏览器访问。

流程图如下：

![WebP访问流程图](https://gitee.com/xiangming25/picture/raw/master/2021-2-2/1612252953441-webp-use.png)



## 如何应用到我们自己的项目中

1. 服务端检查`Accept`头部，判断当前浏览器是否支持`WebP`格式图片，动态返回`jpg`、`png`、或者`WebP`

> 支持`WebP`图片的浏览器在向服务器发送请求时，会在请求头`Accept`上带上`image/webp`然后服务器就可以根据是否含有这个头信息来决定是否返回`WebP`图片

2. 使用 `Modernizr` 来判断浏览器是否支持 `WebP`，由前端来控制是请求 `WebP`图片还是其他类型图片

3. 使用`javascript`来检查卢兰去是否支持`WebP`的某些特性。然后再由前端来决定请求哪类资源

```
function check_webp_feature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}
```

3. 使用 `HTML5` 的 `<picture>`标签

```
<picture>
    <source class="img" srcset="~/assets/img/test/test_png.webp" type="image/webp">
    <img class="img" src="~/assets/img/test/banner.jpg"/>
</picture>
```

## 参考链接

- [https://webkit.org/blog/11340/new-webkit-features-in-safari-14/](https://webkit.org/blog/11340/new-webkit-features-in-safari-14/)
- [https://developers.google.com/speed/webp/faq](https://developers.google.com/speed/webp/faq)
- [https://cloud.tencent.com/developer/article/1090825](https://cloud.tencent.com/developer/article/1090825)
