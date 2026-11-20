<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PostMeta from './components/PostMeta.vue'

const { Layout } = DefaultTheme
const zoomedSrc = ref<string | null>(null)

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (target && target.tagName === 'IMG' && target.closest('.vp-doc')) {
    zoomedSrc.value = (target as HTMLImageElement).src
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    zoomedSrc.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <PostMeta />
    </template>
  </Layout>

  <Teleport to="body">
    <div
      v-if="zoomedSrc"
      class="vp-image-zoom-overlay"
      @click="zoomedSrc = null"
    >
      <img :src="zoomedSrc" alt="Zoomed image" />
    </div>
  </Teleport>
</template>

