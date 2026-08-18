---
title: Kilo Code
description: 在 VS Code 的 Kilo Code 插件中添加自定义提供商。
outline: [2, 3]
---

# Kilo Code 配置教程

| 配置项 | 填写内容 |
|---|---|
| 基础 URL | `https://codeflow.asia/v1` |
| API 密钥 | 您的 CodeFlow 令牌 |
| 令牌分组 | 按需选择，决定可获取的模型范围 |

## 1. 打开提供商设置

进入 Kilo Code 设置并选择「提供商」，找到「自定义提供商」后点击「+ 连接」。

![添加自定义提供商](../assets/images/image-10.png)

## 2. 填写连接信息

在「基础 URL」中填写：`https://codeflow.asia/v1`

![填写基础 URL 与密钥](../assets/images/image-11.png)

填写「基础 URL」和「API 密钥」后，Kilo Code 将自动获取当前分组可用的模型。

## 3. 提交配置

![提交配置](../assets/images/image-06.png)

## 4. 验证配置

选择已添加的模型并发送测试消息，能够正常回复即表示配置完成。

![测试模型回复](../assets/images/image-09.png)
