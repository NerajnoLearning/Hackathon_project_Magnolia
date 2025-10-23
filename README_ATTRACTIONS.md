# Jackson Favorites - Attraction Display System

## 🎉 What's Been Built

A complete attraction discovery system using **Kendo Vue UI** components to display Jackson, Mississippi attractions in a beautiful, interactive grid.

## ✅ Components Created

### 1. **AttractionCard.vue** 
Individual cards displaying attraction information with:
- ✨ Hover effects with image zoom
- ❤️ Favorite toggle button
- 🏷️ Category badges
- 🔗 Quick links to website and directions
- 📱 Fully responsive

### 2. **AttractionGrid.vue**
Responsive grid layout with:
- 📊 1-4 column layout (responsive)
- 🎯 Category filtering
- 📈 Results counter
- 🎨 Smooth animations
- 📭 Empty state handling

### 3. **AttractionDetails.vue**
Full detailed modal view with:
- 🖼️ Hero image with gradient overlay
- 📍 Google Maps integration
- 📞 Click-to-call functionality  
- 🔗 Website links
- 📤 Share functionality
- 💾 Favorite management

### 4. **SearchBar.vue**
Advanced search component with:
- 🔍 Real-time search
- 📂 Category dropdown filter
- ⚡ Quick filter chips
- 🧹 Clear all filters
- 🎨 Active filter display

### 5. **AttractionsView.vue**
Main orchestrator view with:
- 🎭 Modal dialog for details
- 💾 localStorage favorites persistence
- ⏳ Loading states
- 🎯 Hero section
- ❤️ Floating favorites counter

## 📦 Kendo Vue UI Components Used

- **Layout**: `Card`, `CardBody`, `CardTitle`, `CardSubtitle`
- **Inputs**: `Input`, `DropDownList`
- **Buttons**: `Button`, `Chip`
- **Dialogs**: `Dialog`
- **Notifications**: `Notification` (ready to use)

## 🎨 Custom Styling

### Jackson Theme Colors
- `jackson-blue`: #0066CC
- `jackson-green`: #00AA44
- `jackson-magnolia`: #F5F5DC
- `jackson-river`: #4A90E2
- `jackson-sunset`: #FF6B6B

### Custom Animations
- `animate-fade-in`
- `animate-slide-up`
- `animate-heart-pulse`
- `animate-bounce-in`

### Custom Shadows
- `shadow-soft`: Subtle shadow
- `shadow-medium`: Medium depth
- `shadow-hard`: Strong shadow

## 🗂️ Data Structure

The app uses `/src/data/attractions.json` with 15 real Jackson, MS attractions:
- Mississippi Museum of Art
- Mississippi Civil Rights Museum  
- Mississippi Children's Museum
- LeFleur's Bluff State Park
- Fondren District
- And 10 more!

## 🚀 Running the App

```bash
npm run dev
```

The app is now running at: **http://localhost:5175**

## 🎯 Features

### Interactive Features
- ✅ Search attractions by name, description, or location
- ✅ Filter by category
- ✅ Add/remove favorites (persisted in localStorage)
- ✅ View detailed attraction information
- ✅ Click to call phone numbers
- ✅ Open Google Maps for directions
- ✅ Visit attraction websites
- ✅ Share attractions (native share API)

### Responsive Design
- ✅ Mobile-first approach
- ✅ Works on all screen sizes
- ✅ Touch-friendly buttons
- ✅ Optimized images

## 📁 File Structure

```
src/
├── components/
│   └── attractions/
│       ├── AttractionCard.vue      # Individual card
│       ├── AttractionGrid.vue      # Grid display
│       ├── AttractionDetails.vue   # Modal details
│       ├── SearchBar.vue           # Search & filters
│       └── index.js                # Component exports
├── views/
│   └── AttractionsView.vue         # Main view
├── data/
│   └── attractions.json            # Attraction data
├── composables/
│   └── useFavorites.js            # Favorites logic
└── App.vue                         # Root component
```

## 🎨 Tailwind CSS v4

The project uses the latest Tailwind CSS v4 with:
- ✅ Vite plugin integration
- ✅ Custom theme colors
- ✅ Custom animations
- ✅ Custom components
- ✅ Extended spacing and shadows

## 🔧 Package Additions

New packages installed:
- `@progress/kendo-vue-dialogs`
- `@progress/kendo-vue-dropdowns`
- `@tailwindcss/vite`

## 🎯 Next Steps

You can now:
1. **Customize** the attraction data in `attractions.json`
2. **Add real images** to the `/public/images/attractions/` folder
3. **Extend functionality** with more Kendo components
4. **Add routing** with Vue Router for separate pages
5. **Create a favorites page** to view all saved attractions
6. **Add user authentication** for personalized favorites

## 📝 Notes

- ⚠️ The `@apply` lint warnings are harmless - they're PostCSS directives
- 📸 Image paths are placeholders - add real images to `/public/images/attractions/`
- 💾 Favorites are stored in localStorage (browser-specific)
- 🌐 Share API requires HTTPS in production

---

**Enjoy building with Kendo Vue UI! 🎉**
