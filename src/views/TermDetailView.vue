<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import glossaryData from '../data/glossary.json'

const route = useRoute()
const router = useRouter()

const term = computed(() =>
  glossaryData.terms.find(t => t.slug === route.params.slug)
)

const termDecisions = computed(() => {
  if (!term.value) return []
  return glossaryData.termDecisions[term.value.slug] || []
})

if (!term.value && glossaryData.terms.length) {
  router.replace('/glossary')
}
</script>

<template>
  <div v-if="term" class="detail-page">
    <a href="#" @click.prevent="router.push('/glossary')" class="back-link">&larr; Back to Glossary</a>

    <div class="meta-line">
      <span v-if="term.category" class="tag">{{ term.category }}</span>
      <span v-for="t in term.themes" :key="t" class="tag">{{ t }}</span>
    </div>

    <h1>{{ term.name }}</h1>

    <p class="term-desc">{{ term.description }}</p>

    <div v-if="termDecisions.length" class="glossary-links">
      <h3>Referenced in {{ termDecisions.length }} decision{{ termDecisions.length !== 1 ? 's' : '' }}</h3>
      <div class="card-grid">
        <router-link
          v-for="d in termDecisions"
          :key="d.id"
          :to="`/decisions/${d.slug}`"
          class="ref-card"
        >
          <span class="tag">#{{ d.id }}</span>
          <span class="ref-title">{{ d.title }}</span>
          <span class="ref-cat">{{ d.category }}</span>
        </router-link>
      </div>
    </div>

    <div v-else class="glossary-links">
      <h3>Decisions</h3>
      <p class="muted">Not referenced in any decision cards.</p>
    </div>
  </div>
  <div v-else class="empty">Term not found.</div>
</template>

<style scoped>
.back-link {
  font-size: .786rem;
  display: inline-block;
  margin-bottom: var(--space-sm);
}
.term-desc {
  font-size: .929rem;
  line-height: 1.6;
  margin-bottom: var(--space-md);
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
.ref-cat {
  font-size: .714rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: .03em;
}
.muted {
  font-size: .786rem;
  color: var(--text-dim);
  margin-top: 4px;
}
</style>
