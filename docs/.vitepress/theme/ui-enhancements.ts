import { withBase } from 'vitepress'

type TutorialPage = {
  name: string
  desc: string
  href: string
  icon?: string
  mark?: string
}

type TutorialGroup = {
  title: string
  pages: TutorialPage[]
}

type EnhancementState = {
  installed: boolean
  observer?: MutationObserver
  scheduled: boolean
  retryToken: number
}

const groups: TutorialGroup[] = [
  {
    title: '开始使用',
    pages: [
      { name: '快速接入流程', desc: '注册、充值、令牌与验证', href: '/guide/quick-start', mark: '01' },
      { name: '接入前置', desc: 'Base URL、令牌与分组', href: '/guide/access', mark: '02' },
      { name: '模型与计费', desc: '模型选择、预扣和缓存', href: '/guide/models-and-billing', mark: '03' }
    ]
  },
  {
    title: '软件教程',
    pages: [
      { name: 'Claude Code', desc: '命令行 AI 编程助手', href: '/tools/claude-code', icon: 'claude-code.png' },
      { name: 'Codex', desc: 'CLI 与 Desktop', href: '/tools/codex', icon: 'codex.svg' },
      { name: 'Cursor-Pro', desc: '使用原生 BYOK 配置入口', href: '/tools/cursor', icon: 'cursor.svg' },
      { name: 'Cursor-NoPro', desc: '通过本地网关接入模型', href: '/tools/cursor-nopro', icon: 'cursor.svg' },
      { name: 'CC Switch', desc: '供应商快速切换', href: '/tools/cc-switch', icon: 'cc-switch.png' },
      { name: 'Cherry Studio', desc: '桌面多模型客户端', href: '/tools/cherry-studio', icon: 'cherry-studio.png' },
      { name: 'Kilo Code', desc: 'VS Code 插件', href: '/tools/kilo-code', icon: 'kilo-code.svg' },
      { name: 'OpenCode', desc: '终端编程助手', href: '/tools/opencode', icon: 'opencode.svg' },
      { name: 'OpenClaw', desc: '本地智能体与网关', href: '/tools/openclaw', icon: 'openclaw.svg' }
    ]
  }
]

const stateKey = '__codeflowUiEnhancements__'

function getState(): EnhancementState {
  const host = window as typeof window & Record<string, EnhancementState | undefined>
  return host[stateKey] ??= { installed: false, scheduled: false, retryToken: 0 }
}

function closeSearch(container: Element) {
  const box = container.closest('.VPLocalSearchBox') ?? container
  const back = box.querySelector<HTMLButtonElement>('.back-button')
  if (back) {
    setTimeout(() => back.click(), 0)
    return
  }

  const backdrop = box.querySelector<HTMLElement>('.backdrop')
  if (backdrop) setTimeout(() => backdrop.click(), 0)
}

function createPickerIcon(page: TutorialPage) {
  const wrapper = document.createElement('span')
  wrapper.className = 'search-picker-icon'

  if (page.icon) {
    const image = document.createElement('img')
    image.src = withBase(`/tool-icons/${page.icon}`)
    image.alt = ''
    wrapper.appendChild(image)
  } else {
    const mark = document.createElement('b')
    mark.textContent = page.mark ?? ''
    wrapper.appendChild(mark)
  }

  return wrapper
}

function createPagePicker(input: HTMLInputElement) {
  const box = input.closest('.VPLocalSearchBox')
  const form = input.closest('form') ?? box?.querySelector('.search-bar')
  const container = input.closest('.shell') ?? form?.parentElement ?? box
  if (!form || !container) return false

  const existing = container.querySelector<HTMLElement>('[data-codeflow-search-picker], .search-page-picker')
  if (existing) {
    existing.dataset.codeflowSearchPicker = 'true'
    input.placeholder = '搜索标题、配置项，或直接选择教程'
    existing.hidden = input.value.trim().length > 0
    return true
  }

  input.placeholder = '搜索标题、配置项，或直接选择教程'
  const picker = document.createElement('div')
  picker.className = 'search-page-picker'
  picker.dataset.codeflowSearchPicker = 'true'

  const heading = document.createElement('div')
  heading.className = 'search-picker-heading'
  const headingTitle = document.createElement('strong')
  headingTitle.textContent = '直接选择教程'
  const headingHint = document.createElement('span')
  headingHint.textContent = '也可以在上方输入关键词搜索'
  heading.append(headingTitle, headingHint)
  picker.appendChild(heading)

  for (const group of groups) {
    const section = document.createElement('section')
    section.className = 'search-picker-group'
    const title = document.createElement('p')
    title.textContent = group.title
    section.appendChild(title)

    const grid = document.createElement('div')
    grid.className = 'search-picker-grid'

    for (const page of group.pages) {
      const link = document.createElement('a')
      link.href = withBase(page.href)
      link.className = 'search-picker-link'
      link.appendChild(createPickerIcon(page))

      const copy = document.createElement('span')
      const name = document.createElement('strong')
      name.textContent = page.name
      const desc = document.createElement('small')
      desc.textContent = page.desc
      copy.append(name, desc)

      const arrow = document.createElement('i')
      arrow.textContent = '→'
      link.append(copy, arrow)
      link.addEventListener('click', () => closeSearch(container))
      grid.appendChild(link)
    }

    section.appendChild(grid)
    picker.appendChild(section)
  }

  form.insertAdjacentElement('afterend', picker)
  const update = () => {
    picker.hidden = input.value.trim().length > 0
  }
  input.addEventListener('input', update)
  input.addEventListener('search', update)
  update()
  return true
}

