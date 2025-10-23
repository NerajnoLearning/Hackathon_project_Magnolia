# Jackson Favorites Web App - Project Documentation

## Project Overview
A modern web application for discovering and saving favorite places to visit in Jackson, Mississippi. Users can browse attractions, save favorites, add personal notes, and create custom places.

## Project Objectives
- Encourage local tourism by curating Jackson’s top attractions.
- Provide an offline-first experience for travelers.
- Showcase how a Vue 3 + Tailwind app can integrate with static city data sources.

## Development Workflow
1. `/plan` → update feature roadmap
2. `/generate-tasks` → break down milestones
3. `/commit` → document code decisions
4. `/review` → summarize CLAUDE.md changes

## Tech Stack
- **Frontend Framework**: Vue 3 (Composition API)
- **CSS Framework**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Vue Composables / Pinia (optional)
- **Icons**: Heroicons / Lucide Vue
- **Data Source**: Visit Jackson website (https://www.visitjackson.com/things-to-do/)
- **Storage**: Browser LocalStorage for persistence
- **Deployment**: Static site hosting (Netlify/Vercel)

## Core Features

### 1. Discover Jackson View
- Display pre-loaded Jackson attractions
- Search functionality (by name, category, or description)
- Card-based responsive grid layout
- Save/unsave places to favorites
- View detailed information
- Smooth animations and transitions

### 2. My Favorites View
- Display all saved favorite places
- Add/edit personal notes for each place
- Remove places from favorites
- Shows count of favorites in navigation
- Empty state with call-to-action

### 3. Add Custom Places
- Modal or slide-over form
- Fields: Name, Category, Description, Notes, Image URL (optional)
- Custom places persist in LocalStorage
- Form validation
- Auto-save to favorites

### 4. Data Persistence
- **Favorites**: Stored in `localStorage.jacksonFavorites`
- **Custom Attractions**: Stored in `localStorage.jacksonAttractions`
- Composable for storage operations
- Data migration support for future updates

## Project Structure

```
jackson-favorites/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   └── AppLayout.vue
│   │   ├── attractions/
│   │   │   ├── AttractionCard.vue
│   │   │   ├── AttractionGrid.vue
│   │   │   ├── AttractionDetails.vue
│   │   │   └── SearchBar.vue
│   │   ├── favorites/
│   │   │   ├── FavoriteCard.vue
│   │   │   ├── FavoritesGrid.vue
│   │   │   └── EmptyFavorites.vue
│   │   ├── modals/
│   │   │   ├── BaseModal.vue
│   │   │   ├── AddPlaceModal.vue
│   │   │   └── EditNotesModal.vue
│   │   └── ui/
│   │       ├── BaseButton.vue
│   │       ├── BaseInput.vue
│   │       ├── BaseTextarea.vue
│   │       └── NotificationToast.vue
│   ├── composables/
│   │   ├── useAttractions.js
│   │   ├── useFavorites.js
│   │   ├── useLocalStorage.js
│   │   ├── useSearch.js
│   │   └── useNotifications.js
│   ├── views/
│   │   ├── DiscoverView.vue
│   │   ├── FavoritesView.vue
│   │   └── HomeView.vue
│   ├── data/
│   │   └── attractions.json
│   ├── utils/
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   │   └── main.css
│   ├── App.vue
│   └── main.js
├── public/
│   └── favicon.ico
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Vue 3 Composition API Patterns

### Core Composables

```javascript
// useAttractions.js
export function useAttractions() {
  const attractions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadAttractions = async () => {
    // Load from localStorage or API
  }

  const addAttraction = (attraction) => {
    // Add new attraction
  }

  return {
    attractions: readonly(attractions),
    loading: readonly(loading),
    error: readonly(error),
    loadAttractions,
    addAttraction
  }
}

// useFavorites.js
export function useFavorites() {
  const favorites = ref([])

  const toggleFavorite = (attraction) => {
    // Add/remove logic
  }

  const updateNotes = (id, notes) => {
    // Update notes
  }

  return {
    favorites: readonly(favorites),
    isFavorite,
    toggleFavorite,
    updateNotes
  }
}
```

## Data Structure

### Attraction Schema
```typescript
interface Attraction {
  id: string | number;
  name: string;
  category: string;
  description: string;
  image?: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  customFields?: Record<string, any>;
}

interface Favorite extends Attraction {
  notes: string;
  savedAt: string;
  visited: boolean;
  rating?: number;
}
```

### LocalStorage Schema
```javascript
{
  "jacksonFavorites": [
    {
      "id": "1",
      "name": "Mississippi Museum of Art",
      "category": "Museums & Culture",
      "description": "Premier art museum...",
      "notes": "Check special exhibitions",
      "savedAt": "2024-01-15T10:30:00Z",
      "visited": false
    }
  ],
  "jacksonAttractions": [...],
  "appSettings": {
    "version": "1.0.0",
    "lastSync": "2024-01-15T10:30:00Z",
    "preferences": {
      "defaultView": "grid",
      "sortBy": "name"
    }
  }
}
```

## Tailwind CSS Configuration

### Custom Theme
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        jackson: {
          blue: '#0066CC',
          green: '#00AA44',
          magnolia: '#F5F5DC'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'heart-pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
```

### Component Styling Patterns
```vue
<!-- AttractionCard.vue -->
<template>
  <div class="group relative bg-white rounded-xl shadow-md hover:shadow-xl
              transform transition-all duration-300 hover:-translate-y-1">
    <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-t-xl">
      <!-- Image or placeholder -->
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600
                 transition-colors duration-200">
        {{ attraction.name }}
      </h3>
      <p class="mt-2 text-sm text-gray-600 line-clamp-3">
        {{ attraction.description }}
      </p>
    </div>
  </div>
</template>
```

## Pre-loaded Attractions
1. **Mississippi Museum of Art** - Museums & Culture
2. **Mississippi Civil Rights Museum** - History & Heritage
3. **LeFleur's Bluff State Park** - Parks & Nature
4. **Mississippi Children's Museum** - Family & Kids
5. **Fondren District** - Shopping & Dining
6. **Mississippi State Capitol** - Government & History
7. **Jackson Zoo** - Family & Kids
8. **Eudora Welty House and Garden** - Literature & History
9. **Mississippi Agriculture & Forestry Museum** - Museums & Culture

## Development Guidelines

### Setup Instructions
```bash
# Create new Vue 3 project
npm create vue@latest jackson-favorites
cd jackson-favorites

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Kendo UI for Vue components
npm install @progress/kendo-vue-buttons @progress/kendo-vue-inputs @progress/kendo-vue-layout @progress/kendo-vue-notification @progress/kendo-theme-default

# Install additional packages
npm install @vueuse/core        # Vue composables
npm install @heroicons/vue      # Icons
npm install vue-router@4        # Routing
npm install pinia               # State management (optional)

# Development
npm run dev

# Build for production
npm run build
```

### Code Style Guidelines
- Use Composition API with `<script setup>`
- Prefer composables over mixins
- Use TypeScript for better type safety (optional)
- Follow Vue 3 style guide
- Use semantic HTML elements
- Implement proper ARIA labels
- Mobile-first responsive design

### Component Best Practices
```vue
<script setup>
import { ref, computed } from 'vue'
import { useAttractions } from '@/composables/useAttractions'

// Props with proper validation
const props = defineProps({
  attraction: {
    type: Object,
    required: true,
    validator: (value) => value.id && value.name
  }
})

// Emits declaration
const emit = defineEmits(['update', 'delete'])

// Composable usage
const { toggleFavorite, isFavorite } = useAttractions()

// Local state
const isHovered = ref(false)

// Computed properties
const buttonText = computed(() =>
  isFavorite(props.attraction.id) ? 'Remove' : 'Save'
)
</script>
```

## Features Roadmap

### Phase 1 - MVP ✅
- [x] Basic attraction listing
- [x] Search functionality
- [x] Add to favorites
- [x] Personal notes
- [x] LocalStorage persistence

### Phase 2 - Enhanced UX
- [ ] Vue Router integration
- [ ] Animated transitions between views
- [ ] Filter by category
- [ ] Sort options (name, category, date added)
- [ ] Dark mode support
- [ ] PWA capabilities

### Phase 3 - Advanced Features
- [ ] Map integration (Mapbox/Google Maps)
- [ ] Photo upload for custom places
- [ ] Share favorites list
- [ ] Export to PDF/CSV
- [ ] Visit tracking with dates
- [ ] Rating system
- [ ] Trip itinerary builder

### Phase 4 - Backend Integration
- [ ] User authentication
- [ ] Cloud sync across devices
- [ ] Real-time data from Visit Jackson API
- [ ] Social features (share, recommend)
- [ ] Collaborative lists

## Performance Optimization

### Current Optimizations
- Lazy loading for images
- Virtual scrolling for long lists
- Debounced search input
- Memoized computed properties
- Code splitting by route

### Build Optimizations
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'ui': ['@heroicons/vue']
        }
      }
    }
  }
}
```

## Testing Strategy
```bash
# Unit tests with Vitest
npm install -D vitest @vue/test-utils

# E2E tests with Playwright
npm install -D @playwright/test

# Component testing
npm install -D @testing-library/vue
```

## Deployment

### Environment Variables
```env
VITE_APP_TITLE=Jackson Favorites
VITE_API_URL=https://api.visitjackson.com
VITE_MAP_API_KEY=your_map_api_key
```

### Deploy Commands
```bash
# Netlify
npm run build && netlify deploy --prod

# Vercel
npm run build && vercel --prod

# GitHub Pages
npm run build && gh-pages -d dist
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility (a11y)
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Proper ARIA labels
- Color contrast ratios

## Security Considerations
- Input sanitization
- XSS prevention via Vue templates
- Content Security Policy headers
- No sensitive data in localStorage
- HTTPS only deployment

## Contributors
- **Developer**: Nerando Johnson
- **Designer**: TBD (icons & color palette)
- **Data Provider**: VisitJackson.com feed

## License
MIT License (or specify your preferred license)

---

*Last updated: January 2025*
*Version: 2.0.0*
*Stack: Vue 3 + Tailwind CSS + Kendo UI for Vue*
