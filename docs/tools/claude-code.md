---
title: Claude Code
description: Claude Code CLI 的安装、初始化、配置与验证。
outline: [2, 3]
---

# Claude Code CLI 配置指南

*最后更新：2026 年 8 月 20 日 02:55*

::: warning 配置时效性
本文依据截至 2026 年 8 月 20 日可获取的客户端界面和 CodeFlow 配置信息整理。客户端界面、配置字段、模型 ID 和可用分组可能随版本更新而变化；实际填写请以客户端最新版本和 CodeFlow 控制台为准。
:::

## 1. 准备客户端

请根据操作系统选择一种 Claude Code 官方安装方式。以下命令来自 Claude Code 官方安装入口，请勿在同一台设备上重复执行多种安装方式。

**Homebrew（macOS、Linux）：**

```bash
brew install --cask claude-code
```

**macOS、Linux、WSL：**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell：**

```PowerShell
irm https://claude.ai/install.ps1 | iex
```

安装完成后验证：

```bash
claude --version
```

## 2. 打开配置入口

首次安装后运行一次 `claude`，完成客户端初始化并确认命令可用。

```bash
claude
```

如果初始化过程出现官方账号登录引导，请按实际使用的鉴权方式操作。使用 CodeFlow 令牌时，后续配置文件中的令牌用于请求鉴权。

## 3. 填写 CodeFlow 配置

配置文件位于用户主目录下的隐藏文件夹 `.claude` 中：

|操作系统|路径|
|---|---|
|Windows|`C:\Users\用户名\.claude\settings.json`|
|macOS / Linux|`~/.claude/settings.json`|

如果文件不存在，请新建该文件。填入以下内容，并将 `ANTHROPIC_AUTH_TOKEN` 替换为您的 CodeFlow 令牌：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://codeflow.asia",
    "ANTHROPIC_AUTH_TOKEN": "sk-您的令牌",
    "ANTHROPIC_MODEL": "claude-sonnet-5"
  }
}
```

此处地址不带 `/v1`，Claude Code 自行补全。

将 `ANTHROPIC_MODEL` 设置为模型广场中当前可用的 Claude 模型 ID。模型 ID 变化时，只需更新该字段，或在会话内使用 `/model <模型 ID>` 临时切换。

## 4. 保存并启用

保存 `settings.json` 后，完全退出正在运行的 Claude Code，再重新打开终端。此处 Base URL 不带 `/v1`；Claude Code 会按照 Anthropic 接口约定处理后续路径。

## 5. 验证连接

进入项目目录并启动：

```bash
cd your-awesome-project
claude
```

出现对话界面并能正常返回内容，即表示基本配置完成。

## 遇到问题怎么办

| 现象 | 大致处理方式 |
|---|---|
| 返回 401 或认证失败 | 检查 `ANTHROPIC_AUTH_TOKEN` 是否为有效令牌，确认令牌属于 Claude 系列分组。 |
| 返回 404 或模型不存在 | 到模型广场复制当前可用的 Claude 模型 ID，更新 `ANTHROPIC_MODEL`，或删除该字段后重启。 |
| 修改后没有生效 | 完全退出 Claude Code 后重新打开，并确认文件位于当前用户的 `.claude/settings.json`。 |

更多安装信息请参考 [Claude Code 官方文档](https://code.claude.com/docs/zh-CN/setup)。
