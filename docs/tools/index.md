---
title: 软件教程
description: 按软件选择对应的 CodeFlow API 配置教程。
outline: [2, 3]
---

# 软件教程

选择你正在使用的软件，按照页面中的步骤配置即可。

<ToolGrid />

## Base URL 速查

| 软件 | 协议/供应商类型 | 地址末尾 |
|---|---|---|
| Claude Code | Anthropic | 不带 `/v1` |
| Codex CLI / Desktop | OpenAI | 带 `/v1` |
| CC Switch | Claude 供应商配置 | 按导入模板 |
| Cursor | OpenAI | 带 `/v1` |
| Cherry Studio | Anthropic | 不带 `/v1` |
| Kilo Code | OpenAI Compatible | 带 `/v1` |
| OpenCode | Anthropic | 带 `/v1` |
| OpenClaw | Anthropic Messages | 不带 `/v1` |

::: tip 建议
每个软件单独创建一个 API 令牌，并按软件命名，例如 `claude-code`、`cursor`。这样更容易核对用量，也能为不同软件设置独立费用上限。
:::
