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

## Recent Changes (2025-11-18)

### Session Persistence Fix - COMPLETED ✅
**Problem:** User session was lost when closing/reopening the preview or reloading the page
**Solution:** Configured Firebase Auth to use `browserLocalPersistence`
- Session now persists across page reloads and browser tabs
- Users remain logged in until they explicitly log out
- Implemented in `src/firebase/config.ts` using `setPersistence()`

### Firestore Offline Fallback - COMPLETED ✅
**Problem:** Firestore "client offline" errors prevented login
**Solution:** Added fallback logic when Firestore is unavailable
- Auth service now gracefully handles Firestore offline state
- Superadmin profile (`admin@google.com`) recognized locally
- App works fully without Firestore database connection
- Profile data uses local fallback until Firestore is available

### Settings Icon Update - COMPLETED ✅
**Change:** Updated settings icon from "circle with rays" to standard gear icon
- More recognizable and conventional design
- Located in OffCanvasMenu next to user profile card
- Matches industry-standard settings iconography

### Authentication & Logout System - COMPLETED ✅
**Protected Routes:**
- ALL main routes now require authentication: `/`, `/catalog`, `/rewards`, `/account`, `/create`, `/post/:id`, `/product/:id`
- Only `/login` is publicly accessible
- Unauthenticated users are automatically redirected to `/login`
- Authenticated users are redirected away from `/login` to `/`

**Settings View:**
- New `/settings` route with SettingsView component
- Displays user information: avatar, name, email, role badge
- "Mi Perfil" link navigates to account page
- "Cerrar Sesión" button executes logout flow

**Logout Implementation:**
- Robust signOut() function with try/finally block
- User state always cleared, even if Firebase signOut fails
- Automatic redirection to `/login` after logout
- Error handling with console logging

**Menu Improvements:**
- Settings icon in OffCanvasMenu updated to simpler, modern design (circle with rays)
- Settings button now navigates to `/settings` instead of `/account`
- Clear separation between profile view and settings

**Security Enhancements:**
- Router guard properly handles auth initialization timeout
- Explicit `clearLoading()` call on timeout prevents security bypass
- Users cannot access protected routes without authentication
- Authenticated users cannot revisit login page

**Technical Details:**
- Created `src/views/SettingsView.vue` with terracotta theme
- Updated router guards in `src/router/index.ts`
- Enhanced `authStore.signOut()` for robustness
- Added `goToSettings()` function in OffCanvasMenu

## Recent Changes (2025-11-17)

### Role-Based Access Control (RBAC) System - COMPLETED ✅
**Four-Tier User Roles:**
- **User (basic)**: Access to Home, Catalog, Rewards, Account
- **Staff**: User permissions + User/Permission Management + Content Moderation
- **Admin**: User permissions + Product/Inventory Management + System Configuration
- **Superadmin**: Full access to all features and routes (admin@google.com / 123456)

**Technical Implementation:**
- Created `UserRole` type: `'user' | 'staff' | 'admin' | 'superadmin'`
- Auth store enhanced with role helpers: `isStaff`, `isAdmin`, `isSuperadmin`, `hasRole()`
- Router guards with `allowedRoles` metadata for protected routes
- Routes: `/staff` (Staff+), `/admin` (Admin+)
- Superadmin has implicit access to all routes via `hasRole()` logic

**Views:**
- **StaffView**: User management, permissions overview, content moderation tabs
- **AdminView**: Product management, order processing, outfit management tabs
- Both views follow same design patterns with terracotta theme

**Dynamic Menu:**
- OffCanvasMenu shows Staff/Admin items conditionally based on user role
- Special styling for privileged sections (gradient icons, border separator)
- Reactive menu updates when user logs in/out

**Auth Initialization:**
- Bootstrap sequence: init auth → wait (with 3s timeout) → mount app
- Works with Firebase configured (normal flow) and misconfigured (fallback)
- Router guards properly wait for auth state before checking roles
- Loading state managed to prevent navigation hangs

**Security:**
- Frontend role checks paired with router guards
- Production deployment requires Firebase security rules (future work)
- Console logging for access denied scenarios (debugging)

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