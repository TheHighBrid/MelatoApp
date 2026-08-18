# MELATO MOBILE APP
## Android Phase 1 Blueprint v1.1

**Date:** August 18, 2026  
**Development repository:** https://github.com/TheHighBrid/MelatoApp  
**Website reference repository:** https://github.com/TheHighBrid/Gelato  
**Live store:** https://melato.ca

## 0. Repository and development-platform governance

The Melato mobile app is developed, reviewed, tested, documented and released from:

**`TheHighBrid/MelatoApp`**  
https://github.com/TheHighBrid/MelatoApp

This repository is the single source of truth for all mobile application work, including Android Phase 1, iOS Phase 2, React Native/Expo source, mobile design system, Shopify mobile integration, tests, CI/CD, build configuration and release documentation.

The live Shopify website/theme is maintained separately in:

**`TheHighBrid/Gelato`**  
https://github.com/TheHighBrid/Gelato

`Gelato` is the reference implementation for melato.ca and should be inspected when the app needs to reproduce or understand current website navigation, collection handles, merchandising, theme assets, Living Lookbook behavior, product presentation, editorial copy, policies or other brand-specific Shopify behavior.

### Mandatory boundary

- Mobile application changes go to `MelatoApp`.
- Website/theme changes go to `Gelato`.
- Shopify remains authoritative for products, variants, prices, inventory, collections, customer accounts, carts, checkout and orders.
- Never hard-code live commerce data from `Gelato` into the app.
- Never place React Native app source in `Gelato`.
- Never copy Liquid theme architecture directly into the mobile app.
- When a feature must exist on both web and mobile, make separate scoped changes in each repository.

Before implementing any app feature modeled on existing melato.ca behavior, inspect `Gelato` first rather than guessing.

---

## 1. Executive decision

Build one cross-platform React Native app using Expo, released on Android first and reused for iOS.

### Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Shopify Storefront API
- Shopify Checkout Kit
- Shopify Customer Account API
- Shopify CDN
- TanStack Query
- Zustand
- Expo Image
- SecureStore
- EAS Build
- GitHub Actions

Do not build a WebView-only wrapper, separate Kotlin and Swift codebases, custom checkout, custom commerce backend, AI stylist, AR try-on or loyalty infrastructure in Phase 1.

---

## 2. Product strategy

The app should not feel like melato.ca inside a phone shell.

It should feel like a pocket edition of Melato with two equal functions:

### Commerce
Fast browsing, discovery, search, variants, wishlist, cart, checkout and account access.

### Culture
Living Lookbook, collection stories, campaign imagery, editorial modules and drop moments that give customers a reason to reopen the app even when they are not immediately shopping.

The design target is:

**luxury editorial presentation + highly efficient commerce + distinctly Melato art direction.**

---

## 3. Core navigation

Use five persistent destinations:

1. Home
2. Shop
3. Lookbook
4. Saved
5. Me

Cart remains globally reachable in the header with a live item count. Search is globally reachable from Home and Shop.

---

## 4. Screen scope

### Splash
Minimal Melato identity. No artificial delay.

### Home
Editorial commerce hub:

1. full-bleed campaign hero
2. New Arrivals
3. Living Lookbook feature
4. The Uniform
5. current capsule/story
6. editor's selection
7. accessories/objects
8. Melato in Context
9. release/notification module if enabled

Aim for roughly 70% imagery/editorial and 30% conventional commerce UI.

### Shop
Two-column product grid with:

- search
- filter
- sort
- New
- Men
- Women
- Uniform
- Jackets
- Pants
- Accessories
- Fragrance

Avoid generic rounded ecommerce cards and excessive badges.

### Search
Use Shopify predictive search. Prioritize products, then collections. Include recent searches and useful default shortcuts.

### Collection
Use live Shopify collection data. Include title, optional image/statement, result count, filter/sort and paginated two-column product grid.

### Product Detail
Recommended sequence:

1. full-width gallery
2. product name
3. price
4. short descriptor
5. color/options
6. size/variant selector
7. size guide
8. Add to Bag
9. Complete the Look
10. product story
11. construction/material
12. fit
13. delivery/returns
14. recommendations
15. recently viewed

Unavailable variants must never be addable.

### Bag
Quiet and decisive:

- image
- product
- selected variant
- quantity
- price
- remove
- subtotal
- delivery message
- checkout CTA

### Checkout
Use Shopify Checkout Kit. Shopify remains responsible for payment, tax, checkout logic and order creation.

### Saved
Phase 1 local wishlist + recently viewed. Later sync to authenticated customer account.

