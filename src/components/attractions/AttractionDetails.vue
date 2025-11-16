<template>
  <div v-if="attraction" class="attraction-details max-w-4xl mx-auto animate-fade-in">
    <!-- Hero Image -->
    <div class="relative h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
      <img
        v-if="primaryImageUrl"
        :src="primaryImageUrl"
        :alt="attraction.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div v-else class="flex items-center justify-center h-full bg-gradient-to-br from-jackson-blue via-jackson-river to-jackson-green">
        <span class="text-9xl">{{ getCategoryIcon(attraction.category) }}</span>
      </div>

      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      <!-- Category Badge & Favorite Button -->
      <div class="absolute top-6 left-6 right-6 flex justify-between items-start">
        <div class="flex flex-col gap-2">
          <span class="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-semibold rounded-full shadow-lg">
            {{ attraction.category }}
          </span>
          <span v-if="attraction.subcategory" class="px-4 py-2 bg-white/80 backdrop-blur-sm text-sm text-gray-700 rounded-full shadow-lg">
            {{ attraction.subcategory }}
          </span>
        </div>

        <k-button
          :theme-color="isFavorite ? 'error' : 'base'"
          :fill-mode="'flat'"
          class="!bg-white/90 backdrop-blur-sm !rounded-full !w-12 !h-12 shadow-lg hover:scale-110 transition-transform"
          :aria-label="isFavorite ? `Remove ${attraction.name} from favorites` : `Add ${attraction.name} to favorites`"
          :aria-pressed="isFavorite"
          role="button"
          @click="toggleFavorite"
        >
          <span class="text-2xl" aria-hidden="true">{{ isFavorite ? '❤️' : '🤍' }}</span>
        </k-button>
      </div>

      <!-- Title Overlay -->
      <div class="absolute bottom-6 left-6 right-6">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 text-shadow-lg">
          {{ attraction.name }}
        </h1>
        <p v-if="attraction.neighborhood" class="text-white/90 text-lg">
          📍 {{ attraction.neighborhood }}
        </p>
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

        <!-- Highlights -->
        <div v-if="attraction.highlights && attraction.highlights.length > 0" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
          <ul class="space-y-2">
            <li v-for="(highlight, index) in attraction.highlights" :key="index"
                class="flex items-start gap-3 text-gray-700">
              <span class="text-jackson-blue mt-1">✓</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <!-- Hours & Admission -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div v-if="attraction.hours">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>🕒</span>
              Hours
            </h3>
            <div class="space-y-2 text-gray-700">
              <!-- Daily hours -->
              <div v-if="attraction.hours.daily">
                <p class="font-medium">{{ attraction.hours.daily }}</p>
              </div>
              <!-- Event-based hours -->
              <div v-else-if="attraction.hours.event_based">
                <p class="font-medium">{{ attraction.hours.event_based }}</p>
              </div>
              <!-- Box office hours -->
              <div v-else-if="attraction.hours.box_office">
                <p class="text-sm font-semibold mb-1">Box Office</p>
                <p class="font-medium">{{ attraction.hours.box_office }}</p>
                <p v-if="attraction.hours.performance_days" class="text-sm mt-1">
                  Performance Days: {{ attraction.hours.performance_days }}
                </p>
              </div>
              <!-- Campus/Gallery hours -->
              <div v-else-if="attraction.hours.campus">
                <p class="text-sm font-semibold mb-1">Campus</p>
                <p>{{ attraction.hours.campus }}</p>
                <p v-if="attraction.hours.gallery" class="text-sm mt-2">
                  <span class="font-semibold">Gallery:</span> {{ attraction.hours.gallery }}
                </p>
                <p v-if="attraction.hours.tours" class="text-sm mt-1">
                  <span class="font-semibold">Tours:</span> {{ attraction.hours.tours }}
                </p>
              </div>
              <!-- Exterior/Interior hours -->
              <div v-else-if="attraction.hours.exterior || attraction.hours.interior">
                <p v-if="attraction.hours.exterior" class="mb-1">
                  <span class="font-semibold">Exterior:</span> {{ attraction.hours.exterior }}
                </p>
                <p v-if="attraction.hours.interior">
                  <span class="font-semibold">Interior:</span> {{ attraction.hours.interior }}
                </p>
              </div>
              <!-- Pro shop hours (golf facility) -->
              <div v-else-if="attraction.hours.pro_shop">
                <p class="font-medium">{{ attraction.hours.daily || 'Daily: 7:00 AM - Dusk' }}</p>
                <p class="text-sm mt-1">
                  <span class="font-semibold">Pro Shop:</span> {{ attraction.hours.pro_shop }}
                </p>
              </div>
              <!-- Weekly schedule -->
              <div v-else class="space-y-1 text-sm">
                <p v-if="attraction.hours.monday">
                  <span class="font-medium">Monday:</span> {{ attraction.hours.monday }}
                </p>
                <p v-if="attraction.hours.tuesday">
                  <span class="font-medium">Tuesday:</span> {{ attraction.hours.tuesday }}
                </p>
                <p v-if="attraction.hours.wednesday">
                  <span class="font-medium">Wednesday:</span> {{ attraction.hours.wednesday }}
                </p>
                <p v-if="attraction.hours.thursday">
                  <span class="font-medium">Thursday:</span> {{ attraction.hours.thursday }}
                </p>
                <p v-if="attraction.hours.friday">
                  <span class="font-medium">Friday:</span> {{ attraction.hours.friday }}
                </p>
                <p v-if="attraction.hours.saturday">
                  <span class="font-medium">Saturday:</span> {{ attraction.hours.saturday }}
                </p>
                <p v-if="attraction.hours.sunday">
                  <span class="font-medium">Sunday:</span> {{ attraction.hours.sunday }}
                </p>
              </div>
              <p v-if="attraction.hours.notes" class="text-sm italic text-gray-500 mt-2">
                {{ attraction.hours.notes }}
              </p>
            </div>
          </div>

          <div v-if="attraction.admission">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💵</span>
              Admission
            </h3>
            <div class="space-y-1 text-sm text-gray-700">
              <p v-if="attraction.admission.general">General: {{ attraction.admission.general }}</p>
              <p v-if="attraction.admission.adults">Adults: {{ attraction.admission.adults }}</p>
              <p v-if="attraction.admission.seniors">Seniors: {{ attraction.admission.seniors }}</p>
              <p v-if="attraction.admission.students">Students: {{ attraction.admission.students }}</p>
              <p v-if="attraction.admission.children_under_1">Children Under 1: {{ attraction.admission.children_under_1 }}</p>
              <p v-if="attraction.admission.children_under_3">Children Under 3: {{ attraction.admission.children_under_3 }}</p>
              <p v-if="attraction.admission.children_under_4">Children Under 4: {{ attraction.admission.children_under_4 }}</p>
              <p v-if="attraction.admission.children_under_5">Children Under 5: {{ attraction.admission.children_under_5 }}</p>
              <p v-if="attraction.admission.children_under_6">Children Under 6: {{ attraction.admission.children_under_6 }}</p>
              <p v-if="attraction.admission.children_3_12">Children 3-12: {{ attraction.admission.children_3_12 }}</p>
              <p v-if="attraction.admission.children_3_18">Children 3-18: {{ attraction.admission.children_3_18 }}</p>
              <p v-if="attraction.admission.children_4_17">Children 4-17: {{ attraction.admission.children_4_17 }}</p>
              <p v-if="attraction.admission.children_4_18">Children 4-18: {{ attraction.admission.children_4_18 }}</p>
              <p v-if="attraction.admission.children_5_17">Children 5-17: {{ attraction.admission.children_5_17 }}</p>
              <p v-if="attraction.admission.children_6_17">Children 6-17: {{ attraction.admission.children_6_17 }}</p>
              <p v-if="attraction.admission.members">Members: {{ attraction.admission.members }}</p>
              <p v-if="attraction.admission.vehicle">Vehicle: {{ attraction.admission.vehicle }}</p>
              <p v-if="attraction.admission.camping">Camping: {{ attraction.admission.camping }}</p>
              <p v-if="attraction.admission.annual_pass">Annual Pass: {{ attraction.admission.annual_pass }}</p>
              <p v-if="attraction.admission.weekday_18">Weekday (18 holes): {{ attraction.admission.weekday_18 }}</p>
              <p v-if="attraction.admission.weekend_18">Weekend (18 holes): {{ attraction.admission.weekend_18 }}</p>
              <p v-if="attraction.admission.cart_rental">Cart Rental: {{ attraction.admission.cart_rental }}</p>
              <p v-if="attraction.admission.twilight_rates">Twilight Rates: {{ attraction.admission.twilight_rates }}</p>
              <p v-if="attraction.admission.annual_membership">Annual Membership: {{ attraction.admission.annual_membership }}</p>
              <p v-if="attraction.admission.single_tickets">Single Tickets: {{ attraction.admission.single_tickets }}</p>
              <p v-if="attraction.admission.season_packages">Season Packages: {{ attraction.admission.season_packages }}</p>
              <p v-if="attraction.admission.student_rush">Student Rush: {{ attraction.admission.student_rush }}</p>
              <p v-if="attraction.admission.bowling">Bowling: {{ attraction.admission.bowling }}</p>
              <p v-if="attraction.admission.theater">Theater: {{ attraction.admission.theater }}</p>
              <p v-if="attraction.admission.combo_ticket">Combo Ticket: {{ attraction.admission.combo_ticket }}</p>
              <p v-if="attraction.admission.thursday_evenings">Thursday Evenings: {{ attraction.admission.thursday_evenings }}</p>
              <p v-if="attraction.admission.varies">{{ attraction.admission.varies }}</p>
              <p v-if="attraction.admission.notes" class="italic text-gray-500 mt-2">{{ attraction.admission.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Location & Contact -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-jackson-blue">📍</span>
              Location
            </h3>
            <p class="text-gray-700 leading-relaxed mb-2">
              {{ attraction.address }}
            </p>
            <p v-if="attraction.distance_from_downtown" class="text-sm text-gray-500 mb-3">
              {{ attraction.distance_from_downtown }} from downtown
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

        <!-- Additional Info -->
        <div v-if="attraction.duration || attraction.best_for" class="mb-8 p-4 bg-gray-50 rounded-lg">
          <div class="grid md:grid-cols-2 gap-4">
            <div v-if="attraction.duration">
              <p class="text-sm font-semibold text-gray-700 mb-1">⏱️ Duration</p>
              <p class="text-gray-600">{{ attraction.duration }}</p>
            </div>
            <div v-if="attraction.best_for && attraction.best_for.length > 0">
              <p class="text-sm font-semibold text-gray-700 mb-1">👥 Best For</p>
              <p class="text-gray-600">{{ attraction.best_for.join(', ') }}</p>
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

// Get primary image URL from images array or fallback
const primaryImageUrl = computed(() => {
  // Check if images array exists and has items
  if (props.attraction.images && props.attraction.images.length > 0) {
    const firstImage = props.attraction.images[0]
    if (firstImage.url && !firstImage.url.includes('example.com')) {
      return firstImage.url
    }
  }
  return null
})

// Get appropriate icon based on category
const getCategoryIcon = (category) => {
  const iconMap = {
    'Museum': '🏛️',
    'Historic Site': '🏛️',
    'Park/Recreation': '🌳',
    'Performance Venue': '🎭',
    'Educational Institution': '🎓',
    'Archive/Research': '📚',
    'Entertainment Complex': '🎯'
  }
  return iconMap[category] || '🏛️'
}

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
