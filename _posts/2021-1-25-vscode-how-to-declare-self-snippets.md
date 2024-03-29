---
layout: post
title: 如何在VScode中自定义代码模板
categories: VScode
description: VScode自定义模板
keywords: vscode自定义模板, vscode snippets, vscode 代码片段
---

## 前言

使用`VScode`三年了，深刻感受了用它在开发代码时的方便。从最初的直接开发`html`，到后面的 `react-native`，再到后面的 `Vue`，用起来可谓是得心应手。其中很有意思的一个功能是在初始化文件模板时：

- 在写`html`时，只需要新建一个后缀为`.html`的文件，在文件内的头部输入一个 `!` 感叹号，然后按一下`Enter` 键，就可以完成一个 `html` 模板的初始化创建。
- 在写 `react-native` 时，只需要创建一个后缀为 `.js` 的文件，然后在文件内的头部输入 `rnc`，然后再按 `Enter`键， 就可以创建一个 `react-native` 初始化模板。
- 在写 `vue` 时，只需要创建一个后缀为 `.vue` 的文件，然后在文件内的头部输入一个 `v`，然后按 `Enter` 键，就可以完成一个 `Vue` 单文件组件的创建。

好奇的我，在写`react` 的 `stateless`时，也想试试能不能自定义模板，结果一查，果然，还真的可以，这用了这么多年的 `VScode`，这么好的功能居然自己没有用到过，感觉像的白用了。

那么，具体应该怎么做呢？

## 方法

### macOS

点击 `Code` > `preferences` > `User Snippets`，选择 `New global Snippets file`，打开的文件中，已经有一些模板了，模板如果下：

```
{
	// Place your snippets for javascriptreact here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
}
```

其中，`prefix` 是我们输入快捷的命令，`body` 就是我们输入了快捷后，按 `Enter`后要显示的内容。

好了，话不多说，删除多余的注释，咱们来写一个我们需要用到的 `react stateless`模板吧！

```
{
	"react stateless component": {
		"scope": "javascript,typescript",
		"prefix": "srnc",
		"body": [
			"import React from 'react'",
			"import PropTypes from 'prop-types'",
			"import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'",
			"",
			"const $1 = props => {",
			"  const { $2 } = props",
			"  return (",
			"    <View style={styles.container}>",
			"      <TouchableOpacity>",
			"        <Text>{$2}</Text>",
			"      </TouchableOpacity>$0",
			"    </View>",
			"  )",
			"}",
			"",
			"$1.propTypes = {",
			"  $2: PropTypes.string,",
			"}",
			"",
			"const styles = StyleSheet.create({",
			"  container: {",
			"    flex: 1,",
			"  },",
			"})",
			"",
			"export default $1",
			"",
		],
		"description": "react stateless component"
	}
}
```

这里的内容与初始化创建的模板基础上一致，多了一个`scope`，这个属性指定这个快捷命令可以在哪些类型的文件中使用，这里我指定了 `react stateless` 可以在 `javascript` 或者 `typescript` 文件类型中使用。

当我们新建一个 `.js` 或者 `.ts`文件时，在文件内容的头部输入一个`srnc`，再按`Enter`键，就可以快速地创建一个我们需要的无状态组件模板啦。

**注意：代码中有标注`$1`，`$2`，`$n`，以及 `$0`，它们分别表示初始化模块后，光标会首先在标注为 `$1` 的地方，修改好`$1`处的内容后。按 `Tab` 键，光标会切换到 `$2`，以此类推，最后，光标会停留在 `$0` 处。**

### windows

在 `windows`系统和在 `macOS`系统上都大同小异，唯一不同的是，在入口处，`windows`的入口是：`文件` > `首选项` > `用户代码片段`

## 其他

如果想创建其他代码模板，也可以使用同样的方法。更多自定义模板功能，可以参考 `VScode` [官方文档](https://code.visualstudio.com/docs/editor/userdefinedsnippets) 查看。
