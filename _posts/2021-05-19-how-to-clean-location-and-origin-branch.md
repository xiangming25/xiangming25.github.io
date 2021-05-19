---
layout: post
title: git如何清理本地多余的分支
categories: [common]
description: git如何清理本地多余的分支
keywords: git, branch delete, origin branch delete, 删除本地的远端分支,删除本地分支,批量删除分支
---

## 前言

对同一个项目进行持续迭代半年或者一年以上，本地以及远端的分支数量如果不及时清理，都会变得很多。在查看以及切换分支时，都会变得很不方便。

有时候，为了合并远端 `develop` 分支的代码，我们可能会有这样的操作。先执行 `git checkout develop` 切换到本地的 `develop` 分支，然后直接执行 `git pull` 命令。轻松将远端 `develop` 分支的最新代码合并到了本地的 `develop`。

真开心，能用一行命令解决的事，咱绝不多敲几个字符。

![](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621432374178-image.png)

一顿帅气的 `Coding` 后，把手上的代码提交了。好了，我们切换到另外一个分支，继续去做另外一个需求。

来吧！打开 `terminal` 或者 `git bash` 控制台。`cd projectDir` 进入对应的项目文件夹。切换到对应的分支，执行 `git checkout feature/`，此时，会玩的朋友都知道，可以按 `Tab` 键进行自动补全。

> 注意：这里的 `feature/` 是因为我的分支名前面都统一添加了 `feature/` 字符串。

什么情况？为什么按了 `Tab` 后，会提示有我几十个待选分支。

![模糊匹配分支数](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621425042481-all-branch.png)

好吧~~~ 

那我多输入一些，来点更加精确的输入吧。果然，多输入了一些后，再按 `Tab`，完美的把我要切换的分支切过来了。

有的同学喜欢的编辑器中，以 `VSCode` 距离，安装了对应的 `git` 插件（比如 `gitLens`插件），就可以直接在 `VSCode` 中切换分支了。但是这样还是有很多不需要的分支，要让我们多找一会儿才能切换。

![vscode中切换分支](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621425810500-image.png)

此时，心里没那么开心了，每次切换都要多输入几个字符才能匹配出来，有没有更加简便的方式呢？

## 具体操作

### 查看所有分支

执行 `git branch -a` 查看所有分支

![所有的分支](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621425425368-image.png)

可以看到，上面白色文字的就是本地的分支。这部分分支可以直接通过输入命令 `git branch` 查看到。还有一部分的分支名是红色的，这些分支，就是我们最初直接执行 `git pull` 拉下来的远端的分支。这些红色的分支，大多数情况下，在我们本地都是不需要用到的。但是它在我们切换分支时，会很影响我们查找我们需要的分支。

### 删除多余分支

本地自己创建的分支，我们可以执行 `git branch -d $branchName` 来一个一个地删除。

但是，这样删除比较慢，我们可以批量删除分支吗？

有，当然有~

执行：`git branch | grep 'qa' | xargs git branch -d`

这行命令表示，删除本地所有有包含 `qa`　字符的分支。

![批量删除分支](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621433768636-image.png)

再次执行 `git branch` 命令，就可以看到，本地所有包含 `qa` 字符串的分支都被清理干净了。

距离快速切换我们的分支又近了一步，哈哈哈哈，小开心~~~

那存放于本地的远端分支，也就是下图中，红色的那些分支也可以这样删除吗？

![所有的分支](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621425425368-image.png)

抱歉，这样，还真的不行！！！

如果一定要执行，那这个错误，就在前面等着我们。

![删除远端分支错误](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621434070019-image.png)

那我们该怎么办呀？

别担心，今天想分享的知识，在这里才正式开始。

### 删除存放于本地的远端分支

#### 方法一

用命令行工具（`terminal` 或者 `git bash` 或者 `item2`）进入对应的项目。

执行 `cd .git` 命令

进入到 `.git` 文件夹下面。

> 为什么要这样操作呢？我在 `windows` 电脑中，本来是想去 `我的电脑` 中直接查看它的，但是就算把显示隐藏文件夹打开，也仍然没有找到它的入口，所以想到，直接使用命令的方式，直接进入。

然后 `windows` 电脑下执行 `explorer .`，`mac` 电脑下执行 `open .` 命令，在文件管理器中打开当前文件夹。

删除 `refs/remotes/` 文件夹下面的所有文件。

这时，我们再执行 `git branch -a` 命令，就可以看到远端的分支被删除了。我们再执行 `git checkout feature/` 加 `Tab`，自动提示的分支就少了很多了。或者在 `VSCode` 中切换分支，也会发现少了许多用不到的分支了。

#### 方法二

打开 `VSCode`，如果在左边目录中，找到 `.git` 文件夹，如果没有找到 `.git` 文件夹，点击 `file` > `preferences` > `Settings`，找到 `Text Editor` 下面的 `Files`。

![](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621435789532-image.png)

删除 `VSCode` 对 `.git` 文件夹的隐藏。

在 `.git` 文件夹下面找到 `refs/remotes` 文件夹，删掉它下面的 `origin` 文件夹。

![](https://gitee.com/xiangming25/picture/raw/master/2021-5-19/1621436024032-image.png)

这时，再执行 `git branch -a`。也可以看到远端的分支被删除了。不管是通过命令方式切换分支还是在 `VSCode` 中使用工具切换分支。都会简洁干净很多。切换起来也会更加快速了。

## 总结

- 开发时间久了后，分支会慢慢的积累，一直留在那里，过多的分支会影响查找和切换分支的速度。这个在一个项目中同时开发多个需求时，影响特别明显。所以养成定期删除无用分支习惯，可以很好的让我们避免因为切换分支时带来的时间消耗，提升我们的开发效率。
- 在拉取远端分支时，尽量制定要拉取远端的哪个分支。指明要拉取的分支名，可以避免其它不需要的分支也被拉取下来，造成本地分支污染。
- 如果想切换到远端的另外一个分支。可以先执行 `git fetch origin branchName`，然后再执行 `git checkout branchName`切换过去。
- 直接执行 `git pull origin branchName`，它其实是将 `git fetch origin branchName` 和 `git merge branchName` 两步合并执行了。意思是，将远端的某个分支，拉取并合并到本地的现在所在的分支。
