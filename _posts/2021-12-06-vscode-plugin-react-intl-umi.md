---
layout: post
title: vscode插件react-intl-umi开发总结
categories: [VScode]
description: vscode插件react-intl-umi开发总结
keywords: react-intl,umi-local,vscode plugin,vscode国际化插件
---

## 前言

从 `11月` 月初开始，正式进入到国际化项目的开发中。此项目是使用 [ant-design-pro](https://pro.ant.design/docs/getting-started/) 脚手架搭建的一个支持多语言切换的项目。之前没有未接触过国际化项目，心里对他充满了好奇以及期待。终于，现在有这样的机会，让我可以如愿地在实际项目中进行一波尝试。

## 遇见的问题

1. 整个文件全英文。`按钮`、`内容`、`props` 这些也都使用 `{intl.formatMessage({ id: '**.**.**' })}` 这样的方式来使用。英语稍微差一点的朋友，阅读代码略显吃力。
2. 文案修改。偶尔需要修改一下文案，一改就可能需要将所有的语言配置文件都修改一遍，经常在验证自己有没有改全时，都得使用 `ctrl + shift + F` 全局搜索。然后一个一个点进去看修改的内容是否正确。费时、费力。

## 操作过程

通过查看代码。全局语言切换本质上是使用 [react-intl](https://formatjs.io/docs/react-intl/)，然后再结合 `umi` 提供的 [@umijs/plugin-locale](https://umijs.org/zh-CN/plugins/plugin-locale#umijsplugin-locale) 来实现的。 

我想，我遇见了问题，其他人应该也有遇见过吧~

在 `vscode` 的 `extensions` 中搜索 `react-intl` | `umi-locale`。

果然，搜索到了几个已有插件。

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-6/1638761375172-image.png)

一个一个地去试了后，发现每一个都有自己的特色，但都无法很好地满足我的需求。一翻操作后，最后还是决定自己再开发一个插件。

## 需求列表

### 鼠标移动上去后，需要自动提示

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-5/1638714132577-image.png)

### 自动跳转

按住 `ctrl/Command + 文本内容`，可以自动跳转到对应配置文件以及对应的位置。

![](https://mmbiz.qpic.cn/mmbiz_gif/kTnUXxRKH9wNia7PXDUjs4iaUNYEEoPxcm9UdHw1eHWp79ficX0PTBiaUD5tjCRHo2QHvrK2tnxeEuAplq2fPqqQlA/0?wx_fmt=gif)

### 文件拆分

为使国际化配置文件更好的维护。支持拆分文件，再通过 `import` 的方式在 `src/locales` 的 `根文件` 通过 `相对路径` 引入。

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-6/1638776592443-image.png)

## 配置项

名字 | 描述 | 默认值
---|---|---
react-intl-umi.configPath | 国际化配置文件的地址 | src/locales
react-intl-umi.suffix | 国际化文件的后缀(排除当前文件夹下面其它类型文件 | .ts
react-intl-umi.regExp | 在代码中的匹配规则（$1为需要匹配的字符串内容） | intl.formatMessage({ id: '$1' })
react-intl-umi.watchMode | 监听国际化文件的变化 | true

## 注意事项

### vscode 版本

最低要求：`v1.62.0`

### 文件引入

1. 根文件下的引入文件需要是相对路径引入
2. 目前只支持在根目前下引入的相对路径的文件解析，如果是在 `src/locales/zh-CN.ts` 中 `import` 的文件中再执行 `import`，这个第二级的 `import` 暂不支持解析。

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-6/1638776911939-image.png)



### 注意匹配模板

默认匹配模板为 `intl.formatMessage({ id: '$1' })`。

这里的 `id: '$1'` 前后都是有空格的，如果在开发中，有一些代码前后的空格，就无法正确匹配。

这个建议结合 `eslint` 的 `block-spacing` 规则一起使用。

### 配置文件内容格式

如果国际化配置文件中的内容有使用模板字符串 ``，并且换行使用的。目前暂不支持。比如：

```
'name.desc': `
1. 很帅气。
2. 其它。
`
```


## 遇见的问题及解决方案

### 如何读取引用文件的内容

通过 `${workspaceFolders[i].uri.fsPath}/${config.configPath}` 获取到当前项目的地址。

对文件下的以 `react-intl-umi.suffix` 后缀结尾的文件类型，读取其中的内容，并判断是否有 `import` 关键字，如果有，将它的子内容也读取出来。

