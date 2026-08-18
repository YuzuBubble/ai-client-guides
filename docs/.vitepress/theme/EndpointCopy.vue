<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const copied = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

const endpoints = [
  { key: 'china', name: '中国优化线路', url: 'https://codeflow.asia', note: '中国用户日常使用' },
  { key: 'global', name: '全球加速线路', url: 'https://cdn.codeflow.asia', note: '团队、企业或境外网络' }
]

async function copyEndpoint(url: string, key: string) {
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    const input = document.createElement('textarea')
    input.value = url
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }

  copied.value = key
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { copied.value = '' }, 1600)
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="endpoint-copy-list">
    <div v-for="endpoint in endpoints" :key="endpoint.key" class="endpoint-copy-row">
      <span class="endpoint-dot" aria-hidden="true"></span>
      <span class="endpoint-copy-name">
        <strong>{{ endpoint.name }}</strong>
        <small>{{ endpoint.note }}</small>
      </span>
      <code>{{ endpoint.url }}</code>
      <button
        type="button"
        class="endpoint-copy-button"
        :class="{ copied: copied === endpoint.key }"
        :aria-label="`复制${endpoint.name}地址`"
        @click="copyEndpoint(endpoint.url, endpoint.key)"
      >
        <Transition name="copy-feedback" mode="out-in">
          <span :key="copied === endpoint.key ? 'copied' : 'copy'" class="endpoint-copy-feedback">
            <svg v-if="copied !== endpoint.key" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="5" y="5" width="8" height="8" rx="1.5" />
              <path d="M3 10.5V3.8c0-.44.36-.8.8-.8h6.7" />
            </svg>
            <svg v-else viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3.5 8.2 2.8 2.8 6.2-6.2" />
            </svg>
            {{ copied === endpoint.key ? '已复制' : '复制' }}
          </span>
        </Transition>
      </button>
    </div>
    <span class="sr-copy-status" aria-live="polite">{{ copied ? '地址已复制' : '' }}</span>
  </div>
</template>
