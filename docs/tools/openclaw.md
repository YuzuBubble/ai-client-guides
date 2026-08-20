---
title: OpenClaw
description: 配置 OpenClaw 的 Anthropic Messages 提供商与模型。
outline: [2, 3]
---

# OpenClaw 配置指南

*最后更新：2026 年 8 月 20 日 02:55*

::: warning 配置时效性
本文依据截至 2026 年 8 月 20 日可获取的客户端界面和 CodeFlow 配置信息整理。客户端界面、配置字段、模型 ID 和可用分组可能随版本更新而变化；实际填写请以客户端最新版本和 CodeFlow 控制台为准。
:::

## 1. 准备客户端

请先根据 [OpenClaw 官方项目文档](https://github.com/openclaw/openclaw) 完成安装，并确认本地网关可以正常启动。

## 2. 打开配置入口

在终端运行以下命令，打开配置文件：

```bash
nano ~/.openclaw/openclaw.json
```

Windows 下配置文件位于 `C:\Users\<用户名>\.openclaw\openclaw.json`。

## 3. 填写 CodeFlow 配置

`baseUrl` 使用不带 `/v1` 的地址，`api` 填写 `anthropic-messages`。路径拼接方式由 OpenClaw 的当前版本决定。

```json
{
    "gateway": {
        "mode": "local"
    },
    "agents": {
        "defaults": {
            "model": {
                "primary": "codeflow/claude-sonnet-5"
            },
            "models": {
                "codeflow/claude-sonnet-5": {}
            }
        }
    },
    "models": {
        "mode": "merge",
        "providers": {
            "codeflow": {
                "baseUrl": "https://codeflow.asia",
                "apiKey": "sk-您的令牌",
                "api": "anthropic-messages",
                "models": [
                    {
                        "id": "claude-sonnet-5",
                        "name": "claude-sonnet-5",
                        "reasoning": true,
                        "input": [
                            "text"
                        ],
                        "cost": {
                            "input": 3,
                            "output": 15,
                            "cacheRead": 0.3,
                            "cacheWrite": 3.75
                        },
                        "contextWindow": 200000,
                        "maxTokens": 64000
                    }
                ]
            }
        }
    }
}
```

> 说明：`cost` 字段属于 OpenClaw 的本地模型元数据，用于本地用量估算，不会改变 CodeFlow 的实际扣费。模型 ID、价格、上下文窗口和能力字段请与 CodeFlow 模型广场当前信息保持一致；这些字段可能随模型或客户端版本变化。

示例仅保留一个模型条目，用于说明配置结构。使用前请将模型 ID、能力和计费字段替换为 CodeFlow 模型广场当前可用的信息，不要继续使用已经下线的模型 ID。

## 4. 保存并启用

保存文件并退出，然后运行以下命令使配置生效：

```bash
openclaw gateway restart
```

## 5. 验证连接

在 OpenClaw 中选择 `codeflow/<模型 ID>`，发送一条测试消息。能够正常返回内容，即表示配置基本完成。

## 遇到问题怎么办

| 现象 | 大致处理方式 |
|---|---|
| 网关启动失败 | 检查 `openclaw.json` 是否为合法 JSON，重点检查逗号、引号和嵌套层级。 |
| 返回 401 | 检查 `apiKey` 是否为有效令牌，并确认 `baseUrl` 不带 `/v1`。 |
| 模型不存在 | 使用模型广场当前可用的 Claude 模型 ID，同时更新 `primary` 和 `models` 中的对应值。 |
