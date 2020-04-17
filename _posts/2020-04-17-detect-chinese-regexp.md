---
layout: post
title: JS正则验证是否是汉字（包含CJK扩展类汉字）
categories: react-native
description: JS正则验证是否是汉字
keywords: chinese regexp, JS正则验证是否是汉字, js汉字验证
---

Unicode 1.0版提供了20,916个汉字，基本满足了日常的使用。在后续的版本又分别新增了 [扩展A区汉字](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%97%A5%E9%9F%93%E7%B5%B1%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97%E6%93%B4%E5%B1%95%E5%8D%80A)，[扩展B区汉字](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%97%A5%E9%9F%93%E7%B5%B1%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97%E6%93%B4%E5%B1%95%E5%8D%80B)，[扩展C区汉字](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%97%A5%E9%9F%93%E7%B5%B1%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97%E6%93%B4%E5%B1%95%E5%8D%80C)，[扩展D区汉字](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%97%A5%E9%9F%93%E7%B5%B1%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97%E6%93%B4%E5%B1%95%E5%8D%80D)等等

之前使用的 `[\u4E00-\u9FA5]/` 正则来验证是否是汉字无法满足扩展后汉字的验证。

JS新的验证汉字的正则如下：

```
const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;

const hasChinese = (str) => REGEX_CHINESE.test(str);
```

## 参考链接

- [http://flyingsky.github.io/2018/01/26/javascript-detect-chinese-japanese/](http://flyingsky.github.io/2018/01/26/javascript-detect-chinese-japanese/)
- [维基百科:Unicode扩展汉字](https://zh.wikipedia.org/wiki/Wikipedia:Unicode%E6%89%A9%E5%B1%95%E6%B1%89%E5%AD%97)
- [中日韩统一表意文字](https://www.wikiwand.com/zh-cn/%E4%B8%AD%E6%97%A5%E9%9F%93%E7%B5%B1%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97#)