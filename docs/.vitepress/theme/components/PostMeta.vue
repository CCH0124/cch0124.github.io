<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const categoryMap: Record<string, string> = {
  kubernetes: 'Kubernetes',
  network: 'Network',
  infra: 'Infra & Linux',
  framework: 'Framework',
  algorithm: 'Algorithm',
  ml: 'ML',
  project: 'Project',
  blog: 'Blog',
  life: 'Life'
}

const isPost = computed(() => {
  const path = route.path.replace(/^\//, '')
  const firstSegment = path.split('/')[0]
  if (!categoryMap[firstSegment]) return false
  // Exclude section index pages like /blog/ or /blog/index.html
  const rest = path.slice(firstSegment.length).replace(/^\/|\/$/g, '')
  return rest.length > 0 && rest !== 'index.html'
})

const categoryLabel = computed(() => {
  const firstSegment = route.path.replace(/^\//, '').split('/')[0]
  return categoryMap[firstSegment] || ''
})

const formattedDate = computed(() => {
  const raw = frontmatter.value.date
  if (!raw) return ''
  const d = raw instanceof Date ? raw : new Date(raw)
  if (Number.isNaN(d.getTime())) return String(raw)
  return d.toISOString().slice(0, 10)
})

const tags = computed<string[]>(() => {
  return Array.isArray(frontmatter.value.tags) ? frontmatter.value.tags : []
})
</script>

<template>
  <div v-if="isPost && (formattedDate || tags.length > 0)" class="post-meta-bar">
    <span v-if="categoryLabel" class="meta-category">{{ categoryLabel }}</span>
    <span v-if="formattedDate" class="meta-date">{{ formattedDate }}</span>
    <div v-if="tags.length > 0" class="meta-tags">
      <span v-for="tag in tags" :key="tag" class="meta-tag">#{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.post-meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px dashed var(--vp-c-divider);
  font-size: 0.875rem;
}

.meta-category {
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.8rem;
}

.meta-date {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.meta-tag {
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-divider);
}
</style>

