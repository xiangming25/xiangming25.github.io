---
layout: post
title: TypeScript 报 Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser错误
categories: [TypeScript]
description: Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser
keywords: typescript parsing error, parserOptions.project
---

使用 `ant design pro` 初始化一个 `Typescript` 项目。在开发中，为了简化文件，将文件中用到的 `TypeScript` 类型定义单独提出为一个文件，取名和`index.d.ts`。

![](https://gitee.com/xiangming25/picture/raw/master/2021-9-14/1631603579428-image.png)

然后在里面写类型定义，发现报 `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.` 错误。

![](https://gitee.com/xiangming25/picture/raw/master/2021-9-14/1631603820617-image.png)

问题的原因是：在同一个文件夹下，存在两个相同的名字，比如上面的 `index.tsx`、`index.d.ts`。这样 `TypeScript` 在解析时就会报错。

## 解决方法

1. 将 `index.d.ts` 重新换一个名字。比如：`login.d.ts`。
2. 将 `index.d.ts` 移动到其它文件夹。比如：`src/user/index.d.ts` 或者 `typing/login.d.ts`