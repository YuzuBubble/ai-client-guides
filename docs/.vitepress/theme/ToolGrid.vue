<script setup lang="ts">
import { withBase } from 'vitepress'

const tools = [
  { name: 'Claude Code', icon: 'claude-code.png', href: '/tools/claude-code', desc: '命令行 AI 编程助手', protocol: 'Anthropic' },
  { name: 'Codex', icon: 'codex.svg', href: '/tools/codex', desc: 'CLI 与 Desktop 配置', protocol: 'OpenAI' },
  { name: 'Cursor-Pro', icon: 'cursor.svg', href: '/tools/cursor', desc: '使用原生 BYOK 配置入口', protocol: 'OpenAI' },
  { name: 'Cursor-NoPro', icon: 'cursor.svg', href: '/tools/cursor-nopro', desc: '通过本地网关接入模型', protocol: '第三方网关' },
  { name: 'CC Switch', icon: 'cc-switch.png', href: '/tools/cc-switch', desc: '快速切换 Claude 供应商', protocol: '导入配置' },
  { name: 'Cherry Studio', icon: 'cherry-studio.png', href: '/tools/cherry-studio', desc: '桌面多模型客户端', protocol: 'Anthropic' },
  { name: 'Kilo Code', icon: 'kilo-code.svg', href: '/tools/kilo-code', desc: 'VS Code 智能编程插件', protocol: 'OpenAI 兼容' },
  { name: 'OpenCode', icon: 'opencode.svg', href: '/tools/opencode', desc: '终端原生编程助手', protocol: 'Anthropic' },
  { name: 'OpenClaw', icon: 'openclaw.svg', href: '/tools/openclaw', desc: '本地智能体与网关', protocol: 'Anthropic Messages' }
]
</script>

<template>
  <div class="tool-grid">
    <a v-for="tool in tools" :key="tool.name" class="tool-card" :href="withBase(tool.href)">
      <span class="tool-mark"><img class="tool-logo" :src="withBase(`/tool-icons/${tool.icon}`)" alt="" loading="lazy" decoding="async" /></span>
      <span class="tool-copy">
        <span class="tool-title-row">
          <strong>{{ tool.name }}</strong>
          <span class="tool-meta">{{ tool.protocol }}</span>
        </span>
        <small>{{ tool.desc }}</small>
      </span>
    </a>
  </div>
</template>
