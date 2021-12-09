---
layout: post
title: 一些你可能不知道的 git 命令
categories: [common]
description: 一些非常有用的git命令
keywords: git,git cherry-pick,合并多个commit,合并多个间隔的commit
---

## git add

### 只将所有更新的文件加入暂存区

```
git add -u
```

## git branch

### 查看分支并带上最新的 commit 信息

```
git branch -v
```

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638957295611-image.png)


### 查看本地的所有分支（包含origin）

```
git branch -av
```

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638957344787-image.png)

### 批量删除分支

```
git branch | grep '$模糊匹配的分支名' | xargs git branch -d
```

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638957430830-image.png)

## git checkout

### 创建分支

```
git checkout -b $新分支名
```

### 从某个tag上新建分支

```
git checkout -b $newBranchName $commitVersion
```


### 从其它分支上创建分支

```
git checkout -b $newBranchName branchName
```

## git diff

### 对比当前 HEAD 和父级的 HEAD 的不同

```
// 其中的1代表父级，如果是父父级，值就就成 2 就行了
git diff HEAD HEAD~1
```

等同于

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638958030486-image.png)

### 不同分支指定文件的差异

```
git diff $branchName1 $branchName2 $fileName
```

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638958091661-image.png)

## git pull

这个命令将 `git fetch` 和 `git merge` 合并成一个

加入当前分支是 `develop`, 当执行：

```
git pull origin master
```

它等同于

```
git fetch origin master
+
git merge master
```

## git commit

### 修改最新的 commit 信息

```
git commit --amend
```

需要注意，如果当前分支已经执行过 `git push` 命令。再执行 `push` 执行时，需要带上 `-f` 参数，强制推上去。

```
git push -f origin $currentBranchName
```

## git stash

### 将修改的内容暂存起来

```
git stash
```

### 查看暂存列表

```
git stash list
```

### 将暂存的信息重新打开

```
git stash apply (stash 堆栈的信息还在)

或

git stash pop
```

## git rebase

### 合并多个 commit

```
git rebase -i $parentVersion
```

保留第一个 `pick`，其它的开头更改为 `squash`（可以简写为 `s`）

![](https://gitee.com/xiangming25/picture/raw/master/2021-11-20/1637337729914-image.png)

添加一个新的 `message` 信息。之前的 `commit ` `message` 仍然保留（也可以不保留）。

![](https://gitee.com/xiangming25/picture/raw/master/2021-11-20/1637337909541-image.png)


### 合并几个间隔的 commit

```
git rebase -i $parentVersion
```

保留第一个，将其它的 `commit` 移动过来。并修改头部为 `squash`（可以简写为 `s`）

![](https://gitee.com/xiangming25/picture/raw/master/2021-11-20/1637338401119-image.png)

如果返回的内容有报错。执行 `git rebase --continue` 后，会进入类似 `git commit --amend` 界面。修改 `commit` 信息。

注意：如果要修改的信息本来就是最初的 `commit`，需要手动在最上面加上一个 `pick $version` 信息。


## git log

### 查看简洁日志

一行展示日志信息，不展示时间，作者等信息。

```
git log --oneline
```

### 查看某个作者提交的日志

```
git log --author $authorName
```

### 根据提交信息查看日志

```
git log --grep $提交信息
```

### 查看某一个时间段的日志

```
git log --since=2021-11-17 --before=2021-11-18
```

## git reset

### 让所有暂存区恢复和 HEAD 一样

```
git reset HEAD
```

```
git reset --hard
```

如果合并分支时，有冲突，但又着急需要继续开发，这个命令非常适用。

### 部分暂存区的文件恢复成 HEAD 一样

```
git reset HEAD $fileName
```

### 消除最近的几次提交记录

```
git reset --hard $parentVersion

等同于

git reset $parentVersion
+
git checkout .
```

## git cherry-pick

将其它分支的 `某次提交记录的` 内容合并到当前分支

```
git cherry-pick $commitVersion
```


## gitk

图形化查看日志，可以看每次的提交的具体信息，以及分支的树形结构。

![](https://gitee.com/xiangming25/picture/raw/master/2021-12-8/1638957013932-image.png)

## 注意

某些操作会直接影响代码以及分支树，在不熟悉之前，建议先拉一个 `test` 分支。在 `test` 分支上多尝试一下。明确知道每个命令执行后会有哪些影响，再在实际操作中使用更好。

## 总结

每一个命令都有自己的适用场景，恰当使用，可以很好地提高协作效率。

此文只简单总结了个人认为比较实用的命令，如果小伙伴们有好的推荐，欢迎与我探讨交流。

## 原文链接

[https://mp.weixin.qq.com/s/mOamNzWW_5aOod-0FC3w5w](https://mp.weixin.qq.com/s/mOamNzWW_5aOod-0FC3w5w)