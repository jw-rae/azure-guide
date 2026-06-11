<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Fuse from 'fuse.js'
import glossaryData from '../data/glossary.json'

const route = useRoute()
const terms = ref(glossaryData.terms)
const themes = ref(glossaryData.themes)

const categories = computed(() =>
  [...new Set(terms.value.map(t => t.category).filter(Boolean))].sort()
)

const searchQuery = ref('')
const selectedTheme = ref('')
const selectedCategory = ref('')
const sortOrder = ref('alpha')

watch(() => route.query.search, (val) => {
  if (val) searchQuery.value = val
}, { immediate: true })

const fuse = new Fuse(terms.value, {
  keys: ['name', 'description', 'category'],
  threshold: 0.4,
  includeScore: true,
})

const filteredTerms = computed(() => {
  let result = [...terms.value]

  if (searchQuery.value.trim()) {
    const fuzzy = fuse.search(searchQuery.value.trim())
    result = fuzzy.map(r => r.item)
  }

  if (selectedTheme.value) {
    result = result.filter(t => t.themes.includes(selectedTheme.value))
  }

  if (selectedCategory.value) {
    result = result.filter(t => t.category === selectedCategory.value)
  }

  if (sortOrder.value === 'alpha') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOrder.value === 'alpha-desc') {
    result.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortOrder.value === 'theme') {
    result.sort((a, b) =>
      a.themes[0].localeCompare(b.themes[0]) || a.name.localeCompare(b.name)
    )
  }

  return result
})
</script>

<template>
  <div>
    <h1>Glossary</h1>

    <div class="filters">
      <input
        v-model="searchQuery"
        class="search-bar"
        type="search"
        placeholder="Search terms, descriptions &mdash; typos ok..."
      />
    </div>

    <div class="filters">
      <label>Theme</label>
      <select v-model="selectedTheme">
        <option value="">All</option>
        <option v-for="t in themes" :key="t" :value="t">{{ t }}</option>
      </select>

      <label>Category</label>
      <select v-model="selectedCategory">
        <option value="">All</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <label>Sort</label>
      <select v-model="sortOrder">
        <option value="alpha">A&ndash;Z</option>
        <option value="alpha-desc">Z&ndash;A</option>
        <option value="theme">By Theme</option>
      </select>
    </div>

    <div class="results-count">{{ filteredTerms.length }} term{{ filteredTerms.length !== 1 ? 's' : '' }}</div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="term in filteredTerms" :key="term.slug">
            <td><router-link :to="`/glossary/${term.slug}`" class="term-link">{{ term.name }}</router-link></td>
            <td>{{ term.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredTerms.length === 0" class="empty">
      No terms match your search.
    </div>
  </div>
</template>

<style scoped>
.term-link {
  font-weight: 600;
  text-decoration: none;
}
.term-link:hover {
  text-decoration: underline;
}
</style>
