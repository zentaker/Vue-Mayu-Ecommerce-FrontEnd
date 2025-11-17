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