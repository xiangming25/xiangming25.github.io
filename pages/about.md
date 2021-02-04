---
layout: content
title: About
subtitle: 心态影响状态，态度决定高度
description: 个人简介
keywords: xiangming, 向明
comments: false
menu: 关于
permalink: /about/
---

## 联系

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }}){:target="_blank"}
{% endfor %}

## 知识介绍

{% for category in site.data.skills %}
### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
