---
layout: post
title: JS 凯撒密码
categories: javascript
description: JS 凯撒密码
keywords: JS 凯撒密码、js凯撒密码、js Caesar cipher
---

凯撒密码又叫移位密码，也就是密码中的字母会按照指定的数量来做移位。

一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔'O'，以此类推。

解码代码如下：

```
function rot13(str) {
  let newStr = '';
  for (let i = 0; i<str.length;i++ ) {
    if (/\w/.test(str.charAt(i))) {
      let charCode = str.charCodeAt(i);
      charCode = charCode >= 78 ? charCode - 13 : charCode + 13;
      newStr += String.fromCharCode(charCode);
    } else {
      newStr += str[i];
    }
  }
  return newStr.toUpperCase();
}

rot13("SERR PBQR PNZC");  // "FREE CODE CAMP"
```

## 参考链接

- [String.prototype.charCodeAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
- [String.fromCharCode()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
- [String.charAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)