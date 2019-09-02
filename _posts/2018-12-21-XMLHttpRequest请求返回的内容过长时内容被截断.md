---
layout: post
title: XMLHttpRequest请求返回的内容过长时内容被截断
categories: javascript
description: XMLHttpRequest请求返回的内容过长时内容被截断
keywords: javascript, XMLHttpRequest 内容截断
---

通过xmlHttpRequest向后端请求一个api，在除android 4.4.* 版本以外的其它设备上，均能正常请求数据并成功渲染页面。但是在android 4.4.*上，返回的内容中间部分（位置不固定）以及最后部分都存在内容被截断问题。

### 环境

    axios - 0.17.1.

    android - 4.4.2

   react-native 0.55.4
    
### 出现的可能性
1 使用了nginx代理，返回内容过长时，内容被截断（排除在外，因为这个和设备有关）。

    解决方案：https://hnulanwei.iteye.com/blog/2316308。

2 服务端使用了分片返回数据，`Transfer-Encoding: chunked`，导致数据量过大的时候，返回内容被截断。
    
    解决方案：后端修改，增加返回的buffer值大小

3 react-native 自己集成的XMLHttpRequest有问题（真正的原因）

    解决方案：修改axios > lib > xhr.js源码，在line 38 行处加上如下代码。
        // 为兼容android 4.4 =========before===========
    const userAgent = requestHeaders['User-Agent'];
    const systemVersion = requestHeaders['system-version'];
    const minAndroidVersion = 4.4;
    const successStatus = 200;
    const failureStatus = 204;
    const isAndroid = /Android/ig.test(userAgent);
    if (isAndroid && parseFloat(systemVersion) <= minAndroidVersion) {
      const url = buildURL(config.url, config.params, config.paramsSerializer);
      const params = {
        method: config.method.toUpperCase(),
        headers: requestHeaders,
      };
      if (['POST', 'PUT'].includes(config.method.toUpperCase())) {
        params.body = requestData;
      }
      fetch(url, params).then((res) => {
        res.json().then((resJSON) => {
          const response = {
            data: JSON.stringify(resJSON),
            config: config,
            status: successStatus,
            request: {
              responseURL: url,
            },
          };
          settle(resolve, reject, response);
        });
      }).catch((e) => {
        const response = {
          data: JSON.stringify(e),
          config: config,
          status: failureStatus,
          request: {
            responseURL: url,
          },
        };
        settle(resolve, reject, response);
      });
      return;
    }
    // 为兼容android 4.4 =========end===========
    
    


### 参考链接
- [请求数据超过8000出现数据返回异常，https://coderanch.com/t/122411/languages/Ajax-Size-Limit](https://coderanch.com/t/122411/languages/Ajax-Size-Limit)
- [android 4.4 及以后HttpUrlConnection底层实现变更](https://blog.csdn.net/devilnov/article/details/53540585)
- [Android 网络框架解压缩（gzip）浅谈](https://www.jianshu.com/p/cf7ae9c99d50)
- [Transfer-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)
- [维基百科-分块传输编码](https://zh.wikipedia.org/wiki/%E5%88%86%E5%9D%97%E4%BC%A0%E8%BE%93%E7%BC%96%E7%A0%81)
- [https://facebook.github.io/react-native/docs/network](https://facebook.github.io/react-native/docs/network)
