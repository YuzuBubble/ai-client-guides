<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import ToolGrid from './ToolGrid.vue'
import EndpointCopy from './EndpointCopy.vue'
import HomeHelp from './HomeHelp.vue'

const landingRoot = ref<HTMLElement | null>(null)
let revealObserver: IntersectionObserver | undefined
let heroFrame = 0

function revealImmediately(elements: Element[]) {
  elements.forEach((element) => element.classList.add('is-motion-visible'))
}

onMounted(() => {
  const root = landingRoot.value
  if (!root) return

  const heroItems = [...root.querySelectorAll('[data-motion="hero"]')]
  const revealItems = [...root.querySelectorAll('[data-motion="reveal"]')]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealImmediately([...heroItems, ...revealItems])
    return
  }

  heroFrame = requestAnimationFrame(() => {
    heroFrame = requestAnimationFrame(() => revealImmediately(heroItems))
  })

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-motion-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -48px', threshold: 0.12 })

  revealItems.forEach((element) => revealObserver?.observe(element))
})

onBeforeUnmount(() => {
  if (heroFrame) cancelAnimationFrame(heroFrame)
  revealObserver?.disconnect()
})

const tools = [
  { name: 'Claude Code', icon: 'claude-code.png', href: '/tools/claude-code' },
  { name: 'Codex', icon: 'codex.svg', href: '/tools/codex' },
  { name: 'CC Switch', icon: 'cc-switch.png', href: '/tools/cc-switch' },
  { name: 'Cursor', icon: 'cursor.svg', href: '/tools/cursor' },
  { name: 'Cherry Studio', icon: 'cherry-studio.png', href: '/tools/cherry-studio' },
  { name: 'Kilo Code', icon: 'kilo-code.svg', href: '/tools/kilo-code' },
  { name: 'OpenCode', icon: 'opencode.svg', href: '/tools/opencode' },
  { name: 'OpenClaw', icon: 'openclaw.svg', href: '/tools/openclaw' }
]
</script>

