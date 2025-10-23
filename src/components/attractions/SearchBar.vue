<template>
  <div class="search-bar-container mb-8">
    <card class="!shadow-medium">
      <card-body class="p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Search Attractions
            </label>
            <k-input
              :value="searchQuery"
              :placeholder="'Search by name, description, or location...'"
              @input="handleSearchInput"
              class="w-full"
            >
              <template #prefix>
                <span class="text-gray-400 px-2">🔍</span>
              </template>
              <template #suffix v-if="searchQuery">
                <k-button
                  :fill-mode="'flat'"
                  :theme-color="'base'"
                  :size="'small'"
                  @click="clearSearch"
                  class="!p-1"
                >
                  <span class="text-gray-400 hover:text-gray-600">✕</span>
                </k-button>
              </template>
            </k-input>
          </div>

          <!-- Category Dropdown -->
          <div class="md:w-64">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <k-dropdownlist
              :data-items="categories"
              :value="selectedCategory"
              @change="handleCategoryChange"
              :default-item="'All Categories'"
              class="w-full"
            />
          </div>

          <!-- Search Button (Mobile) -->
          <div class="md:self-end">
            <k-button
              :theme-color="'primary'"
              :fill-mode="'solid'"
              class="w-full md:w-auto md:!px-8"
              @click="handleSearch"
            >
              Search
            </k-button>
          </div>
        </div>

        <!-- Quick Filters -->
        <div v-if="quickFilters.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <span class="text-xs font-medium text-gray-600 mr-3">Quick filters:</span>
          <div class="inline-flex flex-wrap gap-2 mt-2">
            <k-chip
              v-for="filter in quickFilters"
              :key="filter"
              :text="filter"
              :theme-color="'primary'"
              :fill-mode="'outline'"
              :size="'small'"
              :removable="false"
              class="cursor-pointer hover:!bg-primary-50 transition-colors"
              @click="applyQuickFilter(filter)"
            />
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 text-sm">
          <span class="text-gray-600">Active filters:</span>
          <k-chip
            v-if="searchQuery"
            :text="`Search: ${searchQuery}`"
            :theme-color="'info'"
            :size="'small'"
            :removable="true"
            @remove="clearSearch"
          />
          <k-chip
            v-if="selectedCategory && selectedCategory !== 'All Categories'"
            :text="`Category: ${selectedCategory}`"
            :theme-color="'info'"
            :size="'small'"
            :removable="true"
            @remove="clearCategory"
          />
          <k-button
            v-if="hasActiveFilters"
            :fill-mode="'flat'"
            :theme-color="'base'"
            :size="'small'"
            @click="clearAllFilters"
            class="!text-xs !text-red-600 hover:!text-red-700"
          >
            Clear all
          </k-button>
        </div>
      </card-body>
    </card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Card, CardBody } from '@progress/kendo-vue-layout'
import { Input as KInput } from '@progress/kendo-vue-inputs'
import { Button as KButton, Chip as KChip } from '@progress/kendo-vue-buttons'
import { DropDownList as KDropdownlist } from '@progress/kendo-vue-dropdowns'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  quickFilters: {
    type: Array,
    default: () => ['Museums', 'Parks', 'History', 'Family Friendly']
  }
})

const emit = defineEmits(['search', 'category-change', 'clear-filters'])

const searchQuery = ref('')
const selectedCategory = ref('All Categories')

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || (selectedCategory.value && selectedCategory.value !== 'All Categories')
})

const handleSearchInput = (event) => {
  searchQuery.value = event.value
  // Emit search on every input change for real-time filtering
  emit('search', {
    query: searchQuery.value,
    category: selectedCategory.value
  })
}

const handleCategoryChange = (event) => {
  selectedCategory.value = event.value
  emit('category-change', event.value)
  emit('search', {
    query: searchQuery.value,
    category: selectedCategory.value
  })
}

const handleSearch = () => {
  emit('search', {
    query: searchQuery.value,
    category: selectedCategory.value
  })
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', {
    query: '',
    category: selectedCategory.value
  })
}

const clearCategory = () => {
  selectedCategory.value = 'All Categories'
  emit('category-change', 'All Categories')
  emit('search', {
    query: searchQuery.value,
    category: 'All Categories'
  })
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All Categories'
  emit('clear-filters')
  emit('search', {
    query: '',
    category: 'All Categories'
  })
}

const applyQuickFilter = (filter) => {
  // Set the category directly for quick filter
  selectedCategory.value = filter
  emit('category-change', filter)
  emit('search', {
    query: searchQuery.value,
    category: filter
  })
}
</script>

<style scoped>
.search-bar-container {
  width: 100%;
}
</style>
