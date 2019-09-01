---
layout: post
title: ubuntu下安装了express2.5.8,如何更新它
categories: nodeJs
description: ubuntu下安装了express2.5.8,如何更新它
keywords: javascript, nodejs, ubuntu
---

在ubuntu上通过apt-get install node-express，结果发现它的版本是2.5.8.   
想安装express4.0+的版本，一直不能正确安装，所以一时兴起，打算先删掉它，再重新安装。

删除步骤为：   
### 1. 查看安装的express   
  ```
  dpkg --list | grep express
  ```
### 2. 使用命令移除它   
  ```
  sudo apt-get remove --purge node-express
  ```
![移除express](/assets/images/2016/12/ubuntu_express_1.png)
### 3. 安装express
  ```
  > npm install -g express-generator
  > npm install -g express
  ```
这个时候如果输入express 按tab补全，是有的，但是还是用不了。
```
> sudo ln -s /usr/bin/nodejs /usr/local/bin/node
```

解决了！！！

### 4. 测试：
```
> express angular_bootstrap -e
```

能看见有文件目录生成就说明已经安装成功了。

![](/assets/images/2016/12/ubuntu_express_2.png)
