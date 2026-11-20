<script setup lang="ts">
import { withBase } from 'vitepress'

interface Highlight {
  value: string
  label: string
}

interface SubRole {
  role: string
  period: string
  bullets: string[]
}

interface Experience {
  role: string
  company: string
  period: string
  location?: string
  bullets?: string[]
  subRoles?: SubRole[]
}

interface Project {
  name: string
  role: string
  tech: string[]
  status?: 'pending'
  summary?: string
  groups?: {
    title: string
    items: string[]
  }[]
  bullets?: string[]
}

interface Certification {
  name: string
  issuer: string
  id: string
  expiry: string
  active: boolean
}

interface SkillGroup {
  category: string
  items: string[]
}

interface CommunityLink {
  label: string
  href: string
}

interface CommunityItem {
  tag: string
  title: string
  desc: string
  links?: CommunityLink[]
}

const profile = {
  name: 'Chi-Hong Chen (Kevin)',
  role: 'Backend Engineer · Cloud-Native & Infra',
  location: 'Kaohsiung City, Taiwan',
  summary:
    '4+ 年後端開發與雲原生基礎設施實戰經驗，專注於 Quarkus / Spring Boot 微服務架構、Apache Camel 系統整合、Kubernetes GitOps (ArgoCD / Helm) 與自動化 CI/CD 流水線建置。',
  avatar: '/images/cch.jpg',
  links: [
    { label: 'GitHub', href: 'https://github.com/CCH0124', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kevinchen0124', external: true },
  ]
}

const highlights: Highlight[] = [
  { value: '4+ 年', label: 'Backend & Cloud-Native' },
  { value: '10+ 微服務', label: 'K8s / GitOps 平台維運' },
  { value: 'CKS/CKA', label: 'K8s 認證' },
  { value: 'CNCF TW', label: 'Labs 協同貢獻者' }
]

const experiences: Experience[] = [
  {
    role: 'RD → SRE → RD → Infra / Platform Engineer',
    company: '緯創資通股份有限公司 (Wistron)',
    period: '2021/01 - Present',
    subRoles: [
      {
        role: 'Infra / Platform Engineer（GPU Lab & Network）',
        period: '2025/09 - Present',
        bullets: [
          '基礎設施與高速網路統籌：負責 AI/GPU Lab 機房架構規劃，涵蓋 DPU 安裝配置與 InfiniBand 高速運算網路管理，確保多團隊開發與運算環境的隔離性與穩定度',
          '算力資源池化管理：建立 10+ CPU 節點 Proxmox 虛擬化資源池與 5+ 台 Bare Metal GPU 叢集維運標準，支撐研發團隊彈性算力需求',
          '主動監控與維運體系：建立全機房可觀測性與 Teams 即時告警機制，縮短硬體與網路異常排查時間'
        ]
      },
      {
        role: 'RD Engineer（Backend & DevOps）',
        period: '2024/10 - 2025/08',
        bullets: [
          '後端架構重構與 API 開發：主導核心 API 設計與 Python 系統重構，提升多格式解析與事件處理的程式擴充性',
          '工程效率與 CI/CD 標準化：推動 Dockerfile 瘦身與 GitLab CI Template 統一規範，Image 減少 7GB（70% 空間）、建置縮短 4–5 分鐘，整體節省 66% 建置與維護時間'
        ]
      },
      {
        role: 'SRE Engineer',
        period: '2023/12 - 2024/08',
        bullets: [
          '雲端平台治理：管理單位 Azure 雲端資源與 AKS 叢集架構，確保多專案環境穩定運行',
          '跨團隊 GitOps 賦能：協助開發團隊優化 Helm Chart 與 Argo CD 部署規範，提升跨專案發佈一致性',
          '跨部門資安自動化：與 Security Team 協作導入 AI 異常登入判別機制（70% 準確度），強化帳號安全防護'
        ]
      },
      {
        role: 'RD Engineer（Backend & IoT Integration）',
        period: '2021/01 - 2023/11',
        bullets: [
          '微服務與品質體系建置：基於 Quarkus、Spring Boot 與 FastAPI 開發 10+ 微服務，並建立容器化整合測試與品質左移規範',
          '異質系統與雲原生平台落地：主導 Apache Camel 第三方整合、AWS/EMQX 物聯網架構、ArgoCD GitOps 平台化與 Vault 零信任機密治理'
        ]
      }
    ]
  },
  {
    role: 'Linux 系統管理者',
    company: '國立高雄科技大學電子工程系實驗室',
    period: '2018/08 - 2020/08',
    bullets: [
      '負責實驗室 Linux 伺服器日常維運與 SSH 權限安全管理',
      '建置 NFS 環境並搭配 rsync 實作自動化備份檔案存放機制'
    ]
  },
  {
    role: '實習工程師',
    company: '百通科技股份有限公司',
    period: '2017/09 - 2018/08',
    bullets: [
      '負責企業網路架構規劃與伺服器虛擬化管理（VMware ESXi）',
      '研究並建置 ELK Stack（Elasticsearch / Logstash / Kibana）進行日誌集中化分析'
    ]
  }
]

const projects: Project[] = [
  {
    name: '[Wistron] Lab 機房與高速網路建置',
    role: 'Infra / Platform 階段 · 基礎設施與網路架構（2025/09 - Present）',
    tech: ['Proxmox', 'NVIDIA Switch', 'InfiniBand', 'DPU', 'Cumulus OS', 'BGP / VRF / VLAN', 'FortiGate', 'Prometheus', 'Grafana'],
    bullets: [
      '設計與落地 Lab 機房高速網路拓樸：透過 NVIDIA SN3700（Cumulus OS）與 FortiGate 防火牆，運用 VLAN、VRF 與 BGP 協定隔離管理網路與 QM9700 InfiniBand 運算網路，並完成 DPU 安裝配置與 InfiniBand 網路管理',
      '於 10+ CPU 節點建置 Proxmox 虛擬化叢集，提供團隊彈性、可隔離的開發資源調度，並負責 5+ 台 Bare Metal GPU Server 的管理與維運',
      '導入 Prometheus + Grafana 監控架構並整合 Microsoft Teams 即時告警，持續追蹤 LAB 網路流量、Bare Metal 溫度與節點資源指標，強化異常排查效率'
    ]
  },
  {
    name: '[Wistron] Backend & CI/CD 效能優化專案',
    role: 'RD 階段 · 後端工程師（2024/10 - 2025/08）',
    tech: ['Python', 'Design Patterns', 'Docker', 'GitLab CI Template', 'REST API'],
    bullets: [
      '負責系統核心 API 開發與重構',
      '運用 Python 策略模式（Strategy）處理多樣化檔案解析邏輯，並以裝飾器模式（Decorator）解耦不同事件類別處理流程',
      '進行 Dockerfile 深度優化：Image 體積減少 7GB（降低 70% 儲存空間），加速映像檔傳輸與部署，每次 pipeline 建置時間減少約 4–5 分鐘',
      '建立並導入標準化 GitLab CI Template，提升跨專案流水線維護性，整體節省 66% 時間成本'
    ]
  },
  {
    name: '[Wistron] SRE 雲端平台與資安自動化',
    role: 'SRE 階段 · 雲端與平台工程師（2023/12 - 2024/08）',
    tech: ['Azure', 'AKS', 'Kubernetes', 'Helm Charts', 'ArgoCD', 'AI Agent'],
    bullets: [
      '管理團隊與單位 Azure 雲端服務資源，負責 AKS (Azure Kubernetes Service) 叢集維運與服務架構設計',
      '協助專案團隊優化 Helm Chart 結構與 Argo CD GitOps 部署設計，提升交付一致性與維運效率',
      '與 Security Team 協作整合 Azure SME：設計 AI Agent 透過 API 主動擷取對應登入日誌並進行分析，結合 Prompt 調校優化判別邏輯與觸發即時告警，達成 70% 異常登入判別準確度'
    ]
  },
  {
    name: '[Wistron] AIOT Project',
    role: 'RD 階段 · 後端工程師與維運（2021/01 - 2023/11）',
    tech: [
      'Quarkus',
      'Spring Boot',
      'PostgreSQL',
      'Camel',
      'Kubernetes',
      'Helm Charts',
      'ArgoCD',
      'Vault',
      'CSI',
      'AWS'
    ],
    groups: [
      {
        title: '後端開發與系統整合',
        items: [
          '基於 Spring Boot / Quarkus 開發裝置管理與影像串流存取 API，並引入 OpenAPI 規範',
          '導入 Apache Camel 框架加速整合雲端與 MQTT 應用，撰寫單元測試與整合測試',
          '實作 JWT 搭配 RSA Signature 使用者授權機制，並加入 Metric 與 Health Check 提升服務可觀測性'
        ]
      },
      {
        title: '雲端架構與機密治理',
        items: [
          '設計 AWS S3 / SQS / Lambda 事件驅動流程管理影像生命週期以節省雲端成本，並以 CloudFront CDN 加速存取',
          '整合 Vault API 與 CSI，集中管理應用程式機密資訊並實現 EMQX 終端裝置憑證自動化簽發'
        ]
      },
      {
        title: 'CI/CD 與 GitOps 平台化',
        items: [
          '設計平行化前後端 CI/CD 流程與 Dockerfile，採用 Jib 取代 Docker-in-Docker 大幅縮短 Image 建置時間',
          '建置 ArgoCD ApplicationSet 與 Multiple Sources 管理第三方 values.yaml',
          '維護 Helm Charts 並整合 helm-docs、kubeconform、Unit Test 與 Security Scan，降低人為佈署失誤'
        ]
      }
    ]
  },
  {
    name: '[Wistron] OTA Project',
    role: 'RD 階段 · 後端工程師與維運（2021/01 - 2023/11）',
    tech: [
      'Quarkus',
      'PostgreSQL',
      'MongoDB',
      'EMQX',
      'Kubernetes',
      'Helm Charts',
      'ArgoCD',
      'Vault',
      'CSI',
      'AWS'
    ],
    bullets: [
      '負責核心業務邏輯 API 開發，並使用樹狀資料結構實作車載裝置 OTA 更新流程',
      '設計 MQTT 通訊協定 Topic 與資料結構，整合車用端裝置開發',
      '建置與管理 EMQX 服務：整合 JWKS 驗證裝置端合法性、應用 Retain / Share Topic，並監控 Topic 與記憶體使用量'
    ]
  },
  {
    name: '[Wistron] Factory Project',
    role: 'RD 階段 · 後端工程師與維運（2021/01 - 2023/11）',
    tech: ['Java', 'REST API', 'FTP'],
    bullets: [
      '開發產線裝置狀態查詢與韌體更新流程 API',
      '整合 FTP 協定建立自動化更新任務與檔案傳輸流程'
    ]
  }
]

const certifications: Certification[] = [
  {
    name: 'CKS: Certified Kubernetes Security Specialist',
    issuer: 'CNCF',
    id: 'LF-qjb53ll575',
    expiry: '2026/09 到期',
    active: false
  },
  {
    name: 'CKA: Certified Kubernetes Administrator',
    issuer: 'The Linux Foundation',
    id: 'LF-83ka4sqzas',
    expiry: '2024/01 到期',
    active: false
  },
  {
    name: 'CCNA',
    issuer: 'Cisco',
    id: '425964170025FMWJ',
    expiry: '2019/08 到期',
    active: false
  }
]

const skillGroups: SkillGroup[] = [
  {
    category: 'Backend & Integration',
    items: ['Java', 'Python', 'Quarkus', 'Spring Boot', 'FastAPI', 'Apache Camel', 'OpenAPI', 'JUnit', 'Testcontainers', 'WireMock']
  },
  {
    category: 'Container & GitOps',
    items: ['Kubernetes', 'Docker', 'Docker Compose', 'Helm Charts', 'ArgoCD', 'GitLab CI/CD', 'Jib']
  },
  {
    category: 'Cloud & Messaging',
    items: ['AWS (S3 / Lambda / SQS / SNS / CDN / EC2)', 'Azure (AKS / Pipeline / ACR)', 'EMQX (MQTT)']
  },
  {
    category: 'Database, Security & Infra',
    items: [
      'PostgreSQL',
      'MongoDB',
      'HashiCorp Vault',
      'Secrets Store CSI',
      'Proxmox',
      'FortiGate',
      'Cumulus OS (BGP/VRF/VLAN)',
      'Prometheus & Grafana',
      'Nginx',
      'Linux',
      'ELK Stack'
    ]
  }
]

const communityItems: CommunityItem[] = [
  {
    tag: 'Open Source',
    title: '[GitHub] camel-paho5 Issue',
    desc: '針對 EMQX JWKS 驗證功能無法被 Camel 原生套件應用的問題，分析原因並提出改善方案。'
  },
  {
    tag: 'Community',
    title: 'Cloud-Native-Taiwan Labs 協同貢獻',
    desc: '撰寫並分享 Vault KV integrates Quarkus、Helm Charts 與 Vault integrate Secrets Store CSI 實作文件。',
    links: [
      { label: 'Vault KV integrates Quarkus', href: 'https://docs.cloudnative.tw/docs/self-paced-labs/vault/' },
      { label: 'Helm Charts', href: 'https://docs.cloudnative.tw/docs/self-paced-labs/quarkus-with-helm-charts/' },
      { label: 'Vault integrate Secrets Store CSI', href: 'https://docs.cloudnative.tw/docs/self-paced-labs/vault-secrets-store-csi-with-quarkus/' },
    ]
  },
  {
    tag: 'Tech Talk',
    title: 'OpenTelemetry 整合 Jaeger 可觀測性分享',
    desc: '解決微服務跨服務呼叫鏈路追蹤問題，介紹 OpenTelemetry 協定整合與 Jaeger 實戰。',
    links: [
      { label: 'OpenTelemetry 整合 Jaeger 可觀測性', href: 'https://docs.google.com/presentation/d/194-NnyEHYW5KN9uQOoo42srhPyAdDwDm/edit?usp=sharing&ouid=113224278566661795476&rtpof=true&sd=true' }
    ]
  },
  {
    tag: 'Study Group',
    title: 'Kubernetes & Helm 技術讀書會',
    desc: '主講 Helm + GitLab CI 實務、Kubernetes ReplicaSet 元件優勢與 YAML 撰寫、Docker Network 原理與 Port 映射。',
    links: [
      { label: 'Helm 分享會', href: 'https://docs.google.com/presentation/d/10Rhn8ICOtOm1ES23k6aesS_paV4KJia8E86_VxyPKqE/edit?usp=sharing' },
      { label: 'Kubernetes 讀書會 - ReplicaSet', href: 'https://docs.google.com/presentation/d/1HKAJqqrUoR3Yq7OVHKzuspXW7ouI4lUT9ocCRn1gL2g/edit?usp=sharing'},
      { label: 'Kubernetes 讀書會 - Docker Network', href: 'https://docs.google.com/presentation/d/1MzOC7ua4jrXBeIZ06tDSKutEedj3elwChgNpHgYnHzk/edit?usp=sharing'},
    ]
  },
  {
    tag: 'Research',
    title: '雲原生技術實驗：KEDA + Kafka / MQTT-EMQX',
    desc: '研究 KEDA 整合 Kafka 動態縮放消費者實例效果，以及 EMQX Retain / Share Topic 等進階特性。',
    links: [
      { label: 'KEDA + Kafka', href: 'https://github.com/CCH0124/DevOps/blob/main/kubernetes-third-party/KEDA.md' },
      { label: 'MQTT - EMQX', href: 'https://github.com/CCH0124/mqtt-with-quarkus' }
    ]
  },
  {
    tag: 'Publication',
    title: '2020 iThome 鐵人賽：Kubernetes 30 Days',
    desc: '連續 30 天系統性整理 Kubernetes 核心架構、物件模型與安全實戰筆記。',
    links: [
      { label: '鐵人賽系列文', href: 'https://ithelp.ithome.com.tw/users/20104688/ironman/3727' }
    ]
  }
]

const education = [
  {
    school: '國立高雄科技大學 (NKUST)',
    degree: '電子工程系資訊組 · 碩士學位',
    period: '2018 - 2020',
    details: [
      {
        label: '碩士論文',
        text: 'Detection of Unknown DDoS Attacks with Deep Learning and Gaussian Mixture Model',
        href: 'https://hdl.handle.net/11296/a5waw2'
      },
      {
        label: '論文發表',
        text: '第三十屆全國資訊安全會議'
      }
    ]
  },
  {
    school: '樹德科技大學 (Shu-Te University)',
    degree: '網路學程 · 學士學位',
    period: '2014 - 2018',
    details: []
  }
]

</script>

<template>
  <div class="resume-container">
    <!-- Hero Header -->
    <header class="resume-hero card">
      <div class="hero-main">
        <img :src="withBase(profile.avatar)" :alt="profile.name" class="hero-avatar" />
        <div class="hero-info">
          <div class="hero-title-row">
            <div>
              <h1 class="hero-name">{{ profile.name }}</h1>
              <p class="hero-role">{{ profile.role }}</p>
              <p class="hero-location">📍 {{ profile.location }}</p>
            </div>
            <div class="hero-actions">
              <a
                v-for="link in profile.links"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                class="action-btn"
              >
                {{ link.label }} ↗
              </a>
            </div>
          </div>
          <p class="hero-summary">{{ profile.summary }}</p>
        </div>
      </div>

      <div class="highlights-grid">
        <div v-for="item in highlights" :key="item.label" class="highlight-item">
          <span class="highlight-value">{{ item.value }}</span>
          <span class="highlight-label">{{ item.label }}</span>
        </div>
      </div>
    </header>

    <!-- Certifications & Skills -->
    <section class="two-col-grid">
      <div class="card section-card">
        <h2 class="section-title">🏅 專業證照 Certifications</h2>
        <div class="cert-list">
          <div v-for="cert in certifications" :key="cert.id" class="cert-item">
            <div class="cert-top">
              <span class="cert-name">{{ cert.name }}</span>
              <span :class="['cert-badge', cert.active ? 'active' : 'expired']">
                {{ cert.active ? 'Valid' : 'Expired' }}
              </span>
            </div>
            <div class="cert-meta">
              <span>{{ cert.issuer }}</span>
              <span class="mono">{{ cert.id }}</span>
              <span>{{ cert.expiry }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card section-card">
        <h2 class="section-title">⚙️ 核心技術棧 Tech Stack</h2>
        <div class="skill-groups">
          <div v-for="group in skillGroups" :key="group.category" class="skill-group">
            <div class="skill-category">{{ group.category }}</div>
            <div class="tag-list">
              <span v-for="skill in group.items" :key="skill" class="tech-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Experience -->
    <section class="card section-card">
      <h2 class="section-title">💼 工作經歷 Work Experience</h2>
      <div class="timeline">
        <div v-for="exp in experiences" :key="exp.company + exp.period" class="timeline-item">
          <div class="timeline-dot" />
          <div class="timeline-content">
            <div class="exp-header">
              <div>
                <h3 class="exp-role">{{ exp.role }}</h3>
                <div class="exp-company">{{ exp.company }}</div>
              </div>
              <span class="period-badge">{{ exp.period }}</span>
            </div>
            <div v-if="exp.subRoles" class="sub-roles">
              <div v-for="sub in exp.subRoles" :key="sub.role + sub.period" class="sub-role-item">
                <div class="sub-role-header">
                  <span class="sub-role-title">{{ sub.role }}</span>
                  <span class="sub-role-period">{{ sub.period }}</span>
                </div>
                <ul class="bullet-list">
                  <li v-for="b in sub.bullets" :key="b">{{ b }}</li>
                </ul>
              </div>
            </div>
            <ul v-else-if="exp.bullets" class="bullet-list">
              <li v-for="b in exp.bullets" :key="b">{{ b }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Experience -->
    <section class="card section-card">
      <h2 class="section-title">🚀 精選專案經歷 Project Experience</h2>
      <div class="project-list">
        <article
          v-for="proj in projects"
          :key="proj.name"
          :class="['project-card', { 'is-pending': proj.status === 'pending' }]"
        >
          <div class="project-header">
            <div>
              <h3 class="project-name">{{ proj.name }}</h3>
              <span class="project-role">角色：{{ proj.role }}</span>
            </div>
            <span v-if="proj.status === 'pending'" class="pending-badge">待補充</span>
          </div>

          <div class="tag-list project-tags">
            <span v-for="t in proj.tech" :key="t" class="tech-tag subtle">{{ t }}</span>
          </div>

          <p v-if="proj.summary" class="pending-note">{{ proj.summary }}</p>

          <div v-if="proj.groups" class="project-groups">
            <div v-for="g in proj.groups" :key="g.title" class="project-group">
              <div class="group-title">{{ g.title }}</div>
              <ul class="bullet-list">
                <li v-for="item in g.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <ul v-if="proj.bullets" class="bullet-list">
            <li v-for="b in proj.bullets" :key="b">{{ b }}</li>
          </ul>
        </article>
      </div>
    </section>

    <!-- Community, Talks & Side Projects -->
    <section class="card section-card">
      <h2 class="section-title">🌐 社群貢獻、技術分享與研究 Community & Writing</h2>
      <div class="community-grid">
        <div v-for="item in communityItems" :key="item.title" class="community-card">
          <div class="community-top">
            <span class="community-tag">{{ item.tag }}</span>
          </div>
          <h3 class="community-title">{{ item.title }}</h3>
          <p class="community-desc">{{ item.desc }}</p>
          <div v-if="item.links?.length" class="community-links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="community-link-pill"
            >
              {{ link.label }} ↗
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="card section-card">
      <h2 class="section-title">🎓 學歷 Education</h2>
      <div class="edu-list">
        <div v-for="edu in education" :key="edu.school" class="edu-item">
          <div class="exp-header">
            <div>
              <h3 class="exp-role">{{ edu.school }}</h3>
              <div class="exp-company">{{ edu.degree }}</div>
            </div>
            <span class="period-badge">{{ edu.period }}</span>
          </div>
          <ul v-if="edu.details.length > 0" class="bullet-list">
            <li v-for="d in edu.details" :key="d.label">
              <strong>{{ d.label }}：</strong>
              <a v-if="d.href" :href="d.href" target="_blank" rel="noreferrer" class="inline-link">
                {{ d.text }} ↗
              </a>
              <span v-else>{{ d.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume-container {
  max-width: 1480px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
}

/* Hero */
.hero-main {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.hero-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand-1);
  flex-shrink: 0;
}

.hero-info {
  flex: 1;
  min-width: 0;
}

.hero-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-name {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

.hero-role {
  margin: 0.25rem 0 0;
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.hero-location {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.action-btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
}

.action-btn.primary:hover {
  background: var(--vp-c-brand-2);
  color: #ffffff;
}

.hero-summary {
  margin: 0.9rem 0 0;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.highlights-grid {
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.highlight-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.highlight-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.highlight-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

/* Section Titles */
.section-title {
  margin: 0 0 1.1rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  padding-bottom: 0.55rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Two Columns */
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 1.5rem;
  align-items: stretch;
}

/* Certifications */
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.cert-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.85rem 1rem;
}

.cert-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.cert-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.35;
}

.cert-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.cert-badge.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.cert-badge.expired {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.cert-meta {
  margin-top: 0.4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.mono {
  font-family: var(--vp-font-family-mono);
}

/* Skills */
.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.skill-category {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-tag {
  font-size: 0.78rem;
  padding: 0.22rem 0.6rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.tech-tag.subtle {
  font-size: 0.74rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: transparent;
}

/* Timeline & Experience */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: relative;
  padding-left: 1.25rem;
  border-left: 2px solid var(--vp-c-divider);
  margin-left: 0.4rem;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -1.62rem;
  top: 0.35rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-bg-soft);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.exp-role {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.exp-company {
  margin-top: 0.15rem;
  font-size: 0.88rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.period-badge {
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.sub-roles {
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.sub-role-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

.sub-role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sub-role-title {
  font-size: 0.93rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sub-role-period {
  font-size: 0.76rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

.bullet-list {
  margin: 0.6rem 0 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

/* Projects */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.project-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.15rem 1.25rem;
}

.project-card.is-pending {
  border-style: dashed;
  opacity: 0.85;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.project-name {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.project-role {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.pending-badge {
  font-size: 0.74rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.pending-note {
  margin: 0.65rem 0 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.project-tags {
  margin-top: 0.65rem;
}

.project-groups {
  margin-top: 0.85rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.group-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: -0.25rem;
}

/* Community */
.community-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
}

.community-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.95rem 1.05rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.community-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.community-tag {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}

.community-links {
  margin-top: auto;
  padding-top: 0.45rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.community-link-pill {
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.community-link-pill:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.community-link,
.inline-link {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.community-link:hover,
.inline-link:hover {
  text-decoration: underline;
}

.community-title {
  margin: 0.15rem 0 0;
  font-size: 0.94rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.community-desc {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* Education */
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.edu-item:not(:last-child) {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Responsive */
@media (max-width: 860px) {
  .two-col-grid,
  .community-grid {
    grid-template-columns: 1fr;
  }

  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hero-main {
    flex-direction: column;
  }

  .card {
    padding: 1.2rem;
  }
}
</style>

