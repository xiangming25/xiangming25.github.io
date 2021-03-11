---
layout: post
title: react-native最佳实践
categories: react-native
description: react-native最佳实践
keywords: react-native, best practise, react-native 最佳实践
---

## 简化文件引用路径

根据不同场景的需要，我们会将文件拆分为一个又一个的文件，在文件嵌套较深时，经常出现类似 `../../../Components/Product` 这样的代码。多写一层或少写一层都会导致代码异常

### 方法一
使用 [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) 插件，给文件夹取一个别名

使用方式：

在`.babelrc` 文件中加入如下代码

```
{
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        actions: './app/actions',
        api: './app/api',
        assets: './app/assets',
        components: './app/components',
        containers: './app/containers',
        constants: './app/constants',
        selectors: './app/selectors',
      }
    }]
  ]
}
```

然后我们就可以使用 `import Product from 'components/Product'` 这样的方式去引用我们需要的组件

### 方法二

package.json

使用方式：

给每个大模块文件夹下面创建一个 `package.json` 文件，key 为 `name`, 对应的值就是我们给这个文件取的别名

![package.json](https://upload-images.jianshu.io/upload_images/9418595-33e8a7b27e1b0214.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后，就可以使用别名的方式去引用对应文件夹下面的文件

![image.png](https://upload-images.jianshu.io/upload_images/9418595-5c0e1399341d340f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 引入顺序排序

引用顺序没有强制规定要谁先谁后，但是为了方便其他同事 review 我们代码，以及在查找引用时更加快捷，最好是有一个统一的引用方式。

顺序如下：
1. react 组件
2. react-native 组件
3. 引入的第三方组件
4. 项目中使用 aliases 方式引用的绝对路径 
5. 相对路径

```
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import Card from './Card'
import TabItem from './TabItem'
```

## 依赖包的版本锁定

react-native 目前还没有一个相对来说特别稳定的版本，仍然处于 `v0.*` 的版本，这导致它的变化会比较大。一些基于旧版本的第三方组件，在RN 升级后，也需要继续修改，导致无法和旧的 RN 版本兼容，如果组件的版本已更新，而使用的 RN 版本还没有更新，就可能会导致异常，而这些异常往往不容易被跟踪，所以将依赖的第三方组件版本锁定非常有必要。

改动的方式很简单，就是将依赖包前面的 `^` 去掉即可

- 改动前

```
"react-native-qrcode": "^0.2.7",
"react-native-qrcode-svg": "^5.1.2",
"react-native-root-siblings": "^3.1.0",
"react-native-scrollable-mixin": "^1.0.1",
```

- 改动后

```
"react-native-qrcode": "0.2.7",
"react-native-qrcode-svg": "5.1.2",
"react-native-root-siblings": "3.1.0",
"react-native-scrollable-mixin": "1.0.1",
```

## 使用纯函数组件或PureComponent

- 纯函数组件少了对状态的管理以及对生命周期的监控，所以性能会更加的快速。

```
const Header = () => (<Text>This is Header</Text>);
```

- PureComponent 使用浅比较的方式极大地减少了重复渲染的出现，性能方面也有一定的提高

```
class Header extends PureComponent {
  ...
}
```

什么时候使用纯函数组件，什么时候使用 PureComponent，请查看[https://www.jianshu.com/p/b683a0c45b74](https://www.jianshu.com/p/b683a0c45b74)


## 图标使用字体图标

APP 中经常会用到大量的图标，使用[字体图标]([https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)
)可以减少包的体积，同时，对不同的分辨率的手机展示上也不会有误差，项目中可以使用 [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 来加载图标

## 图片按需加载或者存放于CDN

图片在加载后，会存放于手机内存中，可以通过需要使用时，再通过 require 的方式加载需要的图片来减少 APP 对手机内存的消耗

```
<Image source={require('@assets/images/icon-arrow.png')} />
```

- 图片可以通过压缩一定比例后上传至 [CDN](https://baike.baidu.com/item/CDN/420951?fr=aladdin)，在需要的时候再去请求对应的图片链接来加载

```
<Image source=\{\{ uri: 'https://cdn.image.jpg' \}\} />
```

## 使用Redux管理状态

当项目越来越大时，许多的数据需要在不同的页面进行交互，比如用户信息，一个地方变化后，所有与之相关的地方都需要变化，这里我们习惯用的 state 就不太方便处理了，基于 context 的 Redux 状态管理工具也就有了存在的必要

Redux 参考文档 [移步这里](https://redux.js.org/introduction/getting-started)

状态管理不只Redux，还有 Mobx 等，它们之前也分别具有各自的优点和缺点，具体使用哪种根据团队的情况来定。个人而言更倾向于 Redux, dispatch 发送一个 action, 经过 reducer 对 store 进行修改，可以很好地预测数据的变化，当项目越来越大时优点尤为明显

[MobX or Redux?](https://juejin.im/post/5d975e88518825323a37755d)

[你需要Mobx还是Redux？](https://juejin.im/post/5a7fd72c5188257a766324ae)


## 参考链接

- https://www.innofied.com/top-10-react-native-best-practices-to-follow/
- https://thoughtbot.com/blog/best-practices-while-developing-a-react-native-app
- https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3