function enhanceSearch() {
  const inputs = document.querySelectorAll<HTMLInputElement>('#localsearch-input, .VPLocalSearchBox input[type="search"]')
  let mounted = false
  inputs.forEach((input) => {
    mounted = createPagePicker(input) || mounted
  })
  return mounted
}

function enhanceOutline() {
  document.querySelectorAll<HTMLElement>('.VPDocAsideOutline .outline-title').forEach((title) => {
    if (title.dataset.topEnhanced === 'true' && title.querySelector('.outline-top-button')) return

    title.dataset.topEnhanced = 'true'
    title.textContent = ''
    const button = document.createElement('a')
    button.href = '#VPContent'
    button.className = 'outline-top-button'
    button.title = '返回本页顶部'
    button.setAttribute('aria-label', '返回本页顶部')

    const label = document.createElement('span')
    label.textContent = '本页目录'
    const arrow = document.createElement('i')
    arrow.textContent = '↑'
    button.append(label, arrow)
    title.appendChild(button)
  })
}

function enhance() {
  const searchMounted = enhanceSearch()
  enhanceOutline()
  return searchMounted
}

function goToDocumentTop() {
  try {
    history.replaceState(history.state, '', location.pathname + location.search)
  } catch {}

  const root = document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'

  const reset = () => {
    window.scrollTo(0, 0)
    root.scrollTop = 0
    document.body.scrollTop = 0
  }

  reset()
  requestAnimationFrame(() => {
    reset()
    requestAnimationFrame(() => {
      reset()
      root.style.scrollBehavior = previousScrollBehavior
    })
  })
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  const topButton = target?.closest?.('.outline-top-button')
  if (topButton) {
    event.preventDefault()
    goToDocumentTop()
    return
  }

  if (target?.closest?.('.DocSearch-Button')) enhanceSearchEventually()
}

function onSearchShortcut(event: KeyboardEvent) {
  if (event.key === '/' || (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey))) {
    enhanceSearchEventually()
  }
}

function enhanceSearchEventually() {
  const state = getState()
  const token = ++state.retryToken
  let attempt = 0

  const run = () => {
    if (token !== state.retryToken) return
    const mounted = enhance()
    if (!mounted && attempt++ < 20) window.setTimeout(run, 75)
  }

  window.setTimeout(run, 0)
}

function scheduleEnhance() {
  const state = getState()
  if (state.scheduled) return
  state.scheduled = true
  requestAnimationFrame(() => {
    state.scheduled = false
    enhance()
  })
}

function startObserver() {
  const state = getState()
  if (state.observer || !document.documentElement) return
  state.observer = new MutationObserver(scheduleEnhance)
  state.observer.observe(document.documentElement, { childList: true, subtree: true })
  scheduleEnhance()
}

export function installUiEnhancements() {
  if (typeof window === 'undefined') return
  const state = getState()
  if (state.installed) {
    scheduleEnhance()
    return
  }

  state.installed = true
  try {
    localStorage.setItem('vitepress:local-search-detailed-list', 'true')
  } catch {}

  document.addEventListener('click', onDocumentClick, true)
  window.addEventListener('keydown', onSearchShortcut)
  window.addEventListener('pageshow', scheduleEnhance)
  window.addEventListener('load', scheduleEnhance)

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver, { once: true })
  } else {
    startObserver()
  }

  enhanceSearchEventually()
}
