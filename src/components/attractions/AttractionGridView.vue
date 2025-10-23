<template>
  <div class="attraction-grid-view">
    <kendo-splitter class="h-full" :orientation="'horizontal'" :panes="splitterPanes">
      <!-- Left Pane - Grid -->
      <div class="p-4">
        <kendo-grid
          :data-items="attractions"
          :sortable="true"
          :pageable="true"
          :page-size="10"
          @rowclick="onRowClick"
          class="h-full"
        >
          <kendo-grid-column field="name" title="Name" />
          <kendo-grid-column field="category" title="Category" />
          <kendo-grid-column field="address" title="Address" />
          <kendo-grid-column title="Actions" :width="150">
            <template v-slot:default="{ dataItem }">
              <k-button :theme-color="'primary'" :fill-mode="'flat'" @click="viewDetails(dataItem)">
                View
              </k-button>
            </template>
          </kendo-grid-column>
        </kendo-grid>
      </div>
      
      <!-- Right Pane - Details -->
      <div class="p-4" v-if="selectedAttraction">
        <div class="sticky top-4">
          <h3 class="text-xl font-bold mb-4">{{ selectedAttraction.name }}</h3>
          <img 
            :src="selectedAttraction.image" 
            :alt="selectedAttraction.name"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p class="text-gray-700 mb-4">{{ selectedAttraction.description }}</p>
          <div class="flex justify-between items-center">
            <k-button :theme-color="'primary'" @click="navigateToMap(selectedAttraction)">
              View on Map
            </k-button>
            <k-button 
              :theme-color="isFavorite(selectedAttraction.id) ? 'error' : 'base'"
              @click="toggleFavorite(selectedAttraction.id)"
            >
              {{ isFavorite(selectedAttraction.id) ? '❤️ Remove Favorite' : '🤍 Add to Favorites' }}
            </k-button>
          </div>
        </div>
      </div>
    </kendo-splitter>

    <!-- Details Dialog -->
    <kendo-dialog
      v-if="showDetailsDialog"
      :title="selectedAttraction?.name || 'Attraction Details'"
      :width="600"
      :height="500"
      @close="showDetailsDialog = false"
    >
      <div v-if="selectedAttraction" class="p-4">
        <img 
          :src="selectedAttraction.image" 
          :alt="selectedAttraction.name"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p class="text-gray-700 mb-4">{{ selectedAttraction.description }}</p>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="font-semibold">Category</p>
            <p>{{ selectedAttraction.category }}</p>
          </div>
          <div>
            <p class="font-semibold">Address</p>
            <p>{{ selectedAttraction.address }}</p>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <k-button @click="showDetailsDialog = false">Close</k-button>
          <k-button :theme-color="'primary'" @click="navigateToMap(selectedAttraction)">
            View on Map
          </k-button>
        </div>
      </div>
    </kendo-dialog>

    <!-- Notification -->
    <kendo-notification
      v-if="notification.show"
      :style="notification.style"
      @close="notification.show = false"
    >
      {{ notification.message }}
    </kendo-notification>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Grid as KendoGrid, 
  GridColumn as KendoGridColumn 
} from '@progress/kendo-vue-grid'
import { 
  Dialog as KendoDialog,
  DialogActionsBar as KendoDialogActionsBar
} from '@progress/kendo-vue-dialogs'
import { Notification as KendoNotification } from '@progress/kendo-vue-notification'
import { Splitter as KendoSplitter } from '@progress/kendo-vue-layout'
import { Button as KButton } from '@progress/kendo-vue-buttons'

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

const emit = defineEmits(['favorite-toggled', 'navigate'])

const selectedAttraction = ref(null)
const showDetailsDialog = ref(false)
const notification = ref({
  show: false,
  message: '',
  style: {}
})

const splitterPanes = [
  { size: '60%', min: '300px', collapsible: true },
  { size: '40%', min: '300px', collapsible: true }
]

const isFavorite = (id) => {
  return props.favorites.includes(id)
}

const toggleFavorite = (id) => {
  emit('favorite-toggled', id)
  showNotification(
    isFavorite(id) ? 'Removed from favorites' : 'Added to favorites!',
    isFavorite(id) ? 'error' : 'success'
  )
}

const viewDetails = (attraction) => {
  selectedAttraction.value = attraction
  showDetailsDialog.value = true
}

const onRowClick = (event) => {
  selectedAttraction.value = event.dataItem
}

const navigateToMap = (attraction) => {
  // This would be implemented to show on a map
  showNotification(`Opening map for ${attraction.name}`, 'info')
}

const showNotification = (message, type = 'info') => {
  const types = {
    info: { background: '#e5f1fb', color: '#0158d6' },
    success: { background: '#edf7ed', color: '#2e7d32' },
    error: { background: '#fde8e8', color: '#d32f2f' }
  }
  
  notification.value = {
    show: true,
    message,
    style: {
      ...types[type],
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px',
      borderRadius: '4px',
      zIndex: 10000
    }
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}
</script>

<style scoped>
.attraction-grid-view {
  height: calc(100vh - 200px);
  min-height: 500px;
}
</style>
