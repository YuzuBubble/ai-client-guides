<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ImageLightbox from './ImageLightbox.vue'
import UiEnhancements from './UiEnhancements.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <a
        class="cf-console-action cf-console-action-desktop"
        href="https://codeflow.asia/dashboard"
        target="_blank"
        rel="noreferrer"
      >
        进入控制台
      </a>
    </template>
    <template #nav-screen-content-after>
      <a
        class="cf-console-action cf-console-action-mobile"
        href="https://codeflow.asia/dashboard"
        target="_blank"
        rel="noreferrer"
      >
        进入控制台
      </a>
    </template>
    <template #layout-bottom>
      <ImageLightbox />
      <UiEnhancements />
    </template>
  </Layout>
</template>
