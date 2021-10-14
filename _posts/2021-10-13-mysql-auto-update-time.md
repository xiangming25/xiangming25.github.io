---
layout: post
title: mysql 没有修改 createTime 字段，为什么它的值还是更新了呢？
categories: [mysql]
description: mysql 没有修改 createTime 字段，为什么它的值还是更新了呢？
keywords: mysql auto update createTime
---

最近在尝试着做一个[完整的后台管理系统](https://mp.weixin.qq.com/s/hs0-QTttgQDNX8yt1oyYbA)，包括前端和服务端。做为一个入门级 `mysql` 数据库使用者，一说到 `mysql` 数据库，我首先想到了它的图形化管理工具 `navicat premium`。这不，我就用 `navicat premium` 轻轻松松地创建了一个 `website-manage` 数据库。

![数据库名字](https://gitee.com/xiangming25/picture/raw/master/2021-10-13/1634121468120-image.png)

紧接着，创建了一张 `user` 表。当中包含的字段如下所示：

![user 表字段](https://gitee.com/xiangming25/picture/raw/master/2021-9-26/1632650192248-image.png)

就这样，通过代码对数据库进行 `CRUD` 时都挺正常。

最后在前端页面上展示时，我想根据创建时间 `createTime` 进行排序。这一步也没问题~~~

## 问题

当我修改用户信息时

![修改用户信息](https://gitee.com/xiangming25/picture/raw/master/2021-10-13/1634121753578-image.png)

当中只修改了头像、用户名、电话号码、角色。在服务端会再自动给它添加上 `updateTime` 字段。在控制台中打印的 `sql` 执行语句如下所示：

![sql 执行语句](https://gitee.com/xiangming25/picture/raw/master/2021-10-13/1634121937924-image.png)

根据 `id` 修改了 `user` 表的 `avatar`、`username`、`phone`、`updateTime` 字段。

可是，问题来了，一刷新数据库，发现，`createTime` 居然也被更新了，更新成了和 `updateTime`一样的值。这样我在排序时，因为每次更新时，`createTime` 都会更新，所以感觉就像是，根据 `updateTime` 来排序了。这是为什么呢？明明我没有更新 `createTime` 值，它为什么会改变。

最后，终于找到了问题所在。

通过 `navicat premium` 创建表字段时，如果表字段的类型为 `timestamp`。最下面有一个默认的选项 `根据当前时间戳更新` 被勾选了。这样就导致，如果有传对应时间字段的值，就用传入的对应时间字段的值。如果没有传入那个值。默认就会将这个字段更新为当前时间。也就是我这次遇见的问题。

![](https://gitee.com/xiangming25/picture/raw/master/2021-10-13/1634122367097-image.png)

将数据库创建语句导出，可以看到。

```
-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `avatar` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '头像',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `sign` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '签名',
  `createTime` timestamp NULL DEFAULT NULL  ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```

`createTime` 和 `updateTime` 都有一个 `ON UPDATE CURRENT_TIMESTAMP` 配置。

## 解决方案

在 `navicat premium` 中取消勾选 `根据当前时间戳更新` 就好了。

## 总结

基础知识很重要。如果我对 `mysql` 非常熟悉。这个小问题也不会困扰我好一会儿了。

自己在计算机领域的宽度和深度都还需要提高。