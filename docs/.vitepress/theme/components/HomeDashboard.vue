<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.mts'

const recentPosts = computed(() => posts.slice(0, 8))

const categories = computed(() => {
  const defs = [
    { key: 'kubernetes', label: 'Kubernetes', desc: 'IT 鐵人賽與 K8s 安全、RBAC 實戰', icon: '☸️' },
    { key: 'network', label: 'Network', desc: 'Router、Switch、VLAN、NAT 與 Wireshark', icon: '🌐' },
    { key: 'infra', label: 'Infra & Linux', desc: 'Linux 維運、Docker、LVM 與系統工具', icon: '🐧' },
    { key: 'framework', label: 'Framework', desc: 'Spring Boot、Security、JPA 與 Camel', icon: '☕' },
    { key: 'algorithm', label: 'Algorithm', desc: 'LeetCode 解題與資料結構筆記', icon: '🧩' },
    { key: 'ml', label: 'ML 機器學習', desc: '分群演算法與資料科學學習歷程', icon: '🤖' },
    { key: 'project', label: 'Lab & Practice', desc: '企業服務架設、ELK 日誌與資安演練紀錄', icon: '🛠️' },
    { key: 'blog', label: 'Blog 隨筆', desc: 'Flutter 實驗與跨領域技術雜記', icon: '📝' },
    { key: 'life', label: 'Life 戶外', desc: '露營、戶外活動與生活攝影', icon: '⛺' }
  ]
  return defs.map((d) => ({
    ...d,
    count: posts.filter((p) => p.category === d.key).length
  }))
})
</script>

<template>
  <div class="dashboard-container">
    <!-- Left Column: Profile & Infra Identity -->
    <aside class="profile-column">
      <div class="profile-card">
        <div class="profile-header">
          <img :src="withBase('/images/cch.jpg')" alt="Kevin Chen" class="avatar" />
          <div class="profile-titles">
            <h1 class="name">Kevin Chen</h1>
            <p class="role">Infra Engineer · Outdoor Lover</p>
            <p class="location">📍 Taiwan · ♒ Aquarius</p>
          </div>
        </div>

        <p class="bio">
          時間帶走記憶，我將一切變成回憶。觸及 Linux、Network、Kubernetes、Java 等領域，持續在系統架構與戶外山林之間保持學習與探索。
        </p>

        <div class="profile-links">
          <a href="https://github.com/CCH0124" target="_blank" rel="noreferrer" class="pill-link">GitHub</a>
          <a href="https://www.linkedin.com/in/kevinchen0124" target="_blank" rel="noreferrer" class="pill-link">LinkedIn</a>
          <a :href="withBase('/resume')" class="pill-link">Resume</a>
          <a :href="withBase('/archive')" class="pill-link primary">Archive ({{ posts.length }})</a>
        </div>

        <div class="info-block">
          <h3>📚 Publication</h3>
          <a
            href="https://ithelp.ithome.com.tw/users/20104688/ironman/3727"
            target="_blank"
            rel="noreferrer"
            class="thesis-link"
          >
            2020 IT 鐵人賽：Kubernetes Learning ↗
          </a>
        </div>
      </div>
    </aside>

    <!-- Right Column: Categories & Latest Posts -->
    <main class="feed-column">
      <section class="section-block">
        <div class="section-header">
          <h2>🧭 知識領域</h2>
        </div>
        <div class="category-grid">
          <a
            v-for="cat in categories"
            :key="cat.key"
            :href="withBase(`/${cat.key}/`)"
            class="category-card"
          >
            <div class="cat-top">
              <span class="cat-icon">{{ cat.icon }}</span>
              <span class="cat-count">{{ cat.count }} 篇</span>
            </div>
            <div class="cat-title">{{ cat.label }}</div>
            <div class="cat-desc">{{ cat.desc }}</div>
          </a>
        </div>
      </section>

      <section class="section-block">
        <div class="section-header">
          <h2>📝 最新文章</h2>
          <a :href="withBase('/archive')" class="more-link">查看全部 →</a>
        </div>

        <div class="recent-list">
          <a
            v-for="post in recentPosts"
            :key="post.url"
            :href="withBase(post.url)"
            class="recent-item"
          >
            <div class="recent-meta">
              <span class="recent-date">{{ post.date.string }}</span>
              <span class="recent-cat">{{ post.category }}</span>
            </div>
            <div class="recent-title">{{ post.title }}</div>
            <div v-if="post.tags.length > 0" class="recent-tags">
              <span v-for="tag in post.tags.slice(0, 4)" :key="tag" class="recent-tag">
                #{{ tag }}
              </span>
            </div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 2rem;
  align-items: start;
}

.profile-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand-1);
}

.name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.25;
}

.role {
  margin: 0.2rem 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.location {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.bio {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0.75rem 0 1.25rem;
}

.profile-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.pill-link {
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.pill-link:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.pill-link.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.pill-link.primary:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}

.info-block {
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
}

.info-block h3 {
  margin: 0 0 0.45rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.info-block p {
  margin: 0.2rem 0;
}

.muted {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.sub-text {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.thesis-link {
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.82rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  line-height: 1.45;
}

.thesis-link:hover {
  text-decoration: underline;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 5px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

/* Right Column */
.section-block + .section-block {
  margin-top: 2.25rem;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.more-link {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.more-link:hover {
  text-decoration: underline;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 0.85rem;
}

.category-card {
  display: block;
  padding: 1rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
}

.category-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.cat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cat-icon {
  font-size: 1.35rem;
}

.cat-count {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.cat-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.cat-desc {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recent-item {
  display: block;
  padding: 1rem 1.15rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: border-color 0.2s;
}

.recent-item:hover {
  border-color: var(--vp-c-brand-1);
}

.recent-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.35rem;
}

.recent-date {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.recent-cat {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.recent-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.recent-item:hover .recent-title {
  color: var(--vp-c-brand-1);
}

.recent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.45rem;
}

.recent-tag {
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 900px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }
}
</style>