### Living Lookbook
Signature Melato feature:

- vertical cinematic feed
- one dominant frame at a time
- discreet View Pieces interaction
- shoppable frame/looks
- progressive loading
- preload only the next one or two frames
- never load all 70+ frames at startup

### Me
Signed out:
- Sign in
- order help
- support
- policies
- settings

Signed in:
- profile
- orders
- order details
- account settings
- notifications
- support

Use Shopify Customer Account API rather than a custom account database.

---

## 5. Visual system

### Direction
Editorial restraint + tactile movement.

### Palette
- near-black / ink
- bone / warm white
- graphite / muted grey
- one campaign-specific accent where appropriate

### Typography
Use one expressive editorial/display family and one neutral UI sans.

### Shape language
Prefer square or lightly softened corners, hairline rules, clean edges and generous negative space.

Avoid excessive pills, giant radii, SaaS-style cards, floating gradients, glassmorphism and decorative shadows.

### Motion
Use subtle 180-280ms transitions, restrained fades, light haptics and controlled image motion. Motion must never slow down shopping.

### Imagery
Reuse existing Shopify CDN and Gelato-referenced brand assets where appropriate. Keep PDP images clean and product-focused. Cache aggressively.

---

## 6. Shopify architecture

```text
SHOPIFY
├── Products / Variants / Inventory
├── Collections
├── Search
├── Recommendations
├── Cart
├── Customer Accounts
└── Checkout
      ↓
Storefront API + Customer Account API
      ↓
MELATO REACT NATIVE APP
├── Home
├── Shop
├── Lookbook
├── Saved
├── Me
└── Cart
      ↓
Checkout Kit
      ↓
Shopify Order
```

Shopify remains the live commercial source of truth.

`Gelato` is consulted for existing website implementation and brand context, not for real-time product data.

---

## 7. Home merchandising implementation

For speed in Phase 1, keep home editorial configuration in a typed local config such as `src/content/home.ts`, referencing Shopify product and collection handles rather than duplicating price/inventory information.

Later, migrate editorial configuration to Shopify metaobjects if non-developer merchandising becomes necessary.

---

## 8. Performance requirements

Targets:

- fast first useful content
- no blank product cards
- fluid scrolling
- responsive cart state
- paginated collections
- lazy noncritical imagery
- optimized Shopify CDN image sizes
- cached product/collection data
- checkout preload where supported
- no unbounded lookbook preload

Only query the GraphQL fields each screen actually needs.

---

## 9. Accessibility

Require:

- TalkBack labels
- accessible touch targets
- proper contrast
- scalable text where layouts allow
- reduced-motion support
- meaningful product image descriptions
- decorative editorial imagery excluded from unnecessary screen-reader noise

Luxury must not mean inaccessible.

---

## 10. Analytics

Keep Phase 1 lean. Track:

- app_open
- view_home_module
- view_collection
- search
- view_item
- select_variant
- add_to_cart
- remove_from_cart
- begin_checkout
- checkout_complete
- save_item
- view_lookbook_frame

Do not add invasive SDKs without a clear business requirement.

---

## 11. Security

- Never embed Shopify Admin API tokens in the client.
- Never commit private Shopify credentials.
- Use only public Storefront credentials with minimum required access.
- Store customer auth tokens securely.
- Use PKCE for customer authentication.
- Never store card data.
- Never log auth tokens.
- Keep real secrets out of GitHub.
- Document environment requirements in `.env.example`.

---

## 12. Android release configuration

Recommended package ID:

`ca.melato.app`

App name:

`Melato`

Prepare:

- development APK
- preview/internal APK
- production AAB
- adaptive icon
- monochrome icon
- splash
- privacy policy URL
- support details
- screenshots
- Play feature graphic
- data safety answers
- content rating
- app access declarations

---

## 13. Cost strategy

Keep incremental software spend as close to zero as possible.

Use:

- React Native: free
- Expo: free tier initially
- Shopify APIs: existing store infrastructure
- GitHub: existing repository
- EAS free allowance where available
- no custom backend initially
- no paid app-builder subscription
- no paid search provider
- no paid UI kit

Google Play registration may still require the standard one-time developer registration fee depending on account status.

---

## 14. Phase 1 priorities

### P0 - must work

- navigation
- live Shopify products
- live collections
- Search
- PDP
- accurate variants
- Add to Bag
- update/remove cart lines
- persistent cart
- Shopify checkout
- image loading
- loading/error/empty states
- Android build

### P1 - launch quality

