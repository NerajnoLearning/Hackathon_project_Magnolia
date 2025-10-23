<template>
  <div class="attractions-view">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-jackson-blue via-jackson-river to-jackson-green text-white py-12 mb-8 rounded-2xl shadow-lg">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Discover Jackson's Best Attractions
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
          Explore museums, parks, cultural sites, and hidden gems in Mississippi's capital
        </p>
      </div>
    </div>

    <!-- Search Bar -->
    <SearchBar
      :categories="categories"
      :quick-filters="quickFilters"
      @search="handleSearch"
      @category-change="handleCategoryChange"
      @clear-filters="handleClearFilters"
    />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin text-6xl mb-4">⚙️</div>
      <p class="text-gray-600 text-lg">Loading attractions...</p>
    </div>

    <!-- Attraction Grid -->
    <template v-else>
      <AttractionGrid
        :attractions="filteredAttractions"
        :favorites="favorites"
        @view-details="showAttractionDetails"
        @toggle-favorite="toggleFavorite"
      />
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

    <!-- Quick Access to Favorites -->
    <div 
      v-if="favorites.length > 0"
      class="fixed bottom-6 right-6 z-50"
    >
      <k-button
        :theme-color="'error'"
        :fill-mode="'solid'"
        :size="'large'"
        class="!rounded-full !shadow-lg hover:scale-110 transition-transform !flex items-center gap-2"
        @click="goToFavorites"
        title="View My Favorites"
      >
        <span class="text-2xl">❤️</span>
        <div class="flex flex-col items-start text-left">
          <span class="text-xs opacity-90">View</span>
          <span class="font-bold">{{ favorites.length }} saved</span>
        </div>
      </k-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog as KDialog } from '@progress/kendo-vue-dialogs'
import { Button as KButton } from '@progress/kendo-vue-buttons'
import { Notification } from '@progress/kendo-vue-notification'
import SearchBar from '../components/attractions/SearchBar.vue'
import AttractionGrid from '../components/attractions/AttractionGrid.vue'
import AttractionDetails from '../components/attractions/AttractionDetails.vue'
import attractionsData from '../data/attractions.json'

const emit = defineEmits(['favorites-updated', 'navigate'])

const loading = ref(true)
const attractions = ref([])
const favorites = ref([])
const selectedAttraction = ref(null)
const showDetailsModal = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('All Categories')

// Load data on mount
onMounted(() => {
  setTimeout(() => {
    attractions.value = attractionsData
    loadFavoritesFromStorage()
    loading.value = false
  }, 500) // Simulate loading
})

// Categories computed from attractions
const categories = computed(() => {
  const uniqueCategories = new Set(attractions.value.map(a => a.category))
  return ['All Categories', ...Array.from(uniqueCategories).sort()]
})

// Quick filters - dynamically get top categories
const quickFilters = computed(() => {
  const categoryCounts = {}
  attractions.value.forEach(a => {
    if (a.category && a.category !== 'Attraction') {
      categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1
    }
  })
  
  // Get top 5 most common categories
  return Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category]) => category)
})

// Filtered attractions based on search and category
const filteredAttractions = computed(() => {
  let result = attractions.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(attraction => {
      return (
        attraction.name.toLowerCase().includes(query) ||
        attraction.description.toLowerCase().includes(query) ||
        attraction.category.toLowerCase().includes(query) ||
        attraction.address.toLowerCase().includes(query)
      )
    })
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== 'All Categories') {
    result = result.filter(a => a.category === selectedCategory.value)
  }

  return result
})

const handleSearch = ({ query, category }) => {
  searchQuery.value = query
  if (category) {
    selectedCategory.value = category
  }
}

const handleCategoryChange = (category) => {
  selectedCategory.value = category
}

const handleClearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All Categories'
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

const goToFavorites = () => {
  emit('navigate', 'favorites')
}
</script>

<style scoped>
.attractions-view {
  min-height: 100vh;
}
</style>
