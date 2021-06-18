---
layout: post
title: 使用antd时遇见的问题及解决方案
categories: [antd]
description: 使用antd时遇见的问题及解决方案
keywords: 使用antd时遇见的问题及解决方案, 使用antd时遇见的坑,antd爬坑记, 滚动失效及横向无法铺满,antd columns类型错误, antd table有的列看不见
---

整理目前使用 `antd` 时遇见的一些问题及解决方案。

## Form

### 表单嵌套会报错表单嵌套会报错

> devScripts.js:6523 Warning: validateDOMNesting(...): `<form>` cannot appear as a descendant of `<form>`.

解决方案：

- 避免表单的嵌套
- 如果确实需要多个表单才能完成功能，可以写多个不同的表单，通过 `formInstance.getFieldsValue()` 方法来获取表单的值


## Table

### 1. 滚动失效及横向无法铺满

在 `Space`下使用 `Table` 会导致横向滚动失败问题，并且会导致 `Table` 横向无法铺满的问题

这种情况本不应该出现，出现的问题个人觉得是滥用 `Space` 组件

### 2. `column` 类型错误

只在部分 `column` 上设置 `fixed: right` 或者 `align: center` 这些会导致类型验证错误

```
Type '({ title: string; dataIndex: string; fixed: string; render?: undefined; } | { title: string; dataIndex: string; fixed?: undefined; render?: undefined; } | { title: string; render: (text: string, record: IScoreRulesItem) => Element; dataIndex?: undefined; fixed?: undefined; })[]' is not assignable to type '(ColumnGroupType<IScoreRulesItem> | ColumnType<IScoreRulesItem>)[]'
```

提示了很长一段一段的错误，大致的原因是：设置了 `fixed: 'right'`。`TS` 类型推论把 `fixed` 的类型理解为 `string`。而在 `antd` 源码中，通过一步一步向上找，最后在 `node_modules/rc-table/lib/interface.d.ts` 找到 `fixed` 定义的类型是 `export declare type FixedType = 'left' | 'right' | boolean;`。它表明，`fixed` 的类型只能是 `left`、`right`、`boolean` 三类中的一种。

解决办法：

```
columns: [
    {
        title: 'xxx',
        dataIndex: 'xxx',
        fixed: 'left' as 'left', // cast fixed
    },
]
```

将值为 `left` 断言为 `left` 类型即可。

[参考链接：https://github.com/ant-design/ant-design/issues/7965](https://github.com/ant-design/ant-design/issues/7965)


### 3. 当缩小屏幕时，有一列会看不到

为了让页面在不同屏幕大小看到的页面展示效果尽可能的一致，不会因为屏幕宽度的不同，导致 `table` 中不必要的换行。会给一些 `column` 设置固定的宽度。如果每一个 `column` 都设置了固定的宽度，屏幕宽度又是不固定的，所以一般会有一个或者多个 `column` 不设置宽度，让没有设置宽度的 `column` 自适应剩下的宽度。

此时，如果缩小屏幕，屏幕的宽度比设置了宽度的几列的宽度加起来的总和还小。那没有设置宽度的列就会出现看不见的情况。

解决办法：

屏幕设置最小宽度 `1000px`。其它的 `column` 设置的宽度总和不要超过`1000px`，这样在缩放屏幕宽度时，就不会出现上面的问题了。

### 4. 默认勾选问题

先查询，勾选复选框，再重置。再查询相同的查询条件，再次查询出来的，默认是前面勾选的，但是点击提交时，并没有把勾选的值带上

问题出现的原因：需要手动控制 `selectedRowKeys` 选中值。

解决方法：[https://zhuanlan.zhihu.com/p/54500724](https://zhuanlan.zhihu.com/p/54500724)


### 5. 优雅使用 `ellipsis`

Table 上使用 ellipsis, Tooltip，如果文本内容不长，导致 Tips 的箭头未居中

直接使用 `ellipsis`，超出部分是会省略，并且鼠标移动上去后也会显示全所有的内容（`title` 方式）。但它有一个不好的体验。显示的全部内容无法选中并复制。所以需要使用 `Tooltip` 组件再进行一次包裹。用法如下：

```
{
    dataIndex: 'name',
    render: (name: string) => (
        <Tooltip placement="top" title={name}>
            <div className="ellipsis">{name}</div>
        </Tooltip>
    )
}
```

```
.ellipsis {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
```

注意这里需要设置 `css` 的 `display` 为 `inline-block`。否则就会出现由于内容长度不一致，较长的内容会联动的让较短的内容的 `tips` 位置向右偏移，不在本来内容的最中间问题。


未完待续~~~
