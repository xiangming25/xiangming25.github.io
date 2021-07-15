---
layout: post
title: React+TypeScript 实战总结及建议
categories: [TypeScript]
description: typescript 常用类型简介以及React + TypeScript的一些建议
keywords: React+TypeScript实战总结及建议, typescript 常见类型简介, interface与type应该怎么选,如何在react项目中很好地使用typescript
---

## 为什么使用 `typescript`？

为 `javascript` 提供一个可选的类型系统。在开发及编译阶段，及早暴露出因类型不对而出现的问题，避免不必要的错误发生，为代码质量保驾护航。

下面将简单介绍在实战中常用的 `TS` 功能。

## 基础类型

`TypeScript` 的基础类型和 `javascript` 基本一致，包含 `number`、 `string`、 `boolean`、`undefined`、`null`、`symbol`、`object`等。并且还包含 `javascript` 不具备的 `枚举类型`。

> 注意：如果初始时给变量设置了值，`TS` 的类型推论机制可以自动推断出当前变量的类型。

使用方式如下：

```
let a: number = 1;

let b: string = 'hello';

let c: boolean = true;

let c: boolean = true;
```

对象的类型定义一般是使用 `interface` 或者 `type` 来定义。

```
interface obj {
    a: number;
    b: string;
}

type obj1 = {
    a: number;
    b: string;
}
```

枚举类型，默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。

```
enum Color {Red = 1, Green = 2, Blue = 4}

let c: Color = Color.Green;
```

以上代码经过编译后，会有这样的赋值：

```
var Color;
(function (Color) {
  Color[(Color['Red'] = 1)] = 'Red';
  Color[(Color['Green'] = 2)] = 'Green';
  Color[(Color['Blue'] = 4)] = 'Blue';
})(Color || (Color = {}));
```

这样其实相当于进行了一次双向赋值。可以双向地访问 `Color` 对象中的值。

```
Color['Red'] = 1;
Color[1] = 'Red';

Color['Green'] = 2;
Color[2] = 'Green';

Color['Blue'] = 4;
Color[4] = 'Blue';
```

## 类型推论

在有些没有明确指出类型的地方，类型推论会帮助提供类型

> 注意：类型推导是仅仅在初始化的时候进行推导

举例说明：

```
const num = 3;
// 等价于
const num: number = 3;

---

const isBool = true;
// 等价于
const isBool: boolean = true;

---

const arr = ['zhangsan', 'lisi'];
// 等价于
const arr: string[] = ['zhangsan', 'lisi'];

---

const arr = [{ id: 1, name: 'xiangming' }];
// 等价于
const arr: { id: number, name: string }[] = [{ id: 1, name: 'xiangming' }];

---
const arr = [{ id: 1, name: 'xiangming' }];
const newArr = arr.map(item => item.id);
// 等价于
const arr: { id: number, name: string }[] = [{ id: 1, name: 'xiangming' }];
const newArr = arr.map((item: { id: number, name: string }) => item.id);
```

以下，就会因类型推论错误而导致类型校验失败

```
let a = 1;
a = 'str1'; // Type 'string' is not assignable to type 'number'.ts(2322)
```

