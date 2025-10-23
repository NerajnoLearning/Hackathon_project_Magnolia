<template>
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-bold mb-3">Jackson Favorites</h3>
          <p class="text-gray-400 text-sm">
            Discover and save your favorite places to visit in Jackson, Mississippi.
            Explore local attractions, museums, parks, and more.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">Discover</a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">My Favorites</a>
            </li>
            <li>
              <a href="https://www.visitjackson.com" target="_blank" rel="noopener"
                 class="text-gray-400 hover:text-white transition-colors">
                Visit Jackson Official Site
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-bold mb-3">Connect</h3>
          <p class="text-gray-400 text-sm mb-2">
            Built with ❤️ for Jackson, MS
          </p>
          <p class="text-gray-400 text-sm">
            Data sourced from VisitJackson.com
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        <p>&copy; {{ currentYear }} Jackson Favorites. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
