<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.mts'

const props = defineProps<{
  category?: string
  showFilters?: boolean
}>()

const selectedCategory = ref<string>(props.category || 'all')
const selectedTag = ref<string>('')

const categoryLabels: Record<string, string> = {
  all: '全部',
  kubernetes: 'Kubernetes',
  network: '網路工程',
  infra: 'Infra & Linux',
  framework: 'Java & 框架',
  algorithm: '演算法',
  ml: '機器學習',
  project: 'Project',
  blog: '技術隨筆',
  life: '戶外生活'
}

const availableTags = computed(() => {
  const tagMap = new Map<string, number>()
  const base = props.category
    ? posts.filter((p) => p.category === props.category)
    : posts
  for (const post of base) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    }
  }
  return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1])
})

const filteredPosts = computed(() => {
  return posts.filter((post) => {
    const catMatch =
      selectedCategory.value === 'all' || post.category === selectedCategory.value
    const tagMatch =
      !selectedTag.value || post.tags.includes(selectedTag.value)
    return catMatch && tagMatch
  })
})

function toggleTag(tag: string) {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}
</script>

<template>
  <div class="post-list-wrapper">
    <div v-if="showFilters && !category" class="filter-bar">
      <button
        v-for="(label, key) in categoryLabels"
        :key="key"
        type="button"
        class="filter-btn"
        :class="{ active: selectedCategory === key }"
        @click="selectedCategory = key"
      >
        {{ label }}
      </button>
    </div>

    <div v-if="showFilters && availableTags.length > 0" class="tag-cloud">
      <button
        v-for="[tag, count] in availableTags"
        :key="tag"
        type="button"
        class="tag-pill"
        :class="{ active: selectedTag === tag }"
        @click="toggleTag(tag)"
      >
        #{{ tag }} <span class="tag-count">{{ count }}</span>
      </button>
    </div>

    <p class="post-count">共 {{ filteredPosts.length }} 篇文章</p>

    <ul class="post-list">
      <li v-for="post in filteredPosts" :key="post.url" class="post-item">
        <a :href="withBase(post.url)" class="post-link">
          <span class="post-date">{{ post.date.string }}</span>
          <span class="post-title">{{ post.title }}</span>
        </a>
        <div v-if="post.tags.length > 0" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">
            #{{ tag }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.post-list-wrapper {
  margin-top: 1rem;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.tag-pill {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-pill:hover,
.tag-pill.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.tag-count {
  opacity: 0.7;
  font-size: 0.75rem;
}

.post-count {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-link {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  text-decoration: none;
}

.post-date {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  min-width: 6rem;
}

.post-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}

.post-link:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.35rem;
  padding-left: 6.75rem;
}

.post-tag {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .post-tags {
    padding-left: 0;
  }
}
</style>

