---
layout: content
title: About
subtitle: 学如逆水行舟，不进则退
description: 个人简介
keywords: xiangming, 向明, 望梅知可, 前端学习总结, 前端学习
menu: 关于
permalink: /about/
---

## 个人简介

从事前端工作已经有很长一段时间了，从最初的`HTML`、`CSS`、`javascript`、`jQuery`，再到后面的 `angular1.5`，再到后面的 `React`、`react-native`、`Redux`、`mobx`，再到现在 `Vue`、`vuex`。见证了前端从最初的单一`jQuery`库走天下至`angular`、`react`、 `vue`的三足鼎立。让我感受到了前端发展的迅速，同时更让我感受到了前端的魅力以及前端拥有的无比广阔的发展空间。

## 兴趣爱好

- 看书
- 钓鱼
- 爬山
- 羽毛球

## 知识介绍

{% for category in site.data.skills %}
### {{ category.name }}
{% for keyword in category.keywords %}
* {{ keyword }}
{% endfor %}
{% endfor %}

## 联系

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }}){:target="_blank"}
{% endfor %}

* 微信公众号：
<div style='display: flex;vertical-align: top;'>
  <figure style="margin: 0;">
    <img src="https://gitee.com/xiangming25/picture/raw/master/2021-2-3/1612338183273-qrcode-8cm.jpg" />
    <figcaption style="text-align: center;">前端学习总结</figcaption>
  </figure>
</div>