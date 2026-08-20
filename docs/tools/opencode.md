---
title: OpenCode
description: 创建 OpenCode 配置、保存 API 密钥并验证连接。
outline: [2, 3]
---

# OpenCode 配置指南

*最后更新：2026 年 8 月 20 日 02:55*

::: warning 配置时效性
本文依据截至 2026 年 8 月 20 日可获取的客户端界面和 CodeFlow 配置信息整理。客户端界面、配置字段、模型 ID 和可用分组可能随版本更新而变化；实际填写请以客户端最新版本和 CodeFlow 控制台为准。
:::

## 1. 准备客户端

请先从 [OpenCode 官方网站](https://opencode.ai/) 获取安装说明，完成安装并启动 OpenCode。

## 2. 打开配置入口

配置文件通常位于以下用户级路径：

|操作系统|配置文件路径|
|---|---|
|Windows|`C:\Users\<用户名>\.config\opencode\opencode.json`|
|macOS / Linux|`~/.config/opencode/opencode.json`|

## 3. 填写 CodeFlow 配置

填入以下内容。请将 `models` 和 `model` 中的模型 ID 替换为 CodeFlow 模型广场当前可用的 Claude 模型，并保持两处 ID 一致。

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "codeflow": {
      "npm": "@ai-sdk/anthropic",
      "name": "CodeFlow",
      "options": { "baseURL": "https://codeflow.asia/v1" },
      "models": {
        "claude-sonnet-5": { "name": "Sonnet 5" }
      }
    }
  },
  "model": "codeflow/claude-sonnet-5"
}
```

> 供应商配置必须置于 `provider.codeflow` 下，不能将 `npm`、`options`、`models` 平铺到最外层。`baseURL` 必须带 `/v1`；`@ai-sdk/anthropic` 会在此基础上拼接消息路径。

## 4. 保存并启用

保存 `opencode.json` 后，在终端运行 `opencode auth login`。按提示选择 `Other`，将 Provider ID 填为 `codeflow`，再输入 CodeFlow API Key。密钥由 OpenCode 凭据库管理，不需要写入 JSON。

## 5. 验证连接

在终端运行 `opencode` 进入界面，然后输入：

```Plain Text
/models
```

如果列表显示已配置的模型，说明连接配置基本完成。

## 遇到问题怎么办

| 现象 | 大致处理方式 |
|---|---|
| `/models` 中没有模型 | 确认供应商位于 `provider.codeflow` 下，且 `baseURL` 带 `/v1`。 |
| 登录后仍提示认证失败 | 确认 `opencode auth login` 中的 Provider ID 与 JSON 中的 `codeflow` 完全一致。 |
