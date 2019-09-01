---
layout: post
title: react-native渲染优化点
categories: react-native
description: react-native渲染优化点
keywords: react-native, optimization
---

使用react-native一段时间了，从它的启动逻辑，以及页面的加载、渲染、滚动、跳转等都用得得心应手了。但是在用户反馈中，经常有用户会反馈，使用我们APP一段时间后，感觉电量消耗得特别的快，用久了后，APP还会崩溃，这引起了大家的注意，于是决定深入调查并解决一下这个问题。

请教了一下公司的原生工程师，衡量一个APP性能优劣的点有哪些，总结如下：
1. 内存优化
  - 内存回收（进入一个页面，然后退出这个页面，此页面加载过的资源由于不需要了，应该被内存自动回收）
  - 内存泄露
2. GPU消耗（view在进行渲染时，需要占用系统的GPU资源）
  - 重复渲染
  - 嵌套的层级，层级越深，解析时所占用的资源相对会更多
3. 电量的消耗（这个的消耗取决于CPU以及GPU的消耗，CPU和GPU使用越多，电量消耗越大）

对于以上页面的问题，咱们分解决地解决了它，第一步是解决内存优化，在些先不做过多讲解，先主要讲渲染方面的优化。

## 前提（掌握基础知识，明确优化目标）
#### 1. PureComponent、Component + shouldComponentUpdate、stateless的使用场景？
![几种不同的组件的使用场景](/assets/images/2019/05/9418595-c971d6fb98176525.jpg)

#### 2. 数据的存储位置有哪些，哪些什么引起页面重新渲染？
![数据的存储位置](/assets/images/2019/05/9418595-b1a3d03a36d99137.jpg)

#### 3. 如何看优化后性能带来多在的提高？
- CPU的消耗
- memory的占用
- energy 的消耗

具体查看方法参考 [RN如何分别测试app在android和iOS上的渲染性能？](https://www.jianshu.com/p/f9e19f15598b)

## 优化点
#### 1. 滚动时的重复渲染
首先，使用`FlatList`和`SectionList`代替`ListView`。
有时会对滚动进行一个监听，当页面滚动到一定的位置时，页面的头部需要更改一个样式。未优化之前的代码如下：
![页面滚动时，更新是否显示毛玻璃头部样式](/assets/images/2019/05/9418595-04649c817a3a8bdf.jpg)
这样存在一个很大的性能消耗，`contentOffsetY <= 1`时就使用`setState`方法让`blurHeaderTransparent`改成true, 此时如果`blurHeaderTransparent`已经是`true`了，完全没有必要重重新更新它为`true`, 同样，在`else`里面, 不管`blurHeaderTransparent`是否是`false`, 均重新更新它为`false`。
解决方法如下：
![image.png](/assets/images/2019/05/9418595-709fb7d24e4a70b3.jpg)
多加了两个判断，在页面滚动时，会少许多的重复渲染。

#### 2. 善用Component + shouldComponentUpdate
紧接着上面的问题，一个滚动列表`FlatList`有很多的row需要渲染，由于业务需求，row里面的显示会根据传入的type的不同，显示不同的样式，咱们在做的时候，想把这个判断封装在row里面，`type === a` 显示 `style1`， `type === b` 显示`style2`，根据约定的前提，这种情况这个组件就只能使用`PureComponent`或者`Compnent + shouldComponentUpdate`，看了一下传入的props，发现传入的数据较多，内容层级较深，有一个使用的地方是这样的`const readDate = this.props.rowData.item.readDate`，如果此时使用`PureComponent`，很可能会出现因为数据改变了，但是页面不刷新的问题，所以这种情况使用`Component + shouldComponentUpdate`是更好的方式，观察这个组件中有什么是需要重新渲染的， 发现只有小红点在点击后需要重新渲染，所以优化的代码如下所示：
![image.png](/assets/images/2019/05/9418595-834f74ca23ee8498.jpg)

#### 3. 不用重新渲染的数据放在了state下面
页面在上拉加载更多时，有分页请求数据，每次请求的数据`page`参数都需要`+1`, 这一类的数据不会在页面中渲染的，所以它也就不用放在state下面，如果在在这个页面或者这个组件中的多处会共用这个数据，可以将它直接挂载到该组件的`this`下面。

#### 4. 调用组件时，传入的回调函数直接使用箭头函数
```
<ChildComponent
          image={imgUrl}
          title={title}
          titleFontColor={fontColor}
          iconColor={iconColor}
          handlePress={() => this.handlePress(module, id, listId)}
        />
```
在React的`事件处理`里面有说，`但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染`，原因是父组件在rerender时，直接使用箭头函数就会创建一个全新的函数传入子组件中，这样在子组件中的diff算法计算时，就默认是有更新，导致一次多余的rerender。
解决办法：
1). 父组件中的方法使用react推荐的，在constructor中使用.bind的方式，如：
```
this.handlePress = this.handlePress.bind(this);
```
2). 在父组件中定义方法是 使用 `=>`的方式，如：
 ```
handlePress = (params) => {
// do something
}
```

#### 5. 在调用子组件时，直接给子组件再传入一个组件
```
render() {
    const rightComponent = (
      <Btn
        size={'xs'}
        type={'Home'}
      />
    );
    return (
      <ListHeader
        title={'标题'}
        rightComponent={rightComponent}
      />
    );
  }
```
这样每次在render的时候， `rightComponent`都会生成一个全新的，导致子组件`ListHeader`在执行diff算法时，当成了`props`是有改变的，导致一次多余的重复渲染。修改方式如下：
```
render() {
    return (
      <ListHeader
        title={'标题'}
        rightComponent={this.rightComponent}
      />
    );
  }

  rightComponent = (
    <Btn
      size={'xs'}
      type={'Home'}
    />
  )
```

经过测试，优化后的页面，进入页面，它与未优化的变化不是很明显，但是在页面滚动以及上拉加载更多后，与未优化过的页面对比，CPU降低40%，内存的增长在合理范围内，电量的消耗明显降低。

这是目前总结的，还有没有总结到的地方，欢迎大家评论，一起将RN的渲染优化做得更好~~~

## 总结
话不多说，导图参上

![渲染优化点2.jpg](/assets/images/2019/05/9418595-8533b85578ca52ff.jpg)

## 参考资料
1. [React Native 性能优化总结](https://github.com/amandakelake/blog/issues/49)
2. [react/react-native性能优化](https://juejin.im/post/5c12040de51d4556400a9cce)
3. [https://facebook.github.io/react-native/docs/performance](https://facebook.github.io/react-native/docs/performance)
4. [https://react.docschina.org/docs/optimizing-performance.html?no-cache=1](https://react.docschina.org/docs/optimizing-performance.html?no-cache=1)


