<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo and Title -->
        <div 
          class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          @click="$emit('navigate', 'attractions')"
        >
          <div class="text-3xl">🌺</div>
          <div>
            <h1 class="text-2xl font-bold text-jackson-blue">Jackson Favorites</h1>
            <p class="text-sm text-gray-600">Discover the Best of Jackson, MS</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center space-x-4">
          <k-button
            :theme-color="currentView === 'attractions' ? 'primary' : 'base'"
            :fill-mode="currentView === 'attractions' ? 'solid' : 'flat'"
            @click="$emit('navigate', 'attractions')"
            class="hidden md:inline-flex"
          >
            🏛️ Discover
          </k-button>
          
          <k-button
            :theme-color="currentView === 'favorites' ? 'error' : 'base'"
            :fill-mode="currentView === 'favorites' ? 'solid' : 'flat'"
            @click="$emit('navigate', 'favorites')"
            class="relative"
          >
            <span class="hidden md:inline">❤️ My Favorites</span>
            <span class="md:hidden">❤️</span>
            <span 
              v-if="favoritesCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md"
            >
              {{ favoritesCount }}
            </span>
          </k-button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Button as KButton } from '@progress/kendo-vue-buttons'

defineProps({
  currentView: {
    type: String,
    default: 'attractions'
  },
  favoritesCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['navigate'])
</script>
