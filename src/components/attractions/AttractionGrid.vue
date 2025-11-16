<template>
  <div class="attraction-grid-container">
    <!-- Filter Section -->
    <div class="mb-8 space-y-4">
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-3 items-center">
        <span class="text-sm font-medium text-gray-700">Category:</span>
        <k-button
          v-for="category in categories"
          :key="category"
          :theme-color="selectedCategory === category ? 'primary' : 'base'"
          :fill-mode="selectedCategory === category ? 'solid' : 'outline'"
          :size="'small'"
          class="!rounded-full transition-all"
          @click="selectCategory(category)"
        >
          {{ category }}
        </k-button>
      </div>

      <!-- Subcategory Filter (shown when category is selected) -->
      <div v-if="selectedCategory !== 'All' && subcategories.length > 1"
           class="flex flex-wrap gap-3 items-center">
        <span class="text-sm font-medium text-gray-700">Type:</span>
        <k-button
          v-for="subcategory in subcategories"
          :key="subcategory"
          :theme-color="selectedSubcategory === subcategory ? 'primary' : 'base'"
          :fill-mode="selectedSubcategory === subcategory ? 'solid' : 'outline'"
          :size="'small'"
          class="!rounded-full transition-all"
          @click="selectSubcategory(subcategory)"
        >
          {{ subcategory }}
        </k-button>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="filteredAttractions.length > 0" 
         class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      <AttractionCard
        v-for="attraction in filteredAttractions"
        :key="attraction.id"
        :attraction="attraction"
        :favorites="favorites"
        @view-details="handleViewDetails"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 animate-fade-in">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-2">
        No Attractions Found
      </h3>
      <p class="text-gray-600 mb-6">
        {{ selectedCategory === 'All' 
          ? 'No attractions are currently available.' 
          : `No attractions found in "${selectedCategory}" category.` 
        }}
      </p>
      <k-button
        v-if="selectedCategory !== 'All'"
        :theme-color="'primary'"
        @click="selectCategory('All')"
      >
        View All Attractions
      </k-button>
    </div>

    <!-- Results Count -->
    <div v-if="filteredAttractions.length > 0" 
         class="mt-6 text-center text-sm text-gray-500">
      Showing {{ filteredAttractions.length }} of {{ attractions.length }} attractions
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button as KButton } from '@progress/kendo-vue-buttons'
import AttractionCard from './AttractionCard.vue'

const props = defineProps({
  attractions: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view-details', 'toggle-favorite'])

const selectedCategory = ref('All')
const selectedSubcategory = ref('All')

// Extract unique categories from attractions
const categories = computed(() => {
  const uniqueCategories = new Set(props.attractions.map(a => a.category))
  return ['All', ...Array.from(uniqueCategories).sort()]
})

// Extract unique subcategories for selected category
const subcategories = computed(() => {
  if (selectedCategory.value === 'All') {
    return ['All']
  }
  const categoryAttractions = props.attractions.filter(a => a.category === selectedCategory.value)
  const uniqueSubcategories = new Set(
    categoryAttractions
      .filter(a => a.subcategory)
      .map(a => a.subcategory)
  )
  return ['All', ...Array.from(uniqueSubcategories).sort()]
})

// Filter attractions based on selected category and subcategory
const filteredAttractions = computed(() => {
  let filtered = props.attractions

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  if (selectedSubcategory.value !== 'All') {
    filtered = filtered.filter(a => a.subcategory === selectedSubcategory.value)
  }

  return filtered
})

const selectCategory = (category) => {
  selectedCategory.value = category
  selectedSubcategory.value = 'All' // Reset subcategory when category changes
}

const selectSubcategory = (subcategory) => {
  selectedSubcategory.value = subcategory
}

const handleViewDetails = (attraction) => {
  emit('view-details', attraction)
}

const handleToggleFavorite = (attractionId) => {
  emit('toggle-favorite', attractionId)
}
</script>

<style scoped>
.attraction-grid-container {
  width: 100%;
}
</style>
