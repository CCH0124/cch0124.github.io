import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  category: string
  tags: string[]
  description?: string
}

declare const data: Post[]
export { data }

export default createContentLoader('{algorithm,blog,framework,infra,kubernetes,life,ml,network,project}/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ url, frontmatter }) => {
        if (frontmatter.draft === true) return false
        // Exclude section index pages
        return !url.endsWith('/') && !url.endsWith('/index.html')
      })
      .map(({ url, frontmatter }) => {
        const parts = url.split('/').filter(Boolean)
        const category = parts[0] || 'blog'
        const rawDate = frontmatter.date
        return {
          title: frontmatter.title || url,
          url,
          date: formatDate(rawDate),
          category,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          description: frontmatter.description || ''
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string | Date | undefined): Post['date'] {
  if (!raw) {
    return { time: 0, string: '' }
  }
  const date = raw instanceof Date ? raw : new Date(raw)
  if (Number.isNaN(date.getTime())) {
    return { time: 0, string: String(raw) }
  }
  return {
    time: +date,
    string: date.toISOString().slice(0, 10)
  }
}

