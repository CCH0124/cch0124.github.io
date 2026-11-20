import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

interface SidebarItem {
  text: string
  link: string
  date: string
}

function getSectionSidebar(section: string, ascending = false): SidebarItem[] {
  const dir = path.resolve(__dirname, '..', section)
  if (!fs.existsSync(dir)) return []

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md' && f !== '_index.md')

  const items: SidebarItem[] = []
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8')
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    let title = file.replace(/\.md$/, '')
    let date = ''
    let isDraft = false

    if (fmMatch) {
      const fm = fmMatch[1]
      const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)
      if (titleMatch) title = titleMatch[1]
      const dateMatch = fm.match(/^date:\s*["']?(.+?)["']?\s*$/m)
      if (dateMatch) date = dateMatch[1]
      const draftMatch = fm.match(/^draft:\s*true\s*$/m)
      if (draftMatch) isDraft = true
    }

    if (isDraft) continue

    items.push({
      text: title,
      link: `/${section}/${file.replace(/\.md$/, '')}`,
      date: date || file.slice(0, 10)
    })
  }

  items.sort((a, b) =>
    ascending ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  )

  return items
}

export default defineConfig({
  title: 'Kevin Blog',
  description: 'Kevin learning — Linux, Network, Kubernetes, Java, Spring Boot',
  lang: 'zh-TW',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    siteTitle: 'Kevin Blog',
    logo: '/images/cch.jpg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archive', link: '/archive' },
      {
        text: 'Infra & Network',
        items: [
          { text: 'Kubernetes', link: '/kubernetes/' },
          { text: 'Network', link: '/network/' },
          { text: 'Infra & Linux', link: '/infra/' },
          { text: 'Lab & Practice', link: '/project/' }
        ]
      },
      {
        text: 'Dev & Notes',
        items: [
          { text: 'Framework', link: '/framework/' },
          { text: 'Algorithm', link: '/algorithm/' },
          { text: 'Machine Learning', link: '/ml/' },
          { text: 'Blog', link: '/blog/' }
        ]
      },
      { text: 'Life', link: '/life/' },
      { text: 'Resume', link: '/resume' }
    ],

    sidebar: {
      '/kubernetes/': [
        {
          text: 'Kubernetes 學習筆記',
          items: getSectionSidebar('kubernetes', true)
        }
      ],
      '/network/': [
        {
          text: 'Network 網路工程',
          items: getSectionSidebar('network')
        }
      ],
      '/infra/': [
        {
          text: 'Infra & Linux 維運',
          items: getSectionSidebar('infra')
        }
      ],
      '/framework/': [
        {
          text: 'Framework & Java 框架',
          items: getSectionSidebar('framework')
        }
      ],
      '/algorithm/': [
        {
          text: 'Algorithm 演算法',
          items: getSectionSidebar('algorithm')
        }
      ],
      '/ml/': [
        {
          text: 'ML 機器學習',
          items: getSectionSidebar('ml')
        }
      ],
      '/project/': [
        {
          text: 'Lab & Practice 實戰演練',
          items: getSectionSidebar('project')
        }
      ],
      '/blog/': [
        {
          text: 'Blog 技術隨筆',
          items: getSectionSidebar('blog')
        }
      ],
      '/life/': [
        {
          text: 'Life 戶外生活',
          items: getSectionSidebar('life')
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CCH0124' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kevinchen0124' }
    ],

    outline: {
      level: [2, 3],
      label: '本頁目錄'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © Kevin Chen'
    }
  }
})

