---
layout: post
title: react-redux 源码解析
categories: react-native
description: react-redux 源码解析
keywords: javascript, react-redux, redux 
---

深入理解react-redux工作原理

## 前提

了解 redux，查看 [Redux 分析](https://note.youdao.com/ynoteshare1/index.html?id=0d671c7faf7e60bb144ced37b63ddcc3&type=note)

## react-redux 解决的问题

- 负责应用的状态管理，保证单向数据流
- 监听状态，在数据发生改变时，执行预期的操作
 
## 实现原理分析

- react-redux 的使用分为两步，第一步是使用 Provider 在顶层创建一个 Root 节点，将创建的 store 作为 Provider 的 props 传入
- 在需要使用 store 的页面，使用 connect 将组件与 store 建立连接关系，需要用到的值通过 mapStateToProps 传入对应的组件中
 

### Provider

Provider 是一个组件，当中创建了一个 Context，将使用 createStore 创建的 store 当作 Context 的返回值，为了拿每一个子组件都能访问到 store 中的值，介于 Context 的实现机制，使用 Provider 渲染的节点只能是唯一的。关键代码如下：

```
export default class Provider extends Component {
  getChildContext() {
    // 将绑定在this下面的store，以对象的方式传递给子组件
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    // 将从 props 中拿到的数据放于 this 中
    this.store = props.store
  }

  render() {
    // 指定只渲染一个子节点
    return Children.only(this.props.children)
  }
}
```

### connect

connect 是一个高级组件，它接收从 Provider 中的 Context 传入的值，将其经过 mapStateToProps、mapDispatchToProps、mergeProps、options 等方法后，得到一个新值，再将其以 props 的方式传递给与它关联的组件。关键代码如下：

```
// 默认需要合并到props上的值
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
    const mapState = mapStateToProps || defaultMapStateToProps
    
    const finalMergeProps = mergeProps || defaultMergeProps

    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
          // 判断是否需要重新渲染页面
          shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
          }
    
          constructor(props, context) {
            super(props, context)
            // 将从props 以及 context 中拿到的 store，绑定于 this.store 下
            this.store = props.store || context.store
            
            通过调用 store 的 getState 方法拿到对应的值，将其存放于 this.state下面
            const storeState = this.store.getState()
            this.state = { storeState }
          }
          
          componentDidMount() {
            this.trySubscribe()
          }
          
          trySubscribe() {
            if (shouldSubscribe && !this.unsubscribe) {
              // 对 store 中的数据进行监听，如果有改变，就执行 handleChange 方法
              this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
              this.handleChange()
            }
          }
          
          handleChange() {
            const storeState = this.store.getState()
            const prevStoreState = this.state.storeState
            if (pure && prevStoreState === storeState) {
              return
            }
    
            if (pure && !this.doStatePropsDependOnOwnProps) {
              const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
              if (!haveStatePropsChanged) {
                return
              }
              this.haveStatePropsBeenPrecalculated = true
            }
    
            // 如果 store 中的值有变化 ，就使用 state 的方式更新storeState
            this.hasStoreStateChanged = true
            this.setState({ storeState })
          }
          
          updateMergedPropsIfNeeded() {
            const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
            // 对比较的值进行浅比较
            if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
              return false
            }
    
            this.mergedProps = nextMergedProps
            return true
          }
          
          // 计算合并后的props
          function computeMergedProps(stateProps, dispatchProps, parentProps) {
              const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
              return mergedProps
            }
          
          render() {
            const {
              haveOwnPropsChanged,
              hasStoreStateChanged,
              haveStatePropsBeenPrecalculated,
              renderedElement
            } = this
            
            let haveMergedPropsChanged = true
            if (
              haveStatePropsChanged ||
              haveDispatchPropsChanged ||
              haveOwnPropsChanged
            ) {
              // 根据 state、dispatch、ownProps是否改变来判断是否需要重绘页面
              haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
            } else {
              haveMergedPropsChanged = false
            }
    
            if (!haveMergedPropsChanged && renderedElement) {
              return renderedElement
            }
    
            if (withRef) {
              this.renderedElement = createElement(WrappedComponent, {
                ...this.mergedProps,
                ref: 'wrappedInstance'
              })
            } else {
              this.renderedElement = createElement(WrappedComponent,
                this.mergedProps
              )
            }
    
            return this.renderedElement
          }
        }
    }
}
```

在 store 发生改变时，调用`updateMergedPropsIfNeeded`方法更改需要传递给子组件的props值，因为在页面的`componentDidmount`中有注册监听store发生变化的函数，在 store 发生改变的时候，就会重新计算，高级组件还使用了`shouldComponentUpdate`钩子函数来监听 props 的改变，判断是否需要重新刷新，以达到渲染性能优化的效果。