```
for (let i = 0; i<directory.length; i++) {
    try {
      const ele = directory[i][0];
      const elePath = `${localesPath}/${ele}`;
      const content = await fs.readFile(Uri.file(elePath));
      const fileName = ele.split('.')[0];
      const contentStr = content.toString();
      const contentReg = /(['"]?[\w-.]+['"]?:\s?['"].*?['"])/g;
      const valueReg = /^\s{0,}['"](.*?)['"]/;
      // 匹配国际化配置根文件下的配置内容
      const contentArr = contentStr.match(contentReg);
      let obj: IObject = {};
      contentArr?.forEach(item => {
        const itemArr = item.split(':');
        obj[itemArr[0].replace(/['"]/g, '')] = {
          value: itemArr[1].replace(valueReg, '$1'),
          path: elePath,    // 记录当前 key 所在的文件位置
        };
      });
      // 匹配项目中的相对路径
      const importUrls = contentStr.match(/(?<=import.*?['"]\.).*(?=['"])/g);
      if (!importUrls?.length) {
        result[fileName] = obj;
        continue;
      }
      // 循环读取引入文件中的内容
      for (let j = 0; j<importUrls.length; j++) {
        const childPath = `${localesPath}${importUrls[j]}${config.suffix}`;
        const childContent = await fs.readFile(Uri.file(childPath));
        const childContentObj = formatChildDetail(childContent.toString(), childPath);
        obj = {
          ...obj,
          ...childContentObj
        };
      }
      result[fileName] = obj;
  
    } catch (error) {
      console.log('log:error-------------: ', error);
    }
  }
```

### 如何解析配置文件中的内容

用正则对子内容进行格式化，将单引号、双引号格式化成我们需要的值，并返回一个对象。

```
/**
 * 格式化子内容为对象
 * @param str
 * @returns
 */
function formatChildDetail(str: string, childPath: string) {
  const contentReg = /(['"`]?[\w-.]+['"`]?:\s?['"`].*?['"`])/g;
  const valueReg = /^\s{0,}['"`](.*?)['"`]/;

  const newStr = str.replace(/(:\s{0,})[\n\r]\s{0,}(['"`])/g, '$1$2');
  const resultObj: IObject = {};
  const childContentArr = newStr.match(contentReg);
  childContentArr?.forEach(item => {
    const itemArr = item.split(':');
    resultObj[itemArr[0].replace(/['"]/g, '')] = {
      value: itemArr[1].replace(valueReg, '$1'),
      path: childPath,
    };
  });
  return resultObj;
}
```

### 如何实现跳转到对应位置

每个 `key` 值在初始读取时，都有记录当前 `key` 所在的文件位置。

```
contentArr?.forEach(item => {
    const itemArr = item.split(':');
    obj[itemArr[0].replace(/['"]/g, '')] = {
      value: itemArr[1].replace(valueReg, '$1'),
      path: elePath,  // 记录当前 key 所在的文件位置
    };
});
```

按住 `ctrl/Command + 文本内容时`，读取当前文本内容，匹配满足的文件，循环遍历文本在文件中的位置。

```
export async function getWordLocation(value: string) {
  const { workspaceFolders } = workspace;
  let re=[];
  if (!localsData || !workspaceFolders?.length || !value) {return;}
  // 只要有文件包含，就可以跳转
  const checkHasLocales = Object.keys(localsData).some(key => localsData?.[key]?.[value]);
  if (!checkHasLocales) {return;};

  try {
    const filePathArr = Object.keys(localsData).map(key => localsData?.[key]?.[value]?.path);
    for (let i = 0; i < filePathArr.length; i++) {
      const word = await wordLocation(value, Uri.file(filePathArr[i] as string));
      if(word){
        re.push(
          new Location(Uri.file(word.filePath), new Position(word.lineIndex, word.wordIndex))
        );
      }
    }
  } catch (error) {
    console.log('log:error-------------: ', error);
  }

  return re;
}
```

## 开发时的建议

使用 `intl.formatMessage({ id: '**' })` 时，加上对应的 `defaultMessage`。如下：

`intl.formatMessage({ id: '**', defaultMessage: '中文内容' })`

好处：

- 方便阅读
- 少配置内容后，也不会直接空白（当然这种在线上应该是不允许的）

## QA

**我加了 `eslint` 限制一行只能显示 `120` 个字符。这个格式化的内容需要换行该怎么办？**

修改 `react-intl-umi.regExp` 为 `id: '$1'`，放宽对匹配的限制。

**我没有使用 TypeScript，国际化配置是 .js 文件怎么办？**

修改 `react-intl-umi.suffix` 为 `.js`

**我怎样可以修改上面的配置？**

搜索 `vscode` 插件，点击插件的设置。

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-6/1638779580983-image.png)

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-6/1638779629526-image.png)

注意修改配置后，最好是重启一下 `vscode`，以使修改的配置可以生效。

## 特别感谢

- [react-intl-universal-i18n](https://github.com/Java-http/react-intl-universal-i18n)

## 原文链接

[https://mp.weixin.qq.com/s/_OXb9pMU0ZPkjSItPt6SNw](https://mp.weixin.qq.com/s/_OXb9pMU0ZPkjSItPt6SNw)