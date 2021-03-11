---
layout: post
title: 细品vue中需要注意的基础点
categories: vue
description: 整理vue中有默认规定，但是不常注意的知识点
keywords: vue知识点, vue, Vue, Vue常见的知识点
---

Vue 上手很快，半天内快速学习一下它的基础知识。如：数据绑定、模板语法、计算属性、侦听器、样式书写、条件渲染、列表渲染、事件处理、表单绑定、组件基础等。差不多就可以上手开发了，但是 Vue 在设计的时候，有许多出于性能、技术限制、以及一些规范的原因，在某些使用方面，有一些特别需要注意的，忽略这一些点，很容易在开发过程中造成许多的困惑。

以下是再次学习 Vue 文档，整理出我们在使用的过程中需要注意的点。

#### 1. transtion如果下面有两个及以上的节点，需要给每个节点都设置一个key

> 当有相同标签名的元素切换时，需要通过 key attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容，即使在技术上没有必要，给 `<transition>` 组件中的多个元素设置 key 是一个更好的实践

#### 2. vue 的 data 属性中，只有初始化实例时，data中就有的值，才是响应式的，后面才加上的不会响应

#### 3. [生命周期图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

#### 4. 在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写
```
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```
#### 5. 计算属性和方法的主要区别是计算属性是基于它们的响应式依赖进行缓存的

#### 6. 在一个自定义组件上使用 class property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些 class

```
<my-component class="baz boo"></my-component>
```

HTML 将被渲染为：

```
<p class="foo bar baz boo">Hi</p>
```
#### 7. Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 placeholder。

> 如果需要input中的值在切换后不一样，给两个 input 设置一个不同的 key 就可以了

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

#### 8. 避免 v-for 和 v-if 同时使用

```
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

上面实例代码中，我们只想展示user.isActive 为 true 的用户数据，但是由于 v-for 的优先级高于 v-if 优先级，所以在渲染时，不管是users下面的单个 user 的 isActive 状态是否为 true, 都会先进行一次循环遍历，然后再根据 v-if 的条件是否要渲染在页面中。

更好的方式是：

使用计算属性 computed 先对 users 下面为 isActive 为 true 的进行过滤，然后再对过滤后的 users 进行 v-for 循环

```
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

#### 9. v-for 循环中，如果遍历的是 Array, 第一个参数是 item，第二个参数是 index, 如果遍历的是对象，第一个参数是 value, 第二个参数是 name，第三个参数才是 index

#### 10. v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件

> 1. text 和 textarea 元素使用 value property 和 input 事件；
> 2. checkbox 和 radio 使用 checked property 和 change 事件；
> 3. select 字段将 value 作为 prop 并将 change 作为事件。

==在这里可以指定 model props，以避免不同的组件触发的事件不同==

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

#### 11. 选项框 select 需要注意的点

> 如果 v-model 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

#### 12. data 必须是一个函数

> 因此每个实例可以维护一份被返回对象的独立的拷贝

#### 13. props 会在一个组件实例创建之前进行验证，所以实例的 property 如 data computed，在default 和 validator 中是无法访问的

#### 14. 如果不希望组件的根元素继承 attribute， 可以使用 inheritAttrs: false， 然后可以使用 $attrs 手动决定 attribute 被赋予给哪个元素

```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

> inheritAttrs: false 不会影响 style 和 class 的绑定

#### 15. 事件名推荐使用 kebab-case ，这个对写了许多 react 项目的同学，需要特别注意一下

#### 16. 如果在子组件中，只是想更新 props 当中的一个值，可以在 props 的属性上添加一个 .sync 属性，然后在了组件中使用 update:propName的yyaa

```
父组件中

<text-document v-bind:title.sync="doc.title"></text-document>

或

<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

子组件中

this.$emit('update:title', newTitle)
```

#### 17. 使用插槽需要注意的点是

> 插槽中的值无法直接访问子组件中的值，父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的

#### 18. v-slot 只能用于 `<template>`上，只有当使用`<slot>`的地方只有 default 插槽时，可以将 v-slot 用于组件上

#### 19. 通过 this.$parent 可以访问到组件的直接上级，如果组件嵌套得比较得多，粗暴的方式可以使用 this.$parent.$parent 来访问到。

#### 20. 如果嵌套的层级较深，也可以使用[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)的方式（provide, inject）,inject 中只能拿到父级初始化中的数据，父级中的数据变化后，inject 中的数据不会变化

#### 21. 如果是在一个模块系统循环依赖 / 导入组件可能会出现

```
Failed to mount component: template or render function not defined.
```

#### 22. 使用 mixins 时，同名钩子函数将合并成为一个数组，因些都将被调用。另外，`混入对象的钩子将在组件自身钩子之前调用`，值为对象的选项，例如 methods 将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

#### 23. 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成

#### 24. 使用过滤器时，当前的值永远是过滤器的第一个参数。过滤器也可以接收额外的参数，分别作为第二个参数和第三个参数

```
\{\{ message | filterA('arg1', arg2) \}\}
```

其中 message 是 filterA 的第一个参数，arg1, 和 arg2 分别是第二个参数和第三个参数

#### 25. 部署时需要指定 production 环境，以减少不必要的错误提示以及包体积的大小

#### 26. 如果在组件渲染时出现运行错误，错误将会被传递至全局 Vue.config.errorHandler函数中，利用这个钩子函数再配合错误跟踪日志可以更好地收集运行时的错误。

#### 27. Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不心要的计算各 DOM 操作是非常重要的。在下一次的事件循环 tick 中， Vue 刷新队列并执行实际工作。

> 如果想在数据变化后等待 Vue 完成更新 DOM， 可以在数据变化 后立即使用 Vue.nextTick(callback)，这样回调函数将在 DOM 更新完成后被调用。

```
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
```

这里注意 $nextTick() 会返回一个 Promise对象。所以可以使用 ES2017 async / await语法完成相同的事

```
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

#### 28. 允许一个自定义组件在使用 v-model 时定制 props 和 event。默认情况下，一些组件上的 v-model 会把 value 用作 props 且把 input 用作 event，但是一些输入类型组件比如 单选框和复选框按钮可能想用 value 当成 props 以达到不同的目的。使用 model 可以回避这些情况产生的冲突。

```
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})

// 使用方式
<my-checkbox v-model="foo" value="some value"></my-checkbox>

// 相当于
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
```