import { createRouter, createWebHistory } from 'vue-router'
import GlossaryView from '../views/GlossaryView.vue'
import TermDetailView from '../views/TermDetailView.vue'
import DecisionsView from '../views/DecisionsView.vue'
import DecisionDetailView from '../views/DecisionDetailView.vue'

const routes = [
  { path: '/', redirect: '/glossary' },
  { path: '/glossary', name: 'Glossary', component: GlossaryView },
  { path: '/glossary/:slug', name: 'TermDetail', component: TermDetailView },
  { path: '/decisions', name: 'Decisions', component: DecisionsView },
  { path: '/decisions/:slug', name: 'DecisionDetail', component: DecisionDetailView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