- Living Lookbook
- wishlist
- recently viewed
- recommendations
- account login/order history
- analytics
- push groundwork

### P2 - post launch

- restock alerts
- account-synced wishlist
- deeper editorial CMS/metaobjects
- deep linking
- sharing
- app-exclusive content
- personalization

### P3 - experimental

- AR
- virtual try-on
- AI stylist
- visual search
- clienteling
- popup/location experiences
- digital product passport/authenticity
- loyalty

---

## 15. Execution roadmap

### Step 1 - Repository setup
Work directly in `TheHighBrid/MelatoApp`.

- initialize Expo TypeScript app
- configure Expo Router
- package ID
- `.env.example`
- lint/typecheck
- CI basics

### Step 2 - Reference current website
Inspect `TheHighBrid/Gelato` for current navigation, editorial structure, Living Lookbook conventions, relevant assets and Shopify handles.

### Step 3 - Shopify data layer
Implement:

- Storefront client
- products
- collections
- search
- product queries
- recommendations
- cart

### Step 4 - Design system
Build:

- tokens
- typography
- spacing
- buttons
- product cards
- icon primitives
- navigation shell

### Step 5 - Commerce screens
Build Shop, Collection, Search, PDP and variant selection.

### Step 6 - Cart + checkout
Implement cart create/update/remove/persistence and Shopify Checkout Kit.

### Step 7 - Editorial Home
Build Melato-specific campaign and merchandising modules using live Shopify handles.

### Step 8 - Living Lookbook MVP
Build progressive vertical feed with View Pieces interactions.

### Step 9 - Saved + account
Add local wishlist/recently viewed and customer account shell/authentication if credentials are ready.

### Step 10 - QA
Validate physical-device purchase flow, navigation, slow-network behavior, images, cart state and checkout.

### Step 11 - Android release artifacts
Produce/configure APK/AAB, README, build instructions and Play listing checklist.

If schedule compresses, defer advanced account features before deferring the core purchase path.

---

## 16. Required repository structure

```text
MelatoApp/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── shop.tsx
│   │   ├── lookbook.tsx
│   │   ├── saved.tsx
│   │   └── me.tsx
│   ├── product/[handle].tsx
│   ├── collection/[handle].tsx
│   ├── search.tsx
│   ├── cart.tsx
│   └── checkout.tsx
├── src/
│   ├── components/
│   ├── commerce/
│   │   ├── storefront/
│   │   ├── cart/
│   │   ├── customer/
│   │   └── checkout/
│   ├── content/
│   ├── design/
│   ├── hooks/
│   ├── lib/
│   ├── state/
│   └── types/
├── assets/
├── tests/
├── docs/
├── .github/workflows/
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 17. ChatGPT + Manus collaboration

### ChatGPT
Owns architecture review, Shopify/data integrity, debugging, performance, security, QA and release correctness.

### Manus
Executes bounded implementation tasks, repetitive UI work, approved tickets, QA passes and documentation.

### Mandatory agent rules

Agents may not independently change:

- primary repository
- architecture
- checkout system
- auth model
- navigation IA
- Shopify source-of-truth rules
- design tokens

without documenting why and receiving review.

For every app feature based on current melato.ca behavior:

1. inspect `Gelato`
2. verify live Shopify data if relevant
3. implement in `MelatoApp`
4. test
5. commit to `MelatoApp`

---

## 18. Acceptance criteria

Phase 1 is not complete until:

- app launches reliably
- Home uses real Melato data/assets
- New Arrivals load from Shopify
- primary collections load from Shopify
- Search works
- PDP shows accurate price/images/variants
- unavailable variants cannot be added
- Add to Bag works
- cart quantity update works
- remove works
- cart persists as designed
- checkout opens through Shopify
- checkout lifecycle behaves correctly
- back navigation is predictable
- loading/error/empty states exist
- no private/admin credentials exist in the client
- lint/typecheck pass
- APK installs on a physical Android device
- production AAB configuration exists
- README explains build/release steps
- no known P0 bug remains

---

## 19. Phase 2 iOS

Reuse the React Native codebase. Phase 2 focuses on iOS QA, safe-area/platform refinements, Apple signing, Checkout Kit validation, App Store metadata, TestFlight and submission.

Do not create a separate iOS application architecture unless a platform requirement truly demands it.

---

## Final product principle

Build the smallest real luxury-commerce app, not the largest possible feature list.

The first version should be premium because of art direction, typography, imagery, hierarchy, speed, restraint and checkout quality.

**Fast enough to shop. Beautiful enough to browse. Cultural enough to reopen.**
