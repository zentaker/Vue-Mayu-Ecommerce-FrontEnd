# Apricot Outfits - Mobile-First Boutique App

## Overview
Apricot Outfits is a mobile-first Vue 3 web application providing a boutique shopping experience. It features a Pinterest-style feed for outfit inspiration, a filterable product catalog, a VIP rewards program, and user account management. The project aims to offer a visually rich and intuitive mobile shopping experience, prioritizing aesthetics and user engagement.

## User Preferences
- Focus on mobile-first design
- Spanish language for UI text
- Warm, boutique aesthetic
- Pinterest-style visual browsing
- Touch-friendly interactions

## System Architecture
The application is built with Vue 3 (Composition API), TypeScript, Vite, Pinia for state management, and Vue Router. Styling is handled with SCSS, following a mobile-first responsive design. The core layout includes a fixed header, off-canvas navigation, and a shell structure.

**UI/UX Decisions:**
- **Color Palette:** Primary Terracota (`#c67b5c`), warm text colors (`#4a4238`), and soft background tones (`#faf8f5`).
- **Typography:** Inter font family with various weights.
- **Breakpoints:** Mobile (< 768px), Tablet (768px - 1023px), Desktop (≥ 1024px) for responsive layouts.
- **Spacing:** A consistent scaling system (XS to XL) for UI elements.
- **Visual Design:** Pinterest-style masonry grid (Home Page) and Instagram-style profile layout (Account Page), TikTok/Instagram-style vertical feed.
- **Navigation:** Modern sidebar menu with custom SVG icons, user profile card, and clear navigation links.
- **Interactions:** Touch-friendly components, responsive image sizing, and smooth transitions.
- **Feature Design:**
    - **Home Page:** Dynamic feed with "Seguir", "Descubrir", "Cerca" tabs, supporting 1-3 column layouts based on screen width.
    - **Catalog Page:** Advanced filtering by category, color, size, price, and availability, with reactive updates.
    - **Rewards Page:** VIP level display, points system, member benefits, and active promotions with a gradient card design.
    - **Account Page:** Instagram-style profile with circular avatar, stats bar, multi-line bio, and 3-column photo grid.
    - **Create Post Flow:** Full-screen Instagram-style 3-step wizard for image upload, including permission, selection (drag & drop), and preview with form.
    - **Product Detail View:** Image gallery, size selector, add to cart, and integrated review system with rating summary and individual review cards.

**Technical Implementations:**
- **State Management:** Pinia stores for Catalog (products, filters, sort), Cart (items, quantity, totals), Auth (user, authentication state, Firebase integration), and User (profile, VIP level, preferences).
- **Routing:** Vue Router for navigation, including dynamic routes for posts and products.
- **Styling:** SCSS for modular and maintainable styles, with no external UI library to maintain full design control.
- **Development:** Uses Node 20 LTS, Vite for bundling. Path aliases (`@/`) for cleaner imports.

## External Dependencies
- **Firebase:**
    - Integrated for authentication (`auth.service.ts`), database (Firestore for products, outfits, orders - `firestore.service.ts`), and storage (for images - `storage.service.ts`).
    - Requires Firebase credentials configured in Replit Secrets.
    - Note: Currently showing configuration error - app works with mock data until credentials are properly configured.

## Recent Changes (2025-11-17)

### Modern Feed with MAYU Branding - COMPLETED ✅
**Off-Canvas Menu Redesign:**
- Header changed from "Menú" to "MAYU" branding with modern typography
- Implemented custom SVG line icons (24x24px) for navigation: Inicio, Catálogo, Rewards
- Reorganized menu structure: main navigation above, user profile card below
- User card shows: circular avatar (40px), "María García", "VIP Gold" role, settings icon
- Card navigates to /account on click
- Modern styling: soft shadows, rounded corners (12px), smooth transitions

### Tabs in Header + Masonry Layout - COMPLETED ✅
**Header Navigation Tabs:**
- Tabs (Seguir/Descubrir/Cerca) integrated into HeaderBar component
- Replaces "Apricot Outfits" title on Home page only
- Other pages still show "Apricot Outfits" branding
- Tab state managed in App.vue using provide/inject pattern
- Badge "8" shown on "Seguir" tab

**Masonry Layout (Pinterest/Xiaohongshu Style):**
- Changed from CSS grid to CSS columns for natural masonry layout
- Cards now have variable heights based on content
- No fixed aspect-ratios - images display at natural proportions
- 2 columns on mobile/tablet (<1400px)
- 3 columns on desktop (1400-1799px)
- 4 columns on extra wide screens (≥1800px)

**Typography Refinements:**
- Card titles: weight 600→500, size 0.9375rem→0.875rem (mobile)
- Username: weight 500→400, size 0.875rem→0.75rem (mobile)
- Like count: weight 600→500, size 0.875rem→0.75rem (mobile)
- Overall lighter, more refined appearance matching Xiaohongshu design

**Tab Filtering:**
- "Seguir": Posts from followed users (María García, Carmen Ruiz, Isabel Torres)
- "Descubrir": All 8 posts (default)
- "Cerca": First 4 posts (nearby simulation)
- Filtering reactive via provide/inject pattern

**Technical Improvements:**
- Cache-control headers in vite.config.ts for instant updates
- Fixed header at 65px (64px + 1px border)
- Provide/inject for state sharing between App → HeaderBar and App → HomeView
- break-inside: avoid for proper column breaking