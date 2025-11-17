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
- Active filters state with sort options
- Computed filtered and sorted products
- Filter setters and reset function
- Sort options: relevance, trending, price-asc, price-desc, promotions

### Cart Store
- Shopping cart items with quantity tracking
- Size-specific item management
- Total price and item count calculations
- Add/remove/update quantity functions
- Cart drawer open/close state

### Auth Store
- Current user profile with role (user/admin)
- Authentication state management
- Sign in/out functionality
- Firebase auth integration
- Loading and error states

### User Store
- Current user data
- VIP level and points
- Authentication state
- Preference management
- Address management

## Routes
- `/` - Home (Masonry outfit feed)
- `/create` - Create new post (full-screen Instagram-style flow)
- `/post/:id` - Post detail view
- `/catalog` - Product catalog with filters
- `/product/:id` - Product detail view
- `/rewards` - VIP rewards program
- `/account` - User account settings
- `/login` - Authentication page
- `/admin` - Admin panel (requires admin role)

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
- 2025-11-17: **Modern Sidebar Menu (MAYU Branding) - COMPLETED**
  - ✅ Changed header from "Menú" to "MAYU" with modern typography (1.5rem, bold, letter-spacing)
  - ✅ Replaced all emoji icons with custom SVG linear icons (24x24px, stroke-width 2)
  - ✅ Reorganized menu structure:
    - Top section: Inicio, Catálogo, Rewards (main navigation)
    - Bottom section: User profile card with avatar, name, role, and settings icon
  - ✅ Created professional user card at bottom:
    - Circular avatar (48px) with white border and shadow
    - User name: "María García"
    - User role: "VIP Gold" in terracota color
    - Settings gear icon on the right
    - Entire card clickable to navigate to /account
  - ✅ Modern aesthetic:
    - Menu panel: rounded corners on right side (0 16px 16px 0)
    - Soft shadow: 4px 0 24px rgba(0, 0, 0, 0.12)
    - Menu items: 12px border-radius with smooth transitions
    - Icon wrappers: 40x40px with 10px border-radius
    - Active state: terracota background on icon, terracota text
    - Hover effects with clean spacing
