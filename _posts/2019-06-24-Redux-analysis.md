---
layout: post
title: Redux 分析
categories: react-native
description: Redux 分析
keywords: javascript, redux 
---

深入理解 Redux 工作原理

## Redux 是什么

Redux 是 Javascript 状态容器，提供可预测化的状态管理


## Redux的功能及作用

- 将状态统一放在一个 state 中，由 store 来管理这个 state
- store 按照 reducer 的 shape 创建
- store 通过 dispatch 一个 action，再由 reducer 统一更新
- 每次使用dispatch 后，可以通过 subscribe 来监听store的变化
 

## 适用场景

- 多页面需要共享的数据
- 一个地方的数据发生改变，其它地方的数据也要同步改变


## 不适用场景

- 数据只在单组件或者单作用域中使用
- 数据更改后不需要重新渲染出来


## Redux 与全局对象有什么区别

- Redux 中的数据存放在store中，只能通过 dispatch 一个 action 去修改，方便调试，任何改变都会有一次更改记录
- 全局对象的值可以直接修改，修改后无任何记录，调试不方便，使用不规范还容易造成全局变量污染


## 实现原理解析

Redux 的工作流程是：

- 创建 store，即：createStore()
- 将多个 reducer 合并为一个 reducer，即 combindReducers()
- 应用中间件，即 applyMiddleware()

在源码目录中，还包含了 compose, bindActionCreators 两个文件，这两个文件主要是用于提供一些方法的

下面分别对它们的源码进行解析

### createStore

关键代码如下：

```
export default function createStore(reducer, preloadedState, enhancer) {
  if (enhancer 有效) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  // 获取当前 state
  function getState() {
    return currentState
  }

  // 添加一个监听函数，每当 dispatch 被调用的时候都会执行这个监听函数
  function subscribe(listener) {
    let isSubscribed = true

    // 对currentListeners进行一个浅拷贝
    ensureCanMutateNextListeners()
    // 将新的监听对象push到监听数组中
    nextListeners.push(listener)

    return function unsubscribe() {
      isSubscribed = false
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    try {
      isDispatching = true
      // 根据当前的 state, 以及传入的 action，更新当前的 state
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      // 执行每一个的监听方法
      listener()
    }

    return action
  }

  return {
    dispatch,
    subscribe,
    getState,
  }
}

```

从上面可以看出，通过 createStore 方法创建了一个store，创建好后并没有直接将 store 返回，而是返回了几个与操作 store 相关的方法，主要有 getState、subscribe、dispatch

##### getState

```
  function getState() {
    return currentState;
  }
```

由 createStore 创建的 store，要直接访问它里面的数据只能通过 getState 的方式，通过 getState 返回的数据是 currentState 对象的一个引用，可以直接修改它，但是 reudx 建议最好不要这样做。

### compose
compose 的作用是将多个方法进行一个包装

```
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

`compose(funcA, funcB, funcC, funD)`

输出结果为：

`funcA(funcB(func(funcD())))`


### combineReducers

了解 combineReducers 得先了解 reducer 它是什么？它的作用是什么？

reducer 是 redux 通过 dispatch 一个 action 之后，用来更新 store 的一个纯函数方法。   
更新 store 的 reducer 可以只有一个，但是由于业务量可能会很大，功能模块划分很多，如果只使用一个 reducer 来更新数据的话 reducer 会很长，后期遇见 bug 时排查会很困难，所以可以将 reducer 按照 store 创建时的结构拆分成多个 reducer，最后通过 combineReducers 合并成一个 reducer。

```
export default function combineReducers(reducers) {
  // 拿到需要合并的 reducer 的所有的 key
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    // 对 reducer 进入一个验证，筛选出可用的 reducer
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  // 拿到所有可用的 reducer 的 key
  const finalReducerKeys = Object.keys(finalReducers)

  let shapeAssertionError
  try {
    // 对最后的 reducer 进行一个验证，分别使用 reducer 更新一个固定初始值和一个随机值，看它的返回结果是否正确
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 拿到可用的 reducer key
      const key = finalReducerKeys[i]
      // 拿到可用的 reducer
      const reducer = finalReducers[key]
      // 根据 key 拿到之前的 state 值
      const previousStateForKey = state[key]
      // 根据之前的 state 值，结合 action，通过 reducer 方法生成单个新的 state
      const nextStateForKey = reducer(previousStateForKey, action)
      // 将最新的值存放在最新的 state 中
      nextState[key] = nextStateForKey
      // 将新值和旧值进行一个比较，判断是否有发生改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 如果有发生改变，就返回新的 state, 如果没有改变，就返回之前的 state
    return hasChanged ? nextState : state
  }
}
```

### applyMiddleware

什么是中间键？先看看它的核心代码

```
export default function applyMiddleware(...middlewares) {
  // 调用applyMiddleware方法，会返回一个创建 store 的函数
  return createStore => (...args) => {
    const store = createStore(...args)

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 对中间键进行一个循环，给每一个中间键都传入当前的 store 以及 dispatch 方法，然后执行它
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 通过 compose 将多个中间键用柯里化的方式使其调用
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

经过上面步奏，中间键一般会返回一个 action 函数，将它对dispatch进行改写，下次再调用 dispatch，实则是调用改写后的 dispatch，这样也就在dispatch 与 reducer 中间多加了一层可自定义执行的方法，在 dispatch 与 reducer 之间，我们可以执行异步操作，如请求数据，打印日志等功能。等这些功能都执行完成后，再dispatch 一个真正的纯 action, 用于修改 reducer, 这样在不修改原有代码的基础上，达到了中间插入操作的功能。

## 如何与 React 框架结合使用

使用 [react-redux ](https://react-redux.js.org/introduction/quick-start)  插架帮助我们实现

了解具体实现，点击 [react-redux 源码解析](https://www.jianshu.com/p/d57d6aabcfcb)

## Q & A

1. dispatch 是同步的还是异步的？

    dispatch 是同步更新 store的。
    
2. 为什么在使用 react 渲染的时候它是异步的呢？
    
    因为在 redux 结合 react 的使用时，实则是使用 connect 这一个高阶组件来实现数据的更新的，在监听到 store 的数据发生改变后，调用 react 的 setState 方法来重新渲染页面，而 setState 是异步的，所以并不是 dispatch 是异步的，而是 setState 是异步的。
3. redux 的 subscribe 是怎么实现的？



## 参考链接
- [https://www.redux.org.cn/](https://www.redux.org.cn/)
- [https://juejin.im/post/5b9617835188255c781c9e2f](https://juejin.im/post/5b9617835188255c781c9e2f)