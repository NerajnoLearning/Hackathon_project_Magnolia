<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader 
      :current-view="currentView"
      :favorites-count="favoritesCount"
      @navigate="navigateTo"
    />

    <main class="flex-1 container mx-auto px-4 py-8">
      <Transition name="fade" mode="out-in">
        <AttractionsView 
          v-if="currentView === 'attractions'"
          @favorites-updated="updateFavoritesCount"
          @navigate="navigateTo"
        />
        <FavoritesView 
          v-else-if="currentView === 'favorites'"
          @navigate="navigateTo"
          @favorites-updated="updateFavoritesCount"
        />
      </Transition>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import AttractionsView from './views/AttractionsView.vue'
import FavoritesView from './views/FavoritesView.vue'

const currentView = ref('attractions')
const favoritesCount = ref(0)

onMounted(() => {
  updateFavoritesCount()
})

const navigateTo = (view) => {
  currentView.value = view
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateFavoritesCount = () => {
  try {
    const stored = localStorage.getItem('jackson-favorites')
    if (stored) {
      const favorites = JSON.parse(stored)
      favoritesCount.value = favorites.length
    } else {
      favoritesCount.value = 0
    }
  } catch (error) {
    console.error('Error loading favorites count:', error)
    favoritesCount.value = 0
  }
}
</script>

<style>
/* View transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
