---
title: Codex CLI 与 Desktop
description: Codex CLI 和 Codex Desktop 的安装与 API 配置。
outline: [2, 3]
---

# Codex CLI 与 Desktop 配置指南

*最后更新：2026 年 8 月 20 日 02:55*

::: warning 配置时效性
本文依据截至 2026 年 8 月 20 日可获取的客户端界面和 CodeFlow 配置信息整理。客户端界面、配置字段、模型 ID 和可用分组可能随版本更新而变化；实际填写请以客户端最新版本和 CodeFlow 控制台为准。
:::

Codex CLI 与 Desktop 使用同一套用户级配置文件，完成一次配置后即可由两个客户端读取。

## 1. 准备客户端

确保已安装 [Node.js](https://nodejs.org/)（建议使用当前 LTS 版本），然后安装 Codex CLI：

```bash
npm install -g @openai/codex
```

安装完成后，验证命令是否可用：

```bash
codex --version
```

## 2. 打开配置入口

Codex CLI 与 Desktop 使用同一个用户级 `.codex` 目录。请在该目录中创建或编辑 `config.toml` 和 `auth.json`。

## 3. 填写 CodeFlow 配置

### `config.toml`

找到并编辑 `config.toml`；如果文件不存在，请新建。填入以下内容：

```toml
model_provider = "codeflow"
model = "gpt-5.6-terra"

[model_providers.codeflow]
name = "codeflow"
base_url = "https://codeflow.asia/v1"
wire_api = "responses"
requires_openai_auth = true
```

示例使用 `gpt-5.6-terra`。实际配置时请以模型广场当前可用的 GPT 模型 ID 为准；如果该模型已下线，只需替换 `model` 的值，不要修改供应商配置字段。

### 文件路径

根据您的操作系统，将文件放置在对应位置：

|操作系统|路径|
|---|---|
|**Windows**|`C:\Users\<用户名>\.codex\config.toml`|
|**macOS**|`/Users/<用户名>/.codex/config.toml`|
|**Linux**|`~/.codex/config.toml`|

> `base_url` 必须带 `/v1`；令牌请选择 **Codex 官方分组**；`model` 必须使用模型广场当前可用的 GPT 模型 ID。

### `auth.json`

在同一目录下编辑 `auth.json`；如果文件不存在，请新建。将 `OPENAI_API_KEY` 的值替换为 CodeFlow 令牌：

```json
{
  "OPENAI_API_KEY": "您的密钥"
}
```

|操作系统|路径|
|---|---|
|**Windows**|`C:\Users\<用户名>\.codex\auth.json`|
|**macOS**|`/Users/<用户名>/.codex/auth.json`|
|**Linux**|`~/.codex/auth.json`|

## 4. 保存并启用

保存 `config.toml` 和 `auth.json` 后，完全退出并重新打开 Codex CLI 或 Desktop，确保两者重新读取同一个用户级 `.codex` 目录。

## 5. 验证连接

配置完成后，在终端运行以下命令启动 Codex：

```bash
codex
```

如果配置正确，Codex 应能连接 CodeFlow 并使用指定模型。

Codex Desktop 与 CLI 共用配置文件，按上述步骤配置即可，无需另行设置。

## 遇到问题怎么办

|现象|大致处理方式|
|---|---|
|返回 401 或提示认证失败|检查 `auth.json` 是否为合法 JSON、字段名是否为 `OPENAI_API_KEY`，并重新复制令牌。|
|返回 404 或提示模型不存在|确认 `model` 使用模型广场中的 GPT 模型 ID，且令牌属于 **Codex 官方分组**。|
|无法连接服务|确认 `base_url` 为 `https://codeflow.asia/v1`，然后重新启动 Codex。|
|CLI 已生效但 Desktop 未生效|完全退出并重新打开 Desktop；两者应读取同一个用户目录下的 `.codex` 配置。|
|修改配置后仍无变化|运行 `codex --version` 确认 CLI 可用，并检查文件是否放在当前系统用户的 `.codex` 目录。|
