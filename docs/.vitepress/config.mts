import { defineConfig } from 'vitepress'

const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CodeFlow 文档',
  description: 'CodeFlow API 的 AI 编程工具与客户端配置指南',
  appearance: 'force-dark',
  base,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0d0d0d' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
    ['link', { rel: 'icon', href: `${base}logo.svg`, type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: { src: '/logo-dark.svg', alt: 'CodeFlow' },
    siteTitle: 'CodeFlow 文档',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/quick-start' },
      { text: '软件教程', items: [
        { text: '全部软件', link: '/tools/' },
        { text: 'Claude Code', link: '/tools/claude-code' },
        { text: 'Codex', link: '/tools/codex' },
        { text: 'Cursor-Pro', link: '/tools/cursor' },
        { text: 'Cursor-NoPro', link: '/tools/cursor-nopro' },
        { text: 'CC Switch', link: '/tools/cc-switch' }
      ] },
      { text: 'CodeFlow CLI', link: '/guide/codeflow-cli' }
    ],
    sidebar: [
      { text: '开始使用', items: [
        { text: '快速接入流程', link: '/guide/quick-start' },
        { text: '接入前置', link: '/guide/access' },
        { text: '模型与计费', link: '/guide/models-and-billing' }
      ] },
      { text: '软件教程', collapsed: false, items: [
        { text: '全部软件', link: '/tools/' },
        { text: 'Claude Code', link: '/tools/claude-code' },
        { text: 'Codex CLI 与 Desktop', link: '/tools/codex' },
        { text: 'Cursor-Pro', link: '/tools/cursor' },
        { text: 'Cursor-NoPro', link: '/tools/cursor-nopro' },
        { text: 'CC Switch', link: '/tools/cc-switch' },
        { text: 'Cherry Studio', link: '/tools/cherry-studio' },
        { text: 'Kilo Code', link: '/tools/kilo-code' },
        { text: 'OpenCode', link: '/tools/opencode' },
        { text: 'OpenClaw', link: '/tools/openclaw' }
      ] },
      { text: '更多', items: [
        { text: 'CodeFlow 命令行工具', link: '/guide/codeflow-cli' },
        { text: '控制台与支持', link: '/guide/console' }
      ] }
    ],
    search: {
      provider: 'local',
      options: { detailedView: true, translations: {
        button: { buttonText: '搜索或选择教程', buttonAriaLabel: '搜索或选择教程' },
        modal: {
          displayDetails: '显示详细结果',
          backButtonTitle: '关闭搜索',
          noResultsText: '没有找到相关内容',
          resetButtonTitle: '清除查询',
          footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
        }
      } }
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    footer: {
      message: 'CodeFlow API 客户端配置与故障排查文档。',
      copyright: 'CodeFlow 文档'
    }
  }
})


