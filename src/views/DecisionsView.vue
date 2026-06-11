<script setup>
import { ref, computed } from 'vue'
import decisionsData from '../data/decisions.json'

const decisions = ref(decisionsData.decisions)
const categories = ref(decisionsData.categories)

const selectedCategory = ref('')

const filteredDecisions = computed(() => {
  let result = decisions.value
  if (selectedCategory.value) {
    result = result.filter(d => d.category === selectedCategory.value)
  }
  return result.sort((a, b) => a.id - b.id)
})
</script>

<template>
  <div>
    <h1>Decision Cards</h1>

    <div class="filters">
      <label>Theme</label>
      <select v-model="selectedCategory">
        <option value="">All</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="results-count">{{ filteredDecisions.length }} card{{ filteredDecisions.length !== 1 ? 's' : '' }}</div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Card</th>
            <th>Theme</th>
            <th>Glossary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in filteredDecisions" :key="d.id">
            <td><span class="tag">#{{ d.id }}</span></td>
            <td><router-link :to="`/decisions/${d.slug}`" class="card-link">{{ d.title }}</router-link></td>
            <td><span class="tag">{{ d.category }}</span></td>
            <td>{{ d.glossaryRefs.length }} link{{ d.glossaryRefs.length !== 1 ? 's' : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredDecisions.length === 0" class="empty">
      No cards in this category.
    </div>
  </div>
</template>

<style scoped>
.card-link {
  font-weight: 500;
  text-decoration: none;
}
.card-link:hover {
  text-decoration: underline;
}
</style>
