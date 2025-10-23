# Jackson Favorites - Component Documentation

## Overview

This project uses **Kendo Vue UI** components to build a beautiful attraction discovery application for Jackson, Mississippi.

## Component Architecture

### Attraction Components (`src/components/attractions/`)

#### 1. **AttractionCard.vue**
Displays individual attraction information in a card format.

**Props:**
- `attraction` (Object, required) - Attraction data object
- `favorites` (Array) - Array of favorite attraction IDs

**Events:**
- `view-details` - Emitted when user clicks to view full details
- `toggle-favorite` - Emitted when favorite button is clicked

**Features:**
- Hover effects with image zoom
- Favorite heart button
- Category badge
- Responsive design
- Click to view details
- Direct website and maps links

---

#### 2. **AttractionGrid.vue**
Displays a grid of attraction cards with filtering.

**Props:**
- `attractions` (Array, required) - Array of attraction objects
- `favorites` (Array) - Array of favorite attraction IDs

**Events:**
- `view-details` - Emitted when an attraction card is clicked
- `toggle-favorite` - Emitted when favorite is toggled

**Features:**
- Responsive grid layout (1-4 columns based on screen size)
- Category filter buttons
- Empty state handling
- Results counter
- Smooth animations

---

#### 3. **AttractionDetails.vue**
Full-page detailed view of an attraction.

**Props:**
- `attraction` (Object, required) - Attraction data object
- `favorites` (Array) - Array of favorite attraction IDs

**Events:**
- `toggle-favorite` - Emitted when favorite is toggled
- `close` - Emitted when details should be closed

**Features:**
- Hero image with gradient overlay
- Contact information display
- Google Maps integration
- Phone calling capability
- Website links
- Share functionality
- Responsive layout

---

#### 4. **SearchBar.vue**
Advanced search and filter component.

**Props:**
- `categories` (Array) - List of available categories
- `quickFilters` (Array) - Quick filter options

**Events:**
- `search` - Emitted with search query and category
- `category-change` - Emitted when category filter changes
- `clear-filters` - Emitted when all filters are cleared

**Features:**
- Real-time search
- Category dropdown
- Quick filter chips
- Active filter display
- Clear all functionality
- Kendo UI Input and DropDownList components

---

### Views (`src/views/`)

#### **AttractionsView.vue**
Main view that orchestrates all attraction components.

**Features:**
- Search and filter functionality
- Modal dialog for details
- Favorites management with localStorage
- Loading states
- Hero section
- Floating favorites counter

---

## Kendo Vue UI Components Used

### Layout Components
- `Card` - For card containers
- `CardBody`, `CardTitle`, `CardSubtitle` - Card content structure

### Input Components
- `Input` - Search text input with prefix/suffix slots
- `DropDownList` - Category selection

### Button Components
- `Button` - Action buttons with theme variants
- `Chip` - Filter tags (removable/clickable)

### Dialog Components
- `Dialog` - Modal for attraction details

### Notification Components
- `Notification` - User feedback (planned)

---

## Data Structure

### Attraction Object
```javascript
{
  "id": "unique-identifier",
  "name": "Attraction Name",
  "category": "Category Name",
  "description": "Description text",
  "address": "Full address",
  "phone": "(123) 456-7890",
  "website": "https://example.com",
  "image": "/path/to/image.jpg"
}
```

---

## Styling

### Custom Tailwind Classes
- Jackson theme colors: `jackson-blue`, `jackson-green`, `jackson-magnolia`
- Custom animations: `fade-in`, `slide-up`, `heart-pulse`
- Custom shadows: `shadow-soft`, `shadow-medium`, `shadow-hard`

### Custom Components (from tailwind.config.js)
- `.card` - Auto-styled card with hover effects
- `.btn-primary` - Primary button style
- `.btn-jackson` - Jackson-themed gradient button
- `.text-shadow`, `.text-shadow-md`, `.text-shadow-lg` - Text shadows
- `.text-gradient` - Gradient text effect

---

## Usage Example

```vue
<template>
  <div>
    <SearchBar
      :categories="categories"
      @search="handleSearch"
    />
    
    <AttractionGrid
      :attractions="filteredAttractions"
      :favorites="favorites"
      @view-details="showDetails"
      @toggle-favorite="toggleFavorite"
    />
    
    <k-dialog v-if="selectedAttraction" :visible="showModal">
      <AttractionDetails
        :attraction="selectedAttraction"
        :favorites="favorites"
        @toggle-favorite="toggleFavorite"
      />
    </k-dialog>
  </div>
</template>
```

---

## Installation

Required Kendo packages:
```bash
npm install @progress/kendo-vue-buttons
npm install @progress/kendo-vue-inputs
npm install @progress/kendo-vue-layout
npm install @progress/kendo-vue-dialogs
npm install @progress/kendo-vue-dropdowns
npm install @progress/kendo-vue-notification
npm install @progress/kendo-theme-default
```

---

## Browser Features

- **localStorage** - Favorites persistence
- **navigator.share** - Native sharing (with clipboard fallback)
- **Google Maps** - Directions integration
- **tel:** links - Click-to-call functionality

---

## Responsive Breakpoints

- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1920px

---

## Future Enhancements

- [ ] Add image lazy loading
- [ ] Implement virtual scrolling for large datasets
- [ ] Add favorites page/view
- [ ] Integrate real image CDN
- [ ] Add map view with pins
- [ ] Implement user reviews
- [ ] Add social sharing previews
- [ ] PWA support for offline access