<template>
  <main ref="landingRoot" class="cf-landing">
    <section class="cf-hero">
      <div class="cf-container cf-hero-grid">
        <div class="cf-hero-copy" data-motion="hero">
          <span class="cf-badge"><i></i> CodeFlow API · 客户端配置文档</span>
          <h1>CodeFlow 接入文档</h1>
          <p>面向 Claude Code、Codex、Cursor 等 AI 编程工具，提供从令牌创建、客户端配置到请求验证的完整说明。</p>
          <div class="cf-actions">
            <a class="cf-button cf-button-primary" :href="withBase('/guide/quick-start')">开始接入</a>
            <a class="cf-button cf-button-secondary" href="#software-guides">选择客户端 <span>↓</span></a>
          </div>
          <ul class="cf-benefits">
            <li><span>✓</span> 8 个客户端教程</li>
            <li><span>✓</span> 两条接入线路</li>
            <li><span>✓</span> 包含验证与排障</li>
          </ul>
        </div>

        <div class="cf-terminal" data-motion="hero" aria-label="CodeFlow API 配置示意">
          <div class="cf-terminal-top">
            <span></span><span></span><span></span>
            <small>codeflow — client setup</small>
          </div>
          <div class="cf-terminal-body">
            <p><b>$</b> configure --provider codeflow</p>
            <div class="cf-config-line"><i></i><span>Base URL</span><code>https://codeflow.asia</code></div>
            <div class="cf-config-line"><i></i><span>API Token</span><code>sk-••••••••••••</code></div>
            <div class="cf-config-line"><i></i><span>Client</span><code>Claude Code</code></div>
            <div class="cf-terminal-divider"></div>
            <p class="cf-terminal-success"><b>✓</b> Configuration verified</p>
            <small>Ready. Start a new conversation to test the connection.</small>
          </div>
        </div>
      </div>
    </section>

    <section class="cf-tool-ribbon" aria-label="支持的软件">
      <div class="cf-container" data-motion="reveal">
        <p>选择正在使用的客户端，进入对应配置文档</p>
        <div class="cf-tool-chips">
          <a v-for="tool in tools" :key="tool.name" :href="withBase(tool.href)">
            <img :src="withBase(`/tool-icons/${tool.icon}`)" alt="" />
            <span>{{ tool.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="cf-section" id="getting-started">
      <div class="cf-container" data-motion="reveal">
        <header class="cf-section-heading">
          <span>开始使用</span>
          <h2>按顺序完成接入</h2>
          <p>依次完成令牌、客户端和验证三项配置，每一步都可在对应文档中核对。</p>
        </header>
        <div class="cf-step-grid">
          <article>
            <div class="cf-step-number">01</div>
            <h3>创建 API 令牌</h3>
            <p>进入控制台令牌管理，为当前软件创建独立令牌并设置费用上限。</p>
            <a :href="withBase('/guide/quick-start')">查看准备步骤 →</a>
          </article>
          <article>
            <div class="cf-step-number">02</div>
            <h3>填写客户端配置</h3>
            <p>选择正在使用的软件，复制 Base URL、填入令牌并选择正确模型。</p>
            <a href="#software-guides">选择软件教程 →</a>
          </article>
          <article>
            <div class="cf-step-number">03</div>
            <h3>发送请求验证</h3>
            <p>发送一条简单消息，并在使用日志中确认模型、Token 与费用记录。</p>
            <a :href="withBase('/guide/quick-start')">查看验证方法 →</a>
          </article>
        </div>
      </div>
    </section>

    <section class="cf-section cf-client-section" id="software-guides">
      <div class="cf-container" data-motion="reveal">
        <header class="cf-section-heading">
          <span>客户端配置</span>
          <h2>选择正在使用的客户端</h2>
          <p>每个客户端都有独立配置说明，可直接进入对应文档。</p>
        </header>
        <ToolGrid />
      </div>
    </section>

    <section class="cf-section">
      <div class="cf-container" data-motion="reveal">
        <header class="cf-section-heading">
          <span>接入参数</span>
          <h2>准备接口地址与令牌</h2>
          <p>两条线路共用账号、令牌和余额，可根据网络情况选择。</p>
        </header>
        <div class="cf-setup-grid">
          <article class="cf-token-card">
            <div class="cf-card-label">API TOKEN</div>
            <code>sk-••••••••••••</code>
            <h3>每个软件单独创建一个令牌</h3>
            <p>按软件命名更容易核对用量，也能设置独立费用限制。令牌只在创建时完整显示一次。</p>
            <a :href="withBase('/guide/access#api-令牌')">查看令牌说明 →</a>
          </article>
          <article class="cf-url-card">
            <div class="cf-card-label">BASE URL</div>
            <EndpointCopy />
            <div class="cf-v1-warning"><b>/v1 规则：</b>Claude Code、Cherry Studio、OpenClaw 不带；Cursor、Kilo Code、OpenCode、Codex 需要带。</div>
          </article>
        </div>
      </div>
    </section>

    <section class="cf-section cf-section-alt">
      <div class="cf-container" data-motion="reveal">
        <header class="cf-section-heading">
          <span>常见问题</span>
          <h2>从常见原因开始排查</h2>
          <p>接口地址、令牌、分组或模型不匹配，是最常见的接入问题。</p>
        </header>
        <HomeHelp />
      </div>
    </section>

    <section class="cf-cta">
      <div class="cf-container cf-cta-inner" data-motion="reveal">
        <div>
          <span>继续配置</span>
          <h2>从与你使用的客户端开始</h2>
          <p>文档中的令牌均为占位符，请替换为控制台创建的真实令牌。</p>
        </div>
        <div class="cf-actions">
          <a class="cf-button cf-button-primary" :href="withBase('/tools/')">查看全部软件</a>
          <a class="cf-button cf-button-secondary" href="https://codeflow.asia/">打开 CodeFlow 官网 ↗</a>
        </div>
      </div>
    </section>
  </main>
</template>