- 2025-11-17: **Modern Feed Redesign (TikTok/Instagram Style) - COMPLETED**
  - ✅ Added sticky navigation tabs below header: Seguir (badge "8") / Descubrir / Cerca
  - ✅ Implemented functional tab filtering:
    - "Seguir": shows posts from followed users (María García, Carmen Ruiz, Isabel Torres)
    - "Descubrir": shows all 8 posts (default)
    - "Cerca": shows first 4 posts (nearby simulation)
  - ✅ Transformed feed from masonry to vertical grid layout
  - ✅ 1-column full-width layout (mobile/tablet < 1400px)
  - ✅ 2-column layout (desktop ≥ 1400px)
  - ✅ 3-column layout (extra wide ≥ 1800px)
  - ✅ Cards with consistent 3:4 aspect ratio (vertical) + max-height constraint for compact viewing
  - ✅ Multiple posts visible simultaneously: 1.5-2 posts per screen (mobile)
  - ✅ Compact typography: title (0.9375-1rem), username (0.875-0.9375rem), avatar (28-32px)
  - ✅ Reduced spacing: gap 0.25rem (mobile), 0.5rem (desktop), 0.75rem (extra wide)
  - ✅ Like button in terracota color (#c67b5c) with heart icon
  - ✅ Full-width immersive cards on mobile/tablet
  - ✅ Fixed header height: 64px + 1px border = 65px total
  - ✅ Tabs sticky at top: 65px (no overlap with header)
  - ✅ Main content padding-top: 65px (aligned)
  - ✅ Light mode with Apricot branding maintained
  - ✅ Fully responsive with precise breakpoints
- 2025-11-17: **Instagram-Style Profile Layout**
  - Completely redesigned AccountView to match Instagram profile layout
  - Added circular avatar with responsive sizing (80px mobile, 150px desktop)
  - Implemented horizontal stats bar: posts / followers / following
  - Added multi-line bio section with emoji support
  - Created 3-column photo grid (Instagram-style) with hover overlays
  - Modified HeaderBar to show settings gear (⚙️) icon only on /account route
  - FloatingUpload button now appears on both home (/) and profile (/account)
  - Added FloatingUpload component to App.vue for global rendering
  - Click on grid photos navigates to individual post detail view
  - Empty state when user has no posts yet
  - Fully responsive design with mobile-first approach
- 2025-11-17: **Create Post Full-Screen Flow**
  - Transformed upload modal into Instagram-style full-screen view at `/create`
  - Implemented 3-step wizard flow:
    1. Permission request screen (informative, user-friendly)
    2. Image selection with drag & drop + click support
    3. Large image preview with form (title, description, tags)
  - Added comprehensive drag & drop support with visual feedback
  - Created CreatePostView.vue with mobile-first responsive design
  - Updated FloatingUpload button to navigate to /create route
  - Removed UploadPostModal from HomeView (replaced by full-screen flow)
  - Features: file type/size validation, dynamic text feedback, animated transitions
  - Pending: Firebase Storage integration for actual image upload
- 2025-11-11: **Product Reviews System**
  - Implemented complete review system in ProductDetailView
  - Added Review type with fields: userId, userName, userAvatar, rating (1-5), comment, images[], date
  - Updated Product type with optional rating, reviewCount, and reviews[] fields
  - Added sample reviews to product ID '1' (3 reviews with mixed ratings and user images)
  - Created reviews UI section with:
    - Rating summary card (large number + stars + review count)
    - Individual review cards with avatar, name, stars, relative date, comment
    - User-uploaded product image gallery (clickable for modal view)
  - Implemented formatDate() for Spanish relative dates ("Hoy", "Ayer", "Hace X días")
  - Fixed review image modal to use separate state from product gallery (prevents image swapping bug)
  - Reviews section appears below product details, requires scrolling to view
- 2025-11-11: **Earlier UX Refinements**
  - Removed white box from like buttons in feed - now clean white icon/text with dark shadows for legibility
  - Fixed ProductDetailView image sticky positioning - now only sticky on desktop (≥1024px), normal on mobile/tablet
  - Improved accessibility with terracota focus outline on like buttons
- 2025-11-11: **Critical UX/UI Fixes and Upload Feature**
  - Fixed ProductDetailView image sizing with responsive max-height using clamp() and object-fit: contain
  - Removed individual '+' buttons from feed cards (were incorrectly placed on each card)
  - Created FloatingUpload component - single global '+' button (bottom-right, home only, auth required)
  - Created UploadPostModal - full upload experience with image preview, title, description, tags
  - Integrated upload flow in HomeView (pending Firebase Storage implementation)
  - Settings gear icon in header confirmed visible globally for admins (via App.vue layout)
- 2025-11-11: **Earlier UX/UI Improvements**
  - FloatingCart now only visible in catalog view (not on home, product detail, or other pages)
  - Renamed navigation "Cuenta" to "Perfil" (route remains /account)
  - Added settings gear icon in header (visible only to admins) for admin panel access
  - Fixed FeedCard typography - username and likes now fit on single line
  - Added "Mi Feed" section in Profile view for users to manage their personal outfit posts
- 2025-11-11: Implemented shopping cart with floating button, animations, and drawer UI
- Added product detail view with image gallery, size selector, and add to cart
- Integrated Firebase SDK (auth, firestore, storage services)
- Created authentication system with admin/user roles
- Built admin panel with product/order/outfit management tabs
- Added sort filters: relevancia, tendencia, precio (asc/desc), promociones
- Created login page with demo credentials (admin@google.com / 123456)
- Fixed cart/product data flow and image property consistency
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

## Firebase Integration

### Configuration
Firebase is integrated but requires proper credentials to be configured in Replit Secrets:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### Services
- **auth.service.ts**: User authentication, sign in/out, user profiles
- **firestore.service.ts**: Database CRUD for products, outfits, orders
- **storage.service.ts**: Image upload/delete for products, outfits, avatars

### Demo Admin User
When Firebase is properly configured, a demo admin user is automatically created:
- Email: admin@google.com
- Password: 123456
- Role: admin

## Future Enhancements
- ~~Shopping cart and checkout flow~~ ✅ Completed
- ~~User authentication with admin roles~~ ✅ Completed
- Real product data synchronization with Firestore
- Product image uploads via Firebase Storage
- Checkout flow with payment processing (Stripe integration)
- Order management and tracking
- Google Ads integration
- Analytics and consent management
- Server-side rendering with Nuxt 3 for SEO
- Product image optimization
- PWA capabilities for mobile installation
- Email notifications for orders
- User wishlist feature
- Product reviews and ratings