[参考链接：https://juejin.cn/post/6854573216732545038](https://juejin.cn/post/6854573216732545038)

### 断言

> 注意：断言是对值的类型断言

作用：

- 将联合类型断言为其中一种类型
- 父类断言为更加具体的子类
- any断言为具体的类型

在实际项目中，遇见最多的就是我们组件中设置了具体的联合类型值。而在实际中使用的时候，使用的类型推断和组件的类型定义不匹配，需要手动 `断言` 一下它的格式。比如：

`antd` 的 `table` 组件，`table` 的 `columns` 有一个属性叫做 `align`，它的使用是控制当前列是居左、居中、居右的。

通过查找，在 `node_modules/rc-table/lib/interface.d.ts` 中可以找到。

![table align 类型定义](https://gitee.com/xiangming25/picture/raw/master/2021-7-1/1625106594372-type-align.png)

如果对 `table` 进行二次封装。它的值

```
columns: [{
    ...
    align: 'right'
    ...
}]
```

由于类型推论会将 `align` 推论成 `string`，于是就会报这样的一个 `TS` 错误

![](https://gitee.com/xiangming25/picture/raw/master/2021-7-1/1625106817490-image.png)

解决办法就是，将 `align` 的值，断言为 `AlignType` 定义的值。如下所示：

```
columns: [{
    ...
    align: 'right' as 'right',
    ...
}]
```

## `interface` & `type`

`interface` 和 `type` 在实际使用中，很多功能都非常相似，只是在使用方式上，略有区别。所以把这两个放在一起说。以下是 `interface` 和 `type` 简单的对比以及使用时的建议。

### 相同点

#### 都可以描述对象或者函数

**interface**

```
interface IUser {
    name: string;
    age: number;
}

interface UpdateUser {
    (name: string, age: number): void;
}
```

**type**

```
type IUser = {
    name: string;
    age: number;
}

type UpdateUser = (name: string, age: number): void;
```

#### 都支持扩展

**interface**

```
interface IUser {
    name: string;
    age: number;
}

interface IStudent extends IUser {
    grade: number;
    score: number;
}
```

**type**

```
type IUser = {
    name: string;
    age: number;
}

type IStudent = IUser & {
    grade: number;
    score: number;
}
```

### 不同点

#### `interface` 支持声明合并

```
interface IUser {
    name: string;
}

interface IUser {
    age: number;
}

// 这里的 IUser 同时有 name 和 age 两种
const user: IUser = {
    name: '张三',
    age: '18',
}
```

#### `type` 可以声明基本类型别名、联合类型、元组类型等

```
// 基本类型别名
type Name = string

// 联合类型
type IUser1 = {
    name: string;
    age: number;
}

type IUser2 = {
    name: string;
    score: number;
}

type Person  = IUser1 | IUser2;

// 具体定义数组每个位置的类型
type PersonList = [IUser1, IUser2];
```

```
type size = 'small' | 'middle' | 'large';
```

#### `type` 可以使用 `typeof` 获取实例的类型

```
const defaultProps = {
    name: '张三',
    age: 18,
    score: 722,
}

type IProps = typeof defaultProps & {
    favorite: [string];
}

const UserComponent: React.FC<IProps> = (props) => {
    const { name, age, score, favorite } = props;
    return (
        <>
            <p>{name}</p>
            <p>{age}</p>
            <p>{score}</p>
            <p>{favorite.join('、')}</p>
        </>
    )
}

UserComponent.defaultProps = defaultProps;
```

[参考链接：https://juejin.cn/post/6844903749501059085](https://juejin.cn/post/6844903749501059085)

### 如何选择使用 `interface` 还是使用 `type`

先引入一下官方的回答

> For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. If you would like a heuristic, use interface until you need to use features from type.

意思就是说，推荐使用 `interface`，除非你需要使用到 `interface` 无法满足，只能使用 `type` 时再使用 `type` 来定义类型。

[原文链接：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

然后，再来讲讲我自己的感受。

在实践中，除了定义基本的类型外，通常还会使用到联合类型、交叉类型等。比如：定义一个组件的 `size` 属性。

```
type IProps = {
    size: 'small' | 'middle' | 'large';
}

const Loading: React.FC<IProps> = (props) => {
    // return ReactNode
}
```

这样就能很轻松地定义出 `size` 的枚举。

在上面的 `interface` 与 `type` 不同点当中的 `type` 可以使用 `typeof` 获取实例的类型有它的使用方式。可以直接拿到到实例的类型。再结合着联合类型。达到组件封装更好的方式。

`interface` 最主要的特色是，`声明合并`。如果有两个相同的接口声明，会自动地进行属性合并。

**总结：根据上面的判断，个人认为：在开发我们自己项目的时候，尽量使用 `type` 定义类型。在开发一些公共组件，类型可能需要扩展以及复用时，使用 `interface` 方式定义。**


## typeof

结合着 `type`，可以直接获取对象的类型。

```
const defaultProps = {
    name: '张三',
    age: 18,
    score: 722,
}

type IProps = typeof defaultProps & {
    favorite: [string];
}

等价于：

type IProps = {
    name: string;
    age: number;
    score: number;
    favorite: [string];
}
```

## keyof

返回一个类型（`type` 或者 `interface`）定义的所有的 `key` 的联合类型。它的值可能为 `string` 或者 `number`。

官方举例说明：

```
// 类型为 number
type Arrayish = { [n: number]: unknown };
const a: keyof Arrayish = 1;    // right
const a: keyof Arrayish = 'name'; // error
```

```
// 类型为 number | string
type Mapish = { [k: string]: boolean };
const a: keyof Mapish = 1;  // right
const b: keyof Mapish = 'name'; // right
const c: keyof Mapish = true; // error
```

实践举例说明：

```
type IDemo = {
    A: string;
    B: number;
    C: boolean;
}

// type IKey: 'A' | 'B' | 'C'
const IKey: keyof IDemo = 'A' // right
const IKey: keyof IDemo = 'B' // right
const IKey: keyof IDemo = 'C' // right
const IKey: keyof IDemo = 'D' // error
```

### 配合着泛型一起使用

```
interface IProps<T> {
    tableProps: Pick<TableProps<T>, keyof TableProps<T>>;
}
```

### 配合 `typeof` 使用

```
const defaultProps = {
    name: '张三',
    age: 18
}

const selfKey: keyof typeof defaultProps = 'name'; // right
const selfKey: keyof typeof defaultProps = 'age'; // right
const selfKey: keyof typeof defaultProps = 'other'; // error
```

## 声明文件

声明文件就是以 `.d.ts` 结尾的文件。常用于对第三方库或者项目中的一些公共类型的声明。

和声明文件紧密关联的是声明语句 `declare`。

### `declare` 是什么？

`declare` 是声明语句的意思。主要用于对变量、函数、类型的声明，以便让 `TypeScript` 能认识他们。

可以定义变量、函数、命名空间、class、枚举等。

`declare var foo: number;`

`declare function greet(greeting: string): void;`

```
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}
```

### 声明文件如何与源代码进行关联？

问这个问题是我在学习之初，对`TS` 类型提示的疑问。为什么引入了第三方库的 `@types` 文件，就可以在它的类型提示了？它是怎么实现的？

经过查资料了解到，声明文件有全局的类型声明和局部的类型声明两种。

`.d.ts` 里面，没有使用 `import`、`export`，默认是全局的。全局的类型声明在项目的任何地方都可以直接使用，无需引入。但是要特别注意类型命名冲突。在 `.d.ts` 文件中，只要有一个类型定义使用了 `export`，那这个声明文件就会变成模块化的。想要使用里面的类型定义，需要先通过 `import` 的方式将其引入才行。
 
 那 `@types` 下面的都是全局的吗？为什么在 `yarn add @types/***` 或者 `npm install @types/***`后，在整个项目中就可以直接使用了呢？
 
 答案是：不是的！！！
 
 以实际例子举例：
 
 ```
// @types/react/index.d.ts
 
export = React;
export as namespace React;

declare namespace React {
    type ReactType<P = any> = ElementType<P>;
    ...
}
```
 
```
// @types/lodash/index.d.ts
 
export = _;
export as namespace _;

declare namespace _ {
    interface LoDashStatic {}
    ...
}
```
 
 从中可以看出，导出的都是以一个以原库同名的命名空间。
 
 这样在页面中，如果我们需要使用到对应的方法或者库。都需要先引入一下，比如：
 
 ```
 import React from 'react';
 import isEmpty from 'lodash/isEmpty';
 ```
 
 这样其实相当于也把它的类型声明也引进来了，当然在使用的时候，会自动提示啦~~~
 

### 如何复用公共的 `interface` 或者 `types` 类型

为什么要复用公共的类型定义？

> 举个例子：在项目中，列表会请求一个接口，返回一个列表数据。这个数据在列表中会用到。点击列表中最右边的编辑按钮。弹框展示当前列所有的字段，并可以对其进行编辑。弹框中的内容在列表中已经返回，可以通过 `props` 传入。如果不复用在列表中已经写过的类型定义，那 `props` 或者其它用到了这些字段的地方又得重新写一遍它的类型定义。

所以，对于那些同一个类型，可能会在项目中的其它地方用到的，复用类型是一个不错的选择！

找了几个优秀的库，参考了一下他们的类型定义方式，对比如下：

- `antd` 在每个独立的模块文件夹下面多了一个`index.d.ts`，见 `node_modules/antd/lib` 下面
- `react-bulma-components 1.1k` 在每个独立的模块文件夹下面多了一个`index.d.ts` [参考链接](https://github.com/couds/react-bulma-components/tree/master/src/components)
- `swiper` - `27.6k star`，公共的单独放于 `types` 文件夹里面，其它的和文件同级，添加 `文件名.d.ts` 文件。[参考链接](https://github.com/nolimits4web/swiper)
- 统一放至于一个 `types` 文件夹下

注意：`interface` 或者 `type` 定义的类型文件需要使用 `export` 导出，否则是全局类型，容易类型变量名字冲突。

> 全局类声明文件：   
定义：如果一个声明文件的顶层作用域中没有 import && export，那么这个声明文件就是一个全局类声明文件   
特点：如果一个全局类声明文件在 ts 处理范围内， 那么全局类声明文件中的 declare 会在全局生效 
> 
> 模块类声明文件：   
定义：如果一个声明文件的顶层作用域中有 import || export，那么这个声明文件就是一个模块类声明文件   
特点：里面的 declare 不会在全局生效，需要按模块的方式导出来才能生效

[https://zhuanlan.zhihu.com/p/133344957](https://zhuanlan.zhihu.com/p/133344957)

```
// typing.d.ts 全局的

interface IObject {
    [name: string]: any;
}

declare type IResponse = {
    total: number;
    list: IObject[];
}
```

```
// index.d.ts 局部的
export type IRecord = {
    id: number;
    name: string;
    hasBrother: boolean;
}

export type INewRecord = IRecord & {
    num: number;
}
```

```
// person.tsx
// IRecord, INewRecord 需要引入才能使用
import { IRecord, INewRecord } from 'index.d';

// IResponse 直接使用
const res: IResponse = await api.get('****');

const newList: INewRecord = IResponse.list.map((item: IRecord) => ({ ...item, num: Math.random() }))
```

**总结：**

**1. 全局的类型：直接放在最外层的 `global.d.ts` 或者 `typing.d.ts`中，不使用 `export` 导出。**

**2. 模块级的类型。在每个功能模块下，定义一个 `index.d.ts` 文件。在这个文件中写需要复用的类型定义。再通过 `export` 的方式将其导出。在需要使用类型的地方，再通过 `import` 导入使用。**


[参考链接：https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## 泛型

作用：规范输入、输出值。使组件或者方法更加通用。

### 在实际项目中有哪些适用场景

1. 数据方法的处理
2. 公共组件的封装
3. 定义通用类型接口

在实际的使用中，可以多参考优秀的库，从中汲取经验。比如：`ant design`。

网上已有详细的介绍及使用场景的说明，这里偷个懒，就直接送上链接了。更多泛型的介绍，请参见:

- [https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [https://segmentfault.com/a/1190000022993503](https://segmentfault.com/a/1190000022993503)

## 常见工具类型

### Partial<Type>

作用：将传入的类型定义转换成全部可选的值

定义如下：

```
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

举例：

```
type IDemo = {
    id: number;
    name: string;
}

type IDemoPartial = Partial<IDemo>;

// 等价于
type IDemoPartial = {
    id?: number | undefined;
    name?: string  | undefined;
}
```

### Required<Type>

作用：将传入的类型定义全部转换在必选的

定义如下：

```
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

举例：

```
type IDemo = {
    id?: number | undefined;
    name?: string | undefined;
}

type IDemoRequired = Required<IDemo>;

// 等价于
type IDemoRequired = {
    id: number;
    name: string;
}
```

### Record<Keys,Type>

作用：一个对象的所有 `key` 对应的值都为第二个参数定义的类型

定义如下：

```
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

举例：

```
function demo(params: Record<string, number>) {
    // do something
}

demo({ id: 1, score: 100 });  // right
demo({ id: 1, score: "100分" });  // error
```


### Pick<Type, Keys>

作用：获取一个类型下的一个或者几个指定的 `key` 的类型

定义如下：

```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

举例：

```
type IDemo = {
    id: number;
    name: string;
}

type IDemoPick = Pick<IDemo, 'id'>;

// 等价于
type IDemoPick = {
    id: number;
}
```

### Omit<Type, Keys>

作用：排除一个类型下的一个或者几个类型

定义如下：

```
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

举例：

```
type IDemo = {
    id: number;
    name: string;
}

type IDemoPick = Omit<IDemo, 'id'>;

// 等价于
type IDemoPick = {
    name: string;
}
```

[相关示例及详细介绍-参考链接：https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)


## 在 `React` 实践项目中的使用

前面介绍了常见了 `TS` 的功能，那在 `React` 项目中，我们需要有哪些注意的呢？

### 能确定类型的，尽量少用 `any` 代替

在文章的最开始部分，就一句话概述了 `TS` 的作用。它就是为 `javascript` 提供一个可选的类型系统。在开发及编译阶段，及早暴露出因类型不对而出现的问题，避免不必要的错误发生，为代码质量保驾护航。

原则上，我们去掉代码中的类型判断，将文件后缀更改为 `.js`，项目都是能够正常运行的。

所以，我们使用 `TS`，就一定要尽可能地发挥它类型系统的特色。为尽可能多的变量设置详细的类型（当前有的地方可以使用 `TS` 自己的类型推论，这也不失为一种技巧）。让错误在开发、编译的过程中就暴露出来。减少线上 `bug` 的产生。

### 函数组件使用 `React.FC` 修饰

`React.FC` 是 `React.FunctionComponent` 的别名。从语义上来说，更加直观表明，这是一个函数组件。同时，也会对组件的 `propTypes`、`defaultProps` 等属性有更好的限制。

```
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
```

### 对 `props` 的类型校验尽量使用 `type`

这个在介绍 `interface` 与 `type` 的区别有对它进行对比。

其中个人认为 `type` 最突出的是 `initialProps` 结合 `typeof`，即设置了 `props` 的默认值，又设置了 `props` 的类型。


### 公共类型如何放置

- 组件级可复用的类型放于 `index.d.ts` 文件中。文件里面的类型至少有一个需要使用 `export` 导出。
- 全局可复用的类型放于于 `global.d.ts` 或者 `typing.d.ts`。文件内无 `export` 导出。

### 灵活使用 `TS` 的基础类型工具

在 `index.d.ts` 中，定义一个完整的类型。比如：

```
// index.d.ts

export type IUser = {
    id: number;
    name: string;
    age: number;
    gender: number;
    isStudent: boolean;
}

// index.tsx
const user: User = {
    id: 1,
    name: '张三',
    age: 20,
    gender: 1,
    isStudent: true,
}

// Student.tsx
const baseInfo: Pick<Iuser, 'id' | 'name' | 'age'> = {
    id: 1,
    name: '张三',
    age: 20,
}

const otherInfo: Partial<IUser> = {
    name: '张三',
    isStudent: true,
}
```

不太清楚完整的类型的（偷懒方式）

```
const obj: Record<string, any> = {
    ...
}
```

### 灵活使用泛型

哪些情况需要使用泛型？

输出的值的类型，可以根据输入的值的类型动态改变的时候。

常见泛型举例：

**`React` 就有许多使用泛型的地方**

- `React.FC<IProps>`
- 事件处理 `const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {}`

**封装异步请求axios**

```
// 全局返回类型
interface IResponse<T = any;> {
    code: number;
    data: T;
    message: string;
}

// 组件内的类型
type IUser = {
    id: number;
    name: string;
}

// axios api
function axiosApi<T>(options): IResponse<T> {
    // ...
    return axios(options);
    // ...
}

// 真实使用时
const getUser = async () => {
    const user = await axiosApi<IUser>({ url, params });
    // 此时，返回值 user 的类型等同于
    const user: IResponse<Iuser> = await axiosApi<IUser>({ url, params });
}
```

### 注意 `readonly` 和 `const` 的区别

**const**

- 用于变量；
- 变量不能重新赋值给其他任何事物。

**readonly**

- 用于属性；
- 用于别名，可以修改属性；
- 函数参数以及一些不可变的对象用 `readonly` 修饰

### 声明一个索引签名

```
interface IObject {
    [x: string]: any
}
```

### 索引签名的嵌套

```
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSliently: NestedCSS {
  colour: 'red'  // TS Error: 未知属性 'colour'
}
```

## 参考链接
- React + Typescript最佳实践 [https://zhuanlan.zhihu.com/p/351817075](https://zhuanlan.zhihu.com/p/351817075)
- React with Typescript 最佳实践 [https://juejin.cn/post/6884144754993397767](https://juejin.cn/post/6884144754993397767)
- React + Typescript 实践 [https://mp.weixin.qq.com/s/mUblBpj6pmdxz9mLKEDJTw](https://mp.weixin.qq.com/s/mUblBpj6pmdxz9mLKEDJTw)
- TypeScript 中高级应用与最佳实践 [http://www.alloyteam.com/2019/07/13796/](http://www.alloyteam.com/2019/07/13796/)
- TypeScript 高级技巧 [https://juejin.cn/post/6844903863791648782](https://juejin.cn/post/6844903863791648782)
- [https://naluduo.vip/Notebook/frontend-web/ts.html#%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6](https://naluduo.vip/Notebook/frontend-web/ts.html#%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6)
