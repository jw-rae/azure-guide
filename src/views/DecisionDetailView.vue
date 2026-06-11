<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
marked.setOptions({ async: false, gfm: true })
import decisionsData from '../data/decisions.json'
import glossaryData from '../data/glossary.json'

const route = useRoute()
const router = useRouter()

const markdown = ref('')
const loading = ref(true)

const decision = computed(() =>
  decisionsData.decisions.find(d => d.slug === route.params.slug)
)

const referencedTerms = computed(() => {
  if (!decision.value) return []
  return glossaryData.terms.filter(t => decision.value.glossaryRefs.includes(t.slug))
})

const relatedDecisions = computed(() => {
  if (!decision.value) return []
  const myRefs = new Set(decision.value.glossaryRefs)
  return decisionsData.decisions
    .filter(d => d.id !== decision.value.id && d.glossaryRefs.some(r => myRefs.has(r)))
    .slice(0, 6)
})

const renderedContent = ref('')

watch(markdown, async (val) => {
  if (!val) { renderedContent.value = ''; return }
  renderedContent.value = await marked.parse(val, { breaks: true, async: true })
}, { immediate: false })

watch(() => route.params.slug, async (slug) => {
  if (!slug) return
  const d = decisionsData.decisions.find(dd => dd.slug === slug)
  if (!d) { router.replace('/decisions'); return }
  loading.value = true
  try {
    const res = await fetch(`/decisions/${d.file}`)
    const text = await res.text()
    const parts = text.split('---')
    markdown.value = parts.length >= 3 ? parts.slice(2).join('---').trim() : text
  } catch {
    markdown.value = ''
  }
  loading.value = false
}, { immediate: true })
</script>

<template>
  <div v-if="decision" class="detail-page">
    <a href="#" @click.prevent="router.push('/decisions')" class="back-link">&larr; Back to Decisions</a>

    <div class="meta-line">
      <span class="tag">#{{ decision.id }}</span>
      <span class="tag">{{ decision.category }}</span>
    </div>
    <h1 v-html="decision.title"></h1>

    <div v-if="loading" class="empty" style="padding:var(--space-md)">Loading...</div>
    <div v-else class="content" v-html="renderedContent"></div>

    <div v-if="referencedTerms.length" class="glossary-links">
      <h3>Glossary Terms</h3>
      <div class="term-links">
        <router-link
          v-for="t in referencedTerms"
          :key="t.slug"
          :to="`/glossary/${t.slug}`"
          class="badge"
        >
          {{ t.name }}
        </router-link>
      </div>
    </div>

    <div v-if="relatedDecisions.length" class="related-section">
      <h3>Related Decisions</h3>
      <div class="card-grid">
        <router-link
          v-for="d in relatedDecisions"
          :key="d.id"
          :to="`/decisions/${d.slug}`"
          class="ref-card"
        >
          <span class="tag">#{{ d.id }}</span>
          <span class="ref-title">{{ d.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="empty">Card not found.</div>
</template>

<style scoped>
.back-link {
  font-size: .786rem;
  display: inline-block;
  margin-bottom: var(--space-sm);
}
.content {
  font-size: .857rem;
  line-height: 1.6;
}
.content :deep(h2) {
  font-size: .929rem;
  font-weight: 600;
  margin: var(--space-md) 0 var(--space-sm);
  padding-bottom: 3px;
  border-bottom: 1px solid var(--border);
}
.content :deep(h3) {
  font-size: .857rem;
  font-weight: 600;
  margin: var(--space-sm) 0 4px;
}
.content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-sm);
}
.content :deep(ul li) {
  padding: 1px 0;
}
.content :deep(ul li::before) {
  content: "\2013 ";
  color: var(--text-dim);
}
.content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: .786rem;
  margin: var(--space-sm) 0;
}
.content :deep(th), .content :deep(td) {
  text-align: left;
  padding: 3px 6px;
  border: 1px solid var(--border-light);
}
.content :deep(th) {
  font-weight: 600;
  color: var(--text-dim);
  font-size: .714rem;
  text-transform: uppercase;
  letter-spacing: .04em;
  background: var(--bg-alt);
}
.content :deep(p) {
  margin-bottom: var(--space-sm);
}
.content :deep(strong) {
  font-weight: 600;
}
.term-links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.term-links .badge {
  text-decoration: none;
}
.related-section {
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}
.ref-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text);
  font-size: .857rem;
}
.ref-card:hover {
  background: var(--bg-hover);
  border-color: var(--border);
}
.ref-title {
  flex: 1;
}
</style>
