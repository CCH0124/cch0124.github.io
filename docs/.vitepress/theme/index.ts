import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PostList from './components/PostList.vue'
import HomeDashboard from './components/HomeDashboard.vue'
import ResumeView from './components/ResumeView.vue'
import TravelMap from './components/TravelMap.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
    app.component('HomeDashboard', HomeDashboard)
    app.component('ResumeView', ResumeView)
    app.component('TravelMap', TravelMap)
  }
}
