<template>
  <div class="favorites-view">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white py-12 mb-8 rounded-2xl shadow-lg">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          ❤️ Your Favorite Places
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
          {{ favorites.length }} {{ favorites.length === 1 ? 'place' : 'places' }} saved for your Jackson adventure
        </p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="favorites.length === 0" class="text-center py-16 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
        <div class="text-8xl mb-6">💔</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          No Favorites Yet
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Start exploring Jackson's attractions and click the heart ❤️ button to save your favorite places!
        </p>
        <k-button
          :theme-color="'primary'"
          :fill-mode="'solid'"
          :size="'large'"
          @click="goToAttractions"
        >
          Explore Attractions
        </k-button>
      </div>
    </div>

    <!-- Favorites Grid -->
    <template v-else>
      <!-- Stats Bar -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-soft text-center">
          <div class="text-3xl font-bold text-primary-500 mb-2">{{ favorites.length }}</div>
          <div class="text-sm text-gray-600">Saved Places</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-soft text-center">
          <div class="text-3xl font-bold text-jackson-blue mb-2">{{ uniqueCategories }}</div>
          <div class="text-sm text-gray-600">Categories</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-soft text-center">
          <div class="text-3xl font-bold text-jackson-green mb-2">100%</div>
          <div class="text-sm text-gray-600">Adventure Ready</div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex flex-wrap gap-3 items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
          My Saved Places
        </h2>
        <div class="flex gap-2">
          <k-button
            :theme-color="'base'"
            :fill-mode="'outline'"
            @click="exportFavorites"
          >
            📤 Export List
          </k-button>
          <k-button
            :theme-color="'error'"
            :fill-mode="'outline'"
            @click="confirmClearAll"
          >
            🗑️ Clear All
          </k-button>
        </div>
      </div>

      <!-- Favorites Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        <AttractionCard
          v-for="attraction in favoriteAttractions"
          :key="attraction.id"
          :attraction="attraction"
          :favorites="favorites"
          @view-details="showAttractionDetails"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </template>

    <!-- Details Modal -->
    <k-dialog
      v-if="selectedAttraction"
      :visible="showDetailsModal"
      @close="closeDetailsModal"
      :width="'90%'"
      :max-width="'1200px'"
      :height="'auto'"
      :max-height="'90vh'"
    >
      <template #titlebar>
        <div class="flex items-center justify-between w-full pr-4">
          <span class="text-xl font-bold">Attraction Details</span>
          <k-button
            :fill-mode="'flat'"
            :theme-color="'base'"
            @click="closeDetailsModal"
          >
            ✕
          </k-button>
        </div>
      </template>

      <AttractionDetails
        :attraction="selectedAttraction"
        :favorites="favorites"
        @toggle-favorite="toggleFavorite"
        @close="closeDetailsModal"
      />
    </k-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog as KDialog } from '@progress/kendo-vue-dialogs'
import { Button as KButton } from '@progress/kendo-vue-buttons'
import AttractionCard from '../components/attractions/AttractionCard.vue'
import AttractionDetails from '../components/attractions/AttractionDetails.vue'
import attractionsData from '../data/attractions.json'

const emit = defineEmits(['navigate', 'favorites-updated'])

const favorites = ref([])
const selectedAttraction = ref(null)
const showDetailsModal = ref(false)

onMounted(() => {
  loadFavoritesFromStorage()
})

// Get favorite attractions from the full list
const favoriteAttractions = computed(() => {
  return attractionsData.filter(attraction => 
    favorites.value.includes(attraction.id)
  )
})

// Count unique categories
const uniqueCategories = computed(() => {
  const categories = new Set(favoriteAttractions.value.map(a => a.category))
  return categories.size
})

const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('jackson-favorites')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading favorites:', error)
  }
}

const saveFavoritesToStorage = () => {
  try {
    localStorage.setItem('jackson-favorites', JSON.stringify(favorites.value))
  } catch (error) {
    console.error('Error saving favorites:', error)
  }
}

const toggleFavorite = (attractionId) => {
  const index = favorites.value.indexOf(attractionId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(attractionId)
  }
  saveFavoritesToStorage()
  emit('favorites-updated')
}

const showAttractionDetails = (attraction) => {
  selectedAttraction.value = attraction
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  setTimeout(() => {
    selectedAttraction.value = null
  }, 300)
}

const goToAttractions = () => {
  emit('navigate', 'attractions')
}

const exportFavorites = () => {
  const favoritesList = favoriteAttractions.value.map(a => 
    `${a.name}\n${a.address}\n${a.website || a.phone}\n`
  ).join('\n')
  
  const blob = new Blob([favoritesList], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'jackson-favorites.txt'
  a.click()
  URL.revokeObjectURL(url)
}

const confirmClearAll = () => {
  if (confirm(`Are you sure you want to remove all ${favorites.value.length} favorite places?`)) {
    favorites.value = []
    saveFavoritesToStorage()
    emit('favorites-updated')
  }
}
</script>

<style scoped>
.favorites-view {
  min-height: 100vh;
}
</style>
