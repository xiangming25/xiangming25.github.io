---
layout: content
title: About
description: 个人简介
keywords: xiangming, 向明
comments: false
share: false
menu: 关于
permalink: /about/
---

解释再多，不如看看结果

## 联系

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }}){:target="_blank"}
{% endfor %}

## Skill Keywords

{% for category in site.data.skills %}
### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
