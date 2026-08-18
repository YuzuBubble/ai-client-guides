---
title: Codex CLI 与 Desktop
description: Codex CLI 和 Codex Desktop 的安装与 API 配置。
outline: [2, 3]
---

# Codex CLI 安装与配置指南

完成一次配置后，Codex CLI 与 Desktop 会共用同一套配置文件。

## 前置条件：安装 Codex

确保已安装 [Node.js](https://nodejs.org/)（v22 或更高版本），然后运行：

```bash
npm install -g @openai/codex
```

安装完成后，验证是否成功：

```bash
codex --version
```

## 配置 Codex

### `config.toml`

找到并编辑 `config.toml`（不存在则新建），填入以下内容：

```toml
model_provider = "codeflow"
model = "gpt-5.6-terra"

[model_providers.codeflow]
name = "codeflow"
base_url = "https://codeflow.asia/v1"
wire_api = "responses"
requires_openai_auth = true
```

`model` 可替换为模型广场中任一 GPT 模型 ID，如 `gpt-5.6-sol`、`gpt-5.5`、`gpt-5.4`。模型列表与核验日期见「模型与计费」页面。

### 文件路径

根据您的操作系统，将文件放置在对应位置：

|操作系统|路径|
|---|---|
|**Windows**|`C:\Users\<用户名>\.codex\config.toml`|
|**macOS**|`/Users/<用户名>/.codex/config.toml`|
|**Linux**|`~/.codex/config.toml`|

> 注意：此处 `base_url` 需带 `/v1`，且令牌须选择 **Codex 官方分组**。
>
>

### `auth.json`

在同一目录下编辑 `auth.json`（不存在则新建），将 `OPENAI_API_KEY` 的值替换为您在后台生成的密钥：

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

## 验证配置

配置完成后，在终端运行以下命令启动 Codex：

```bash
codex
```

如果一切配置正确，Codex 将成功连接到 codeflow 平台并使用配置的模型。

## Codex Desktop 配置

**与 `Codex CLI` 共用配置文件**，按上述步骤配置即可，无需另行设置。

## 遇到问题怎么办

|现象|大致处理方式|
|---|---|
|返回 401 或提示认证失败|检查 `auth.json` 是否为合法 JSON、字段名是否为 `OPENAI_API_KEY`，并重新复制令牌。|
|返回 404 或提示模型不存在|确认 `model` 使用模型广场中的 GPT 模型 ID，且令牌属于 **Codex 官方分组**。|
|无法连接服务|确认 `base_url` 为 `https://codeflow.asia/v1`，然后重新启动 Codex。|
|CLI 已生效但 Desktop 未生效|完全退出并重新打开 Desktop；两者应读取同一个用户目录下的 `.codex` 配置。|
|修改配置后仍无变化|运行 `codex --version` 确认 CLI 可用，并检查文件是否放在当前系统用户的 `.codex` 目录。|
