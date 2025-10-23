<template>
  <card 
    class="attraction-card group cursor-pointer h-full"
    @click="$emit('view-details', attraction)"
  >
    <!-- Image Section -->
    <div class="relative overflow-hidden rounded-t-lg h-48 bg-gray-200">
      <img 
        v-if="attraction.image"
        :src="attraction.image" 
        :alt="attraction.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      />
      <div v-else class="flex items-center justify-center h-full bg-gradient-to-br from-jackson-blue to-jackson-green">
        <span class="text-6xl">🏛️</span>
      </div>
      
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full shadow-md">
          {{ attraction.category }}
        </span>
      </div>

      <!-- Favorite Button -->
      <div class="absolute top-3 right-3">
        <k-button
          :theme-color="isFavorite ? 'error' : 'base'"
          :fill-mode="'flat'"
          class="!bg-white/90 backdrop-blur-sm !rounded-full !w-10 !h-10 shadow-md hover:scale-110 transition-transform"
          @click.stop="toggleFavorite"
        >
          <span class="text-xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
        </k-button>
      </div>
    </div>

    <!-- Content Section -->
    <card-body class="p-5">
      <card-title class="!text-xl !font-bold !text-gray-900 !mb-2 line-clamp-2 group-hover:text-jackson-blue transition-colors">
        {{ attraction.name }}
      </card-title>
      
      <card-subtitle class="!text-sm !text-gray-600 !mb-3 line-clamp-3">
        {{ attraction.description }}
      </card-subtitle>

      <!-- Contact Info -->
      <div class="space-y-2 text-sm text-gray-500 mb-4">
        <div v-if="attraction.address" class="flex items-start gap-2">
          <span class="text-jackson-blue mt-0.5">📍</span>
          <span class="line-clamp-2">{{ attraction.address }}</span>
        </div>
        <div v-if="attraction.phone" class="flex items-center gap-2">
          <span class="text-jackson-green">📞</span>
          <span>{{ attraction.phone }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100">
        <div class="flex gap-2">
          <k-button
            :theme-color="'primary'"
            :fill-mode="'outline'"
            class="flex-1 !text-sm"
            @click.stop="$emit('view-details', attraction)"
          >
            View Details
          </k-button>
          
          <k-button
            v-if="attraction.website"
            :theme-color="'base'"
            :fill-mode="'outline'"
            class="!text-sm"
            @click.stop="openWebsite(attraction.website)"
            title="Visit Website"
          >
            🔗
          </k-button>
        </div>

        <!-- Add to Favorites Button -->
        <k-button
          :theme-color="isFavorite ? 'error' : 'base'"
          :fill-mode="isFavorite ? 'solid' : 'outline'"
          class="w-full !text-sm !font-medium"
          @click.stop="toggleFavorite"
        >
          <span class="mr-2">{{ isFavorite ? '❤️' : '🤍' }}</span>
          {{ isFavorite ? 'Saved to Favorites' : 'Add to Favorites' }}
        </k-button>
      </div>
    </card-body>
  </card>
</template>

<script setup>
import { computed } from 'vue'
import { Card, CardBody, CardTitle, CardSubtitle } from '@progress/kendo-vue-layout'
import { Button as KButton } from '@progress/kendo-vue-buttons'

const props = defineProps({
  attraction: {
    type: Object,
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view-details', 'toggle-favorite'])

const isFavorite = computed(() => {
  return props.favorites.includes(props.attraction.id)
})

const toggleFavorite = () => {
  emit('toggle-favorite', props.attraction.id)
}

const openWebsite = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full bg-gradient-to-br from-jackson-blue to-jackson-green"><span class="text-6xl">🏛️</span></div>'
}
</script>

<style scoped>
.attraction-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.attraction-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
