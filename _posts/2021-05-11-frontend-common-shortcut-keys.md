---
layout: post
title: 前端开发常用的快捷键整理
categories: [common]
description: 前端开发常用的快捷键整理
keywords: frontend shortcut key, shortcut key, 前端常用快捷键, 快捷键, 常用快捷键
---

操作电脑的方式有许多种，掌握不同的快捷键，可以让我们省去许多不必要花费的时间。从而提高工作效率。

话不多说，直接上干货！！！

## git

喜欢使用命令行提交代码的小伙伴，如果每次都要重复写许多的命令，可以考虑将常用的命令配置对应的 `alias`，以减少重复代码的开发，提高工作效率。

以 `git` 常见命令举例，但是 `alias` 不仅限于 `git`。

- `vim ~/.bash_profile`

```
// 配置常见命令
alias gs='git status'
alias ga='git add'
alias gd='git diff'
alias gb='git branch'
alias gcm='git commit -m'
alias gamend='git commit --amend'   // 注意使用了 git amend 提交代码时，在 git push 时需要加上 -f，只能强制向上推送
alias gck='git checkout'
alias gpush='git push'
alias gpull='git pull origin master'

// 配置打开文件夹的快捷键，此快捷键与 mac & linux 系统保持一致
alias open='explorer'

// 配置项目跳转快捷键
alias pj1='cd /d/project/project1'
alias pj2='cd /d/project/project2'

```

- `source ~/.bash_profile` 使配置生效

更多 `windows` 上 `git bash` 的功能，参见 [https://github.com/xnng/my-git-bash](https://github.com/xnng/my-git-bash)

`mac` 系统参见：[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

## vscode

- `ctrl + B` 快速打开或者隐藏左边菜单栏
- `ctrl + D` 快速选中和当前选中值一样的字符
- `ctrl + shift + F` 整个项目内搜索
- `ctrl + H` 当前文件搜索并替换
- `ctrl + shift + H` 整个项目中搜索并替换
- `ctrl + P` 快速搜索文件，同 `ctrl + E`
- `ctrl + R`，可以快速打开最近打开过的项目
- `ctrl + W` 关闭当前文件
- `ctrl + shift + T` 打开刚刚关闭的文件
- `ctrl + X`，剪切，模拟删除
- `ctrl + /` 注释
- `ctrl + \` 左右分屏
- `ctrl + `\` 打开或者关闭命令行
- `ctrl + alt + 左 / 右`，将当前文件移动到分屏后的左边或者右边
- `ctrl + alt + 上 / 下`，同时向上或者向下选中对应的行，以便统一对那些行进行操作
- `alt + shift + 点击鼠标左键后拖动鼠标`，快速选取对应行
- `alt + 上 / 下`，将当前行向上或者向下移动一行
- `alt + shift + 上 / 下`，复制当前行到本行上面或者下面
- `tab` 向后缩进
- `shift + tab` 向前缩进
- 安装了对应语言的插件，`ctrl + 点击`，可以跳转到对应的方法定义
- 常见的插件安装，参见 [高效的编码：我的VS Code设置](https://mp.weixin.qq.com/s/t9_iza8YpWDuWgqKb3s3lw)
- 自定义代码片段，参见 [如何在VScode中自定义代码模板](https://xiangming.vip/2021/01/25/%E5%A6%82%E4%BD%95%E5%9C%A8VScode%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BB%A3%E7%A0%81%E6%A8%A1%E6%9D%BF/)
- `vscode` 命令行中使用 `git bash`，参见 [Vscode 将终端改为 Git bash](https://www.jianshu.com/p/efa734089206)


## 浏览器

- `ctrl + T` 打开一个新页面，里面如果有之前输入过的地址，再次输入就会有缓存，匹配成功后，按 `enter` 键就可以打开一个新页面。适用于打开常见网站 `git 地址`，`lodash`，`antd`，`elemment-ui`等
- `ctrl + shift + T` 打开刚刚关闭的页面。适用不小心关掉了正在查看的页面，又需要打开时
- `ctrl + N` 打开一个新的窗口
- `ctrl + W` 关闭当前页面
- `ctrl 1 / 2 / 3 / 4` 切换浏览器打开的不同页面 
- `ctrl + R` 刷新页面
- `ctrl + shift + I` 打开控制台


## windows 

- `win + S`，模糊搜索程序名，快速打开应用（`win10 系统`）
- `win + 1 / 2 / 3 / 4`，快速切换底部菜单栏中的应用
- `win + L` 快速锁屏，保证自己的电脑不会被误操作
- `win + 上 / 下 / 左 / 右`，将当前窗口调整为全屏，左半屏，右半屏
- `win + shift + 左 / 右` 箭头，可以让程序快速地移动到另外一个显示器上
- `alt + D` 打开钉钉（设置中可配置，`设置` > `快捷键` > `激活窗口`）
- `alt + W` 打开微信（设置中可配置，`设置` > `快捷按键` > `打开微信`）
- `alt + tab` 切换不同的窗口
- `ctrl + L` 清空命令行查询 （`git bash控制面板中`）
- `ctrl + alt + delete`，个人常用于查看和杀掉系统占用率很大，影响电脑性能的一些程序


## mac

- `command + space` 快速打开应用
- `单指`，`双指`，`三指`，`四指` 的触摸板使用


## 通用

- `ctrl + C` 复制
- `ctrl + V` 粘贴
- `ctrl + F` 搜索
- `ctrl + X` 剪切
- `ctrl + Z` 回退