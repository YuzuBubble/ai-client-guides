---
title: 软件教程
description: 按客户端选择对应的 CodeFlow API 配置指南。
outline: [2, 3]
---

# 软件教程

*最后更新：2026 年 8 月 20 日 02:55*

选择您正在使用的软件，按照对应页面的步骤完成配置。

::: warning 教程时效性
客户端更新可能调整配置入口、界面名称、字段或协议支持。如果实际界面与教程不一致，请优先参考对应软件的最新官方文档；Base URL、模型 ID 和令牌分组则以 CodeFlow 控制台当前显示为准。请勿直接沿用已经下线的模型 ID。
:::

<ToolGrid />

## Base URL 速查

| 软件 | 协议/供应商类型 | 地址末尾 |
|---|---|---|
| Claude Code | Anthropic | 不带 `/v1` |
| Codex CLI / Desktop | OpenAI | 带 `/v1` |
| Cursor-Pro | OpenAI（原生 BYOK） | 带 `/v1` |
| Cursor-NoPro | OpenAI / Anthropic（第三方本地网关） | GPT 带 `/v1`；Claude 不带 |
| CC Switch | Claude／Codex 供应商配置 | 按导入模板 |
| Cherry Studio | Anthropic | 不带 `/v1` |
| Kilo Code | OpenAI 兼容接口 | 带 `/v1` |
| OpenCode | Anthropic | 带 `/v1` |
| OpenClaw | Anthropic Messages | 不带 `/v1` |

::: tip 建议
每个软件单独创建一个 API 令牌，并按软件命名，例如 `claude-code`、`cursor-pro` 或 `cursor-nopro`。这样更容易核对用量，也能为不同软件设置独立费用上限。
:::
