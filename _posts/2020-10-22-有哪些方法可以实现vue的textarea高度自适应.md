---
layout: post
title: 有哪些方法可以实现vue的textarea高度自适应
categories: vue
description: vue 实现输入框组件高度自适应的方法
keywords: vue高度自适应, textarea高度自适应, input高度自适应
---

使用 Vue 实现一个输入框，输入框有一个默认高度和一个最大高度，当超过默认高度但未及最大高度时，想让输入框自动增高。这该如何实现？

经过思考以及查阅资料，它的实现思路就是在输入内容时，检测输入框的 `scrollHeight` 值，然后再动态地设置为 `height`。实现的方法分为以下两种：

## 方法一 封装成组件

单独写一个 `AutoHeightText.vue` 文件。然后在里面实现对 `textarea` 的监听。代码如下：

```vue
<template>
  <textarea v-model="text" ref="textarea" :style="{height: textareaHeight}" :placeholder="placeholder" @focus="resize"></textarea>
</template>

<script>
export default {
  props: {
    defaultHeight: {
      type: String,
      default: 'auto',
    },
    placeholder: {
      type: String,
      default: '请输入...',
    },
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      text: this.value,
      textareaHeight: this.defaultHeight,
    }
  },

  watch: {
    text(newValue) {
      this.$emit('input', newValue)
      this.$nextTick(this.resize)
    },
  },

  methods: {
    resize() {
      this.textareaHeight = this.defaultHeight
      this.$nextTick(() => {
        this.textareaHeight = `${this.$refs.textarea.scrollHeight}px`
      })
    },
  },
}
</script>
```

使用示例如下：

```vue
<auto-height-text :class="$style.textarea" defaultHeight="40px" placeholder="添加评论..." v-model="item.newComment" />

<style lang="scss" scoped>
.textarea {
  width: 100%;
  height: 40px;
  max-height: 100px;
  border: 0.5px solid #666666;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  outline: none;
  resize: none;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
```

有同学可能会想，为什么要在 `focus` 事件中来执行 `resize`，然后又在 `watch` 中监听，发生改变再执行 `resize`。直接使用 `@input` 或 `@change` 监听，这样难道不是更方便吗？这里我们需要注意 `$emit` 的时机以及不同的事件触发 `resize` 的时机，有兴趣的同学可以自己试试。

## 方法二 封装成一个指令

这里只简单介绍注册局部指令，当然如果使用的多，也可以注册一个全局指令。

```vue
<script>
directives: {
  autoHeight: {
    update(el, binding) {
      const { value } = binding
      if (value && typeof value === 'number') {
        el.style.height = `${value}px`
      } else {
        el.style.height = 'auto'
      }
    },
    componentUpdated(el) {
      el.style.height = `${el.scrollHeight}px`
    },
  },
},
</script>
```

使用示例如下：

```vue
<textarea :class="$style.textarea" v-autoHeight="40" v-model="testContent" placeholder="请输入测试的内容"></textarea>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  max-height: 100px;
  border: 0.5px solid #666666;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  outline: none;
  resize: none;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
```

不足之处，请大家留言补充~~~

## 参考链接

- https://github.com/devstark-com/vue-textarea-autosize
- https://cn.vuejs.org/v2/guide/custom-directive.html