---
layout: post
title: typescript如何设置二次封装的antd table的props类型
categories: [TypeScript]
description: typescript如何设置二次封装的antd table的props类型
keywords: typescript set antd table props, 如何设置二次封装antd table的props, 设置antd table的props类型
---

后台管理系统中，每个模块的列表页，功能模块划分得都比较统一。头部是许多的查询输入框，下面是根据搜索值，展示的 `Table` 表格。

示例图如下所示：

![pagedemo](https://gitee.com/xiangming25/picture/raw/master/2021-6-17/1623911551191-pagedemo.png)

为减少重复代码的开发，决定将整个页面的功能重新基于 `antd` 进行一次封装。输入框，查询按钮，表格都通过 `props` 传入。

使用示例如下：

```tsx

const tableProps = {
  columns,
  dataSource,
  pagination: {
    total,
  },
  rowKey: 'id'
}

<PageList
    searchProps={searchProps}
    search={search}
    tableProps={tableProps}
/>
```

基础组件 `PageList` 代码 `demo` 如下：

```tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { ISearchbarProps } from './index.d';
***

interface IPorps {
  searchProps?: SearchbarProps;
  tableProps: TableProps<Record<string, any>>;
  search: (params: any) => void;
}

export default (props: IProps) {
    const { tableProps } = props;
    // do something
    
    return (
        <main>
            <SearchGroup />
            <SearchBtns />
            <Table { ...tableProps } />
        </main>
    )
}
```

## 问题

其中，`searchProps` 和 `search` 都比较简单，直接完整地定义它的类型就行。但 `tableProps` 是直接使用 `...tableProps` 解构给 `antd` 的 `Table` 使用，并且当中的数据结构存在着层级嵌套的关系。由于不能确定类型，所以初始时，`tableProps` 的值类型设置为 `tableProps: TableProps<Record<string, any>>`，`Record<string, any>` 感觉是万能的，什么类型都能兼容。

然后~~~

`Table` 的 `columns` 配置里面，如果渲染的值无法直接满足我们的业务需要，需要使用 `render: (value: IValueType, record: IRecordType): ReactNode => {<>**</>}` 进行渲染。其中，`value` 的值很容易知道类型。根据 `dataIndex` 就可以。`record` 也就是一整行的值。也能知道它的每一项的类型。问题来了，在 `render` 的 `record` 处定义了详细的 `IRecordType`，而 `tableProps` 使用的是 `Record<string, any>`。

![错误的类型提示](https://gitee.com/xiangming25/picture/raw/master/2021-6-17/1623938216782-columns-error.png)

再去查看一个直接使用 `antd` 的 `Table` 组件，设置 `columns` 后，鼠标移动上去时的提示

![antd table columns](https://gitee.com/xiangming25/picture/raw/master/2021-6-17/1623938389690-antd-table-columns.png)

两边的提示不一样，我们自己封装的会报错。那我们应该怎样写 `tableProps` 的类型呢？

## 解决方案

这里就不绕圈子了，主要方法就是，使用 `TypeScript` 泛型，再结合着类型推论，动态设置 `tableProps` 类型。

`PageList` 组件代码 `demo` 如下：

```tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { ISearchbarProps } from './index.d';
***

interface IPorps<T> {
  searchProps?: SearchbarProps;
  tableProps: Pick<TableProps<T>, keyof TableProps<T>>;
  search: (params: any) => void;
}

export default function PageList<T extends object = any>(props: IProps<T>) {
    const { tableProps } = props;
    // do something
    
    return (
        <main>
            <SearchGroup />
            <SearchBtns />
            <Table { ...tableProps } />
        </main>
    )
}
```

这里有四个比较基础同时又比较关键的点：

1. `PageList` 需要传入泛型值 `T`
2. 泛型值是提供给 `TableProps` 使用的。这个在 `node_modules/antd/es/table/table.d.ts` 中可以查找到
3. 需要使用 `Pick` 对 `TableProps<T>` 中的类型值进行一次筛选，结合着 `keyof TableProps<T>` 使用。效果类似于 `ES6` 的解构赋值（个人理解）。
4. `TypeScript` 类型推论

第一步和第二步都很好理解，为什么要有第三步呢？直接使用 `tableProps: TableProps<T>;` 不行吗？

以下是我自己用两种不同的 `tableProps` 类型定义方式在鼠标移动上去后的提示状态对比。

![](https://gitee.com/xiangming25/picture/raw/master/2021-6-17/1623938924291-page-list-table-column0.png)

![](https://gitee.com/xiangming25/picture/raw/master/2021-6-17/1623938924287-page-list-table-column.png)

很明显，使用第二种方式和 `antd` 自带的 `Table` `columns` 类型验证更加相似。所以，这里推荐使用第二种方式。

## 总结

- 写符合 `TypeScript` 规范的代码
- 尽量少用 `any`。不懂的地方，多查一下资料，代码的质量提升了，自己的能力也提高了

当我们感觉困难，有问题时，才正是我们在向上提升的时候。别害怕困难。遇见问题，解决问题。深夜鸡汤走一波，别打我，哈哈哈哈。

另外，自己在使用 `TS` 的道路上也是正在摸索前进中。文章内容里，难免有不当之处，还望大家批评指正！！！