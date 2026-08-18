---
title: CC Switch
description: 使用 CC Switch 添加并启用 CodeFlow 供应商。
outline: [2, 3]
---

# CC Switch 安装与导入供应商使用

CC Switch 为供应商配置管理工具，通过图形界面配置 Claude Code 与 Codex，并支持在多个供应商之间一键切换。不希望手动编辑配置文件时可使用本方式，与前两章的配置方式二选一。

## 下载 CC Switch

1. 前往 [CC Switch GitHub Releases 页面](https://github.com/farion1231/cc-switch/releases/latest)，查看并下载最新版本。

2. 在最新版本的 **Assets** 区域选择适用于当前系统的安装包：Windows 推荐下载 `.msi` 文件，macOS 选择 `.dmg` 文件，Linux 可按需选择 AppImage、deb 或 rpm 格式。

![CC Switch Release 页面](../assets/images/image-24.png)

## 添加供应商

1. 打开你下载的 CC Switch 软件，你会看到如下图的初始界面

![CC Switch 初始界面](../assets/images/image-25.png)

2. 在分组条中，将分组选择至 Claude

![切换至 Claude 分组](../assets/images/image-26.png)

3. 在供应商分组中，选择如图的 **自定义配置**

![选择自定义配置](../assets/images/image-27.png)

4. 输入模板配置，并将 `ANTHROPIC_AUTH_TOKEN` 替换为自己的 API Key，同时为该配置填写名称。

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://codeflow.asia",
    "ANTHROPIC_AUTH_TOKEN": "sk-您的令牌"
  }
}
```

![填写供应商名称](../assets/images/image-07.png)

![填入配置内容](../assets/images/image-28.png)

5. 添加成功后，在主界面会看到我们配置的分组，在右侧点击「启用」按钮，显示「使用中」，则配置完成

![启用供应商](../assets/images/image-29.png)

6. 在终端运行 `claude`，看到对话界面并能正常回复即表示配置完成

![Claude Code 运行结果](../assets/images/image-08.png)

配置 Codex 时流程一致：在分组条中将分组选择至 **Codex**，选择自定义配置，将本文 Codex CLI 章节中的 `config.toml` 与 `auth.json` 内容填入对应输入框即可。
