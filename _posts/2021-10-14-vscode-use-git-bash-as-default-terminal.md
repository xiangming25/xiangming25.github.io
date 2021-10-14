---
layout: post
title: vscode 配置 git bash 为默认控制台
categories: [VScode]
description: 配置 git bash 作为 vscode 默认控制台，并且使一些写在 ~/.bash_profile 中的自定义命令生效
keywords: vscode, git bash, vscode bash_profile, use git bash in vscode
---

## 打开 settings.json

执行

> ctrl + shift + P

选择 `Preferences: Open settings(JSON)`

![settings选择](https://gitee.com/xiangming25/picture/raw/master/2021-10-14/1634198887405-image.png)

直接贴代码

```
...
{
"terminal.integrated.defaultProfile.windows": "Git-Bash",
    "terminal.integrated.profiles.windows": {
        "Git-Bash": {
            "path": "D:\\Program Files\\Git\\bin\\bash.exe",
            "args": ["-l"]
        }
    },
...
```

## 注意事项

- 需要设置 `defauultProfile.windows`。指定默认的 `terminal`（我当前的系统环境是 `windows`，如果是其它平台，则选择不同的平台）
- `path` 为安装 `git bash` 的目录
- `args` 的值为 `-l`。（这个地方很重要，如果不设置 `-l`，一些写在 `~/.bash_profile` 中的自定义命令会失效。每次打开 `vscode` 的 `terminal` 时，都需要 `source ~/.base_profile` 才生效）


## 参考链接

- [https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)
- [关于bash：VSCode集成终端不加载.bashrc或.bash_profile](https://www.codenong.com/51820921/)