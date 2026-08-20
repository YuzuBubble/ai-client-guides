<script setup lang="ts">
import { withBase } from 'vitepress'

const items = [
  { title: 'Base URL 末尾要不要加 /v1？', desc: '不同软件要求不同，请按工具查看速查规则。', href: '/guide/access#base-url' },
  { title: 'API 令牌在哪里创建？', desc: '在令牌管理中创建，并为不同软件分别命名。', href: '/guide/access#api-令牌' },
  { title: '令牌分组和模型怎么选？', desc: '分组决定可调用的模型范围和计费倍率，模型系列必须与分组对应。', href: '/guide/models-and-billing' },
  { title: '配置完成后如何验证？', desc: '发送一次简单请求，并在使用日志中确认结果。', href: '/guide/quick-start' },
  { title: '消费记录和预扣怎么看？', desc: '了解预扣、退回和实际扣费之间的关系。', href: '/guide/models-and-billing#额度流水与预扣机制' },
  { title: '遇到问题去哪里反馈？', desc: '查看控制台支持方式，或提交工单跟进处理。', href: '/guide/console' }
]
</script>

<template>
  <div class="help-grid">
    <a v-for="item in items" :key="item.title" class="help-card" :href="withBase(item.href)">
      <span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.desc }}</small>
      </span>
      <i aria-hidden="true">→</i>
    </a>
  </div>
</template>
