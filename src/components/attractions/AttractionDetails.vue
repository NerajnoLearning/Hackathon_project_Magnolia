<template>
  <div v-if="attraction" class="attraction-details max-w-4xl mx-auto animate-fade-in">
    <!-- Hero Image -->
    <div class="relative h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
      <img 
        v-if="attraction.image"
        :src="attraction.image" 
        :alt="attraction.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div v-else class="flex items-center justify-center h-full bg-gradient-to-br from-jackson-blue via-jackson-river to-jackson-green">
        <span class="text-9xl">🏛️</span>
      </div>
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      <!-- Category Badge & Favorite Button -->
      <div class="absolute top-6 left-6 right-6 flex justify-between items-start">
        <span class="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-semibold rounded-full shadow-lg">
          {{ attraction.category }}
        </span>
        
        <k-button
          :theme-color="isFavorite ? 'error' : 'base'"
          :fill-mode="'flat'"
          class="!bg-white/90 backdrop-blur-sm !rounded-full !w-12 !h-12 shadow-lg hover:scale-110 transition-transform"
          @click="toggleFavorite"
        >
          <span class="text-2xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
        </k-button>
      </div>
      
      <!-- Title Overlay -->
      <div class="absolute bottom-6 left-6 right-6">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 text-shadow-lg">
          {{ attraction.name }}
        </h1>
      </div>
    </div>

    <!-- Content Card -->
    <card class="mb-6">
      <card-body class="p-8">
        <!-- Description -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p class="text-lg text-gray-700 leading-relaxed">
            {{ attraction.description }}
          </p>
        </div>

        <!-- Contact Information -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-jackson-blue">📍</span>
              Location
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ attraction.address }}
            </p>
            <k-button
              :theme-color="'primary'"
              :fill-mode="'outline'"
              :size="'small'"
              class="mt-3"
              @click="openMaps"
            >
              Open in Maps
            </k-button>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-jackson-green">📞</span>
              Contact
            </h3>
            <div class="space-y-3">
              <div v-if="attraction.phone">
                <p class="text-sm text-gray-500">Phone</p>
                <a :href="`tel:${attraction.phone}`" 
                   class="text-jackson-blue hover:underline font-medium">
                  {{ attraction.phone }}
                </a>
              </div>
              <div v-if="attraction.website">
                <p class="text-sm text-gray-500">Website</p>
                <a :href="attraction.website" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-jackson-blue hover:underline font-medium inline-flex items-center gap-1">
                  Visit Website
                  <span class="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
          <k-button
            v-if="attraction.website"
            :theme-color="'primary'"
            :fill-mode="'solid'"
            @click="openWebsite"
          >
            Visit Website
          </k-button>
          
          <k-button
            :theme-color="'base'"
            :fill-mode="'outline'"
            @click="openMaps"
          >
            Get Directions
          </k-button>
          
          <k-button
            v-if="attraction.phone"
            :theme-color="'base'"
            :fill-mode="'outline'"
            @click="callPhone"
          >
            Call Now
          </k-button>

          <k-button
            :theme-color="'base'"
            :fill-mode="'flat'"
            @click="shareAttraction"
          >
            Share
          </k-button>
        </div>
      </card-body>
    </card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Card, CardBody } from '@progress/kendo-vue-layout'
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

const emit = defineEmits(['toggle-favorite', 'close'])

const isFavorite = computed(() => {
  return props.favorites.includes(props.attraction.id)
})

const toggleFavorite = () => {
  emit('toggle-favorite', props.attraction.id)
}

const openWebsite = () => {
  if (props.attraction.website) {
    window.open(props.attraction.website, '_blank', 'noopener,noreferrer')
  }
}

const openMaps = () => {
  const address = encodeURIComponent(props.attraction.address)
  window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank', 'noopener,noreferrer')
}

const callPhone = () => {
  if (props.attraction.phone) {
    window.location.href = `tel:${props.attraction.phone}`
  }
}

const shareAttraction = async () => {
  const shareData = {
    title: props.attraction.name,
    text: props.attraction.description,
    url: props.attraction.website || window.location.href
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log('Error sharing:', err)
    }
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${props.attraction.name} - ${props.attraction.website || props.attraction.address}`)
    alert('Link copied to clipboard!')
  }
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.attraction-details {
  width: 100%;
}
</style>
