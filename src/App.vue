<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDarkMode = ref(false)
const currentTheme = ref('blue')
const showThemeMenu = ref(false)
const themeSelectorRef = ref(null)

const themes = [
  { value: 'warm', label: 'Warm', color: '#777674' },
  { value: 'cool', label: 'Cool', color: '#71747e' },
  { value: 'pink', label: 'Pink', color: '#937886' },
  { value: 'green', label: 'Green', color: '#7c7e7c' },
  { value: 'blue', label: 'Blue', color: '#757b87' },
]

function toggleTheme() {
  const scheme = document.documentElement.getAttribute('data-color-scheme')
  if (scheme === 'dark') {
    document.documentElement.setAttribute('data-color-scheme', 'light')
    localStorage.setItem('theme-mode', 'light')
    isDarkMode.value = false
  } else {
    document.documentElement.setAttribute('data-color-scheme', 'dark')
    localStorage.setItem('theme-mode', 'dark')
    isDarkMode.value = true
  }
}

function toggleThemeMenu() {
  showThemeMenu.value = !showThemeMenu.value
}

function selectTheme(theme) {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  showThemeMenu.value = false
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'blue'
  currentTheme.value = savedTheme

  const savedMode = localStorage.getItem('theme-mode')
  isDarkMode.value = savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)

  function handleClickOutside(e) {
    if (showThemeMenu.value && themeSelectorRef.value && !themeSelectorRef.value.contains(e.target)) {
      showThemeMenu.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div>
    <header class="header">
      <div class="header-container">
        <div class="header-left">
          <span class="brand-primary">Microsoft Azure Cloud</span>
        </div>
        <nav class="header-nav">
          <router-link to="/glossary" class="nav-link">Glossary</router-link>
          <router-link to="/decisions" class="nav-link">Decisions</router-link>
          <div class="right-group">
            <div class="controls-group">
              <button class="theme-toggle" @click="toggleTheme" :aria-label="isDarkMode ? 'Switch to light' : 'Switch to dark'">
                <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </button>
              <div class="theme-selector" ref="themeSelectorRef">
                <button class="theme-selector-toggle" @click="toggleThemeMenu" aria-label="Select theme">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                  </svg>
                </button>
                <div v-if="showThemeMenu" class="theme-menu">
                  <button
                    v-for="t in themes"
                    :key="t.value"
                    @click="selectTheme(t.value)"
                    :class="{ active: currentTheme === t.value }"
                    class="theme-menu-item"
                  >
                    <span class="theme-color" :style="{ background: t.color }" />
                    <span class="theme-name">{{ t.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <div class="layout">
      <router-view />
    </div>
  </div>
</template>
