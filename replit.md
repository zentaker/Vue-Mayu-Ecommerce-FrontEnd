# Apricot Outfits - Mobile-First Boutique App

## Overview
Apricot Outfits is a mobile-first Vue 3 web application designed as a boutique shopping experience. The app features a Pinterest-style masonry feed for outfit inspiration, a filterable product catalog, VIP rewards program, and user account management.

## Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Bundler**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: SCSS with mobile-first responsive design
- **Runtime**: Node 20 LTS

## Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── HeaderBar.vue        # Fixed header with logo and menu toggle
│   ├── OffCanvasMenu.vue    # Slide-out navigation menu
│   ├── MasonryFeed.vue      # Pinterest-style outfit grid
│   ├── ProductCard.vue      # Product display card
│   └── FiltersPanel.vue     # Product filtering controls
├── views/             # Page components
│   ├── HomeView.vue         # Home page with outfit feed
│   ├── CatalogView.vue      # Product catalog with filters
│   ├── RewardsView.vue      # VIP rewards and promotions
│   └── AccountView.vue      # User account settings
├── stores/            # Pinia state management
│   ├── catalogStore.ts      # Product catalog and filters
│   └── userStore.ts         # User data and authentication
├── router/            # Vue Router configuration
│   └── index.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── assets/            # Static assets
│   └── styles/
│       └── main.scss        # Global styles and variables
├── App.vue            # Root component with shell layout
└── main.ts            # Application entry point
```

## Key Features

### 1. Shell Layout
- Fixed header with logo and hamburger menu
- Off-canvas slide-out navigation
- Responsive mobile-first design

### 2. Home Page (/)
- Pinterest-style masonry grid (2 columns mobile, 3+ desktop)
- Each card displays 2 outfit images side by side
- Focus on visual browsing and exploration

### 3. Catalog Page (/catalog)
- Product grid (2 columns mobile, 3+ desktop)
- Advanced filtering:
  - Category (Blusas, Pantalones, Vestidos, Abrigos)
  - Color (Terracota, Beige, Cream, etc.)
  - Size (XS, S, M, L, XL)
  - Price range
  - Availability toggle
- Reactive filtering without page reload
- Mobile filter panel (bottom sheet)
- Desktop filter sidebar (sticky)

### 4. Rewards Page (/rewards)
- VIP level display (Bronze, Silver, Gold, Platinum)
- Points accumulation system
- Member benefits showcase
- Active promotions list
- Gradient card design

### 5. Account Page (/account)
- User profile information
- Shipping address management
- Notification preferences
- Privacy settings
- Logout functionality

## Design System

### Color Palette
- **Primary**: `#c67b5c` (Terracota)
- **Primary Dark**: `#b56a4d`
- **Text**: `#4a4238`
- **Text Light**: `#7c6a5b`
- **Background**: `#faf8f5`
- **Background Secondary**: `#f0ebe6`
- **Border**: `#e0d8cc`

### Typography
- **Font Family**: Inter, system UI fallbacks
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Breakpoints
- **Mobile**: < 768px (2 columns)
- **Tablet**: 768px - 1023px (3 columns)
- **Desktop**: ≥ 1024px (4 columns)

### Spacing Scale
- XS: 0.25rem
- SM: 0.5rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem

## State Management

### Catalog Store
- Products array with sample data
- Outfits array for masonry feed
- Active filters state
- Computed filtered products
- Filter setters and reset function

### User Store
- Current user data
- VIP level and points
- Authentication state
- Preference management
- Address management

## Routes
- `/` - Home (Masonry outfit feed)
- `/catalog` - Product catalog with filters
- `/rewards` - VIP rewards program
- `/account` - User account settings

## Development

### Running the App
The app runs on port 5000 configured for Replit's environment:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Recent Changes
- 2025-11-09: Initial project setup with complete MVP features
- Mobile-first responsive design implemented
- All core pages and components created
- Pinia stores configured with sample data
- Vue Router with scroll behavior
- Global SCSS styling with design tokens

## User Preferences
- Focus on mobile-first design
- Spanish language for UI text
- Warm, boutique aesthetic
- Pinterest-style visual browsing
- Touch-friendly interactions

## Architecture Decisions
- **Composition API**: For better TypeScript support and code organization
- **Pinia over Vuex**: Modern, lightweight state management
- **SCSS**: Powerful styling with variables and nesting
- **No external UI library**: Custom components for full design control
- **Mobile-first CSS**: Optimized for mobile devices, enhanced for desktop
- **Path aliases**: Using `@/` for cleaner imports

## Future Enhancements
- Real product data integration with backend API
- Shopping cart and checkout flow
- User authentication with OAuth
- Google Ads integration
- Analytics and consent management
- Server-side rendering with Nuxt 3 for SEO
- Payment processing (Stripe integration)
- Product image optimization
- PWA capabilities for mobile installation
