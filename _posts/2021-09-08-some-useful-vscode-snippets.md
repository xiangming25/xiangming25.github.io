---
layout: post
title: VSCode常见代码片段插件
categories: [VScode]
description: VSCode常见代码片段插件
keywords: js 方法自动补全, vscode 代码片段, consloe.log美化
updateDate: 2021-09-10
---

写了很多重复的代码，一直在思考，能不能`少写一点`、`再少写一点`？我们现在用到的方法、提示信息等，真的没有再简化的空间了吗？

答案是：不是的，真的可以再简化一点！！！

为了让自己“变得更懒”，同时也希望能“帮助其他朋友变得更懒”，在下不才，抽空将一些常见的代码做成了一个 `VSCode` 插件。它的名字叫 `xm-snippets`。（大家懂的，哈哈哈哈~~~）

安装方法是：

![插件安装方式](https://gitee.com/xiangming25/picture/raw/master/2021-9-8/1631109468396-image.png)


想了解如何自定义代码片段的朋友，可以参考 [如何在VScode中自定义代码模板](https://mp.weixin.qq.com/s/LdMW0tR1y_u_-cSgYmxUjg) 这篇文章。

目前刚写了两类的代码片段，一类是 `javascript` 中常见的代码，另外一个是 `react` 函数组件，后面会持续更新~~~。

下面，我来介绍一下这个代码片段插件目前具备的一些功能。

## Javascript

### log

shortcut | description
--- | ---
`log` | `console.log('log:$1-------------: ', $1);`

现在许多人在调试代码时，喜欢使用 `log` 的方式来调试。直接使用 `console.log(value)` 打印的值，有时候在 `浏览器` 的 `控制台` 中就算加上了过滤也不容易查找到。比如：

![](https://gitee.com/xiangming25/picture/raw/master/2021-9-8/1631099166889-image.png)

所以，解决办法来啦！

使用 `xm-snippets` 中的 `log`。

![log信息](https://gitee.com/xiangming25/picture/raw/master/2021-9-8/1631099293731-image.png)

项目中输入 `log` 命令，然后选择带 `xm-log` 的那一行，然后按 `Enter` 键，就可以生成
```
console.log('log:value-------------: ', value);
```

这样的代码，同时，光标会同时出现在 `log:` 和 `', ` 后面。也就是说，我们直接输入，就可以直接修改两个位置的代码。此时，使用 `log` 打印的内容，在控制台中就很容易查找了。

![使用 xm-snippets log](https://gitee.com/xiangming25/picture/raw/master/2021-9-8/1631099550739-image.png)

### Array

shortcut | description
--- | ---
`map` | `array.map((item, index) => {})`
`forEach` | `array.forEach((item, index) => {})`
`filter` | `array.filter((item, index) => {})`
`find` | `array.find((item, index) => {})`
`findIndex` | `array.findIndex((item, index) => {})`
`includes` | `array.includes((item, index) => {})`
`every` | `array.every((item, index) => {})`
`some` | `array.some((item, index) => {})`
`reduce` | `array.reduce((accumulator, currentValue, index) => {}, initialValue)`
`reduceRight` | `array.reduceRight((accumulator, currentValue, index) => {}, initialValue)`

### Object

shortcut | description
--- | ---
`keys` | `Object.keys(obj)`
`values` | `Object.values(obj)`
`assign` | `Object.assign({}, obj)`
`freeze` | `Object.freeze(obj)`

### Promise

shortcut | description
--- | ---
`promise` | `new Promise((resolve, reject) => {})`
`resolve` | `Promise.resolve()`
`reject` | `Promise.reject()`
`race` | `Promise.race()`
`all` | `Promise.all([])`

### JSON

shortcut | description
--- | ---
`stringify` | `JSON.stringify()`
`parse` | `JSON.parse()`

### Others

#### switch

```
switch (key) {
  case value:
    
    break;

  default:
    break;
}
```

#### for

```
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}
```

## React

### func (component for javascript)

```
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    setData('hello');
  }, []);

  return <div>{data}</div>;
};

export default Index;

```

### func (component for typescript)

```
import React, { FC, useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const Index: FC<IProps> = (props) => {
  const { id } = props;
  const [state, setState] = useState<string>();

  useEffect(() => {
    setState('');
  }, []);

  return (
    <div>
      {state}
      <p></p>
    </div>
  );
};

export default Index;

```

### reactComponent (component for class)

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Index extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {

    };
  }
  static getDerivedStateFromProps(props, state) {}

  componentDidMount() {
    // do something
  }

  shouldComponentUpdate(nextProps, nextState) {}

  getSnapshotBeforeUpdate(prevProps, prevState) {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    // do something
  }

  render() {
    return (
      <div>这里是组件</div>
    );
  }
}

```

## 更新日志

- 2021-09-10 添加 object snippets， Promise snippets JSON snippets，修改 array 快捷提示使用方式

持续更新中~~~


