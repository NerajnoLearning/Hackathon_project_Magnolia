import { ref, computed } from 'vue'

const STORAGE_KEY = 'jackson-favorites'
const favorites = ref([])

export function useFavorites() {
  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        favorites.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  const saveFavorites = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
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
    saveFavorites()
  }

  const isFavorite = (attractionId) => {
    return favorites.value.includes(attractionId)
  }

  const clearFavorites = () => {
    favorites.value = []
    saveFavorites()
  }

  const favoriteCount = computed(() => favorites.value.length)

  return {
    favorites,
    loadFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount
  }
}
