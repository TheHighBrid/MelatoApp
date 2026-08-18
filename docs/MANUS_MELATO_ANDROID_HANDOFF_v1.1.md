# MANUS EXECUTION HANDOFF - MELATO ANDROID APP

You are collaborating on the Android-first Melato mobile commerce application.

## Mission
Create a production-oriented Android MVP today for Melato, a premium designer apparel brand on Shopify. The app must be visually restrained, editorial, fast and distinctly Melato. iOS will follow later from the same React Native codebase.

## REQUIRED DEVELOPMENT REPOSITORIES

### Primary application repository
All mobile development MUST be performed in:

**https://github.com/TheHighBrid/MelatoApp**  
Repository: `TheHighBrid/MelatoApp`

This is the only mobile app source-of-truth repository.

Create branches, commits, pull requests, documentation, Android build workflows and future iOS work here.

### Shopify website reference repository
The existing melato.ca Shopify website/theme is maintained in:

**https://github.com/TheHighBrid/Gelato**  
Repository: `TheHighBrid/Gelato`

Live site: **https://melato.ca**

Inspect `Gelato` whenever the app implementation needs to match or understand the current website's:
- navigation
- collections
- theme assets
- homepage/editorial structure
- Living Lookbook
- product presentation
- copy
- policies
- brand-specific Shopify implementation

`Gelato` is reference/source material for the app, not the mobile development target.

### Hard repository boundary
- Write mobile app changes only to `MelatoApp`.
- Write Shopify website/theme changes only to `Gelato`.
- Never put React Native app source inside `Gelato`.
- Never put Liquid theme source inside `MelatoApp` unless included purely as documentation/reference.
- Do not hard-code website product data into the app.
- Shopify remains the source of truth for products, variants, prices, inventory, customers, cart, checkout and orders.
- If a feature needs coordinated web + mobile work, create separate repository changes.

Before recreating a current melato.ca behavior or visual element, inspect `Gelato` first rather than guessing.

## Locked architecture
- React Native
- Expo
- TypeScript
- Expo Router
- Shopify Storefront API
- Shopify Checkout Kit
- Shopify Customer Account API
- Shopify is the source of truth for product, price, inventory, variants, collections and checkout
- EAS Build for Android
- No custom backend unless technically required

Do not replace this architecture with:
- WebView-only wrapper
- native Kotlin-only app
- Flutter
- custom payment system
- custom commerce database
- app-builder SaaS

## Core navigation
1. Home
2. Shop
3. Lookbook
4. Saved
5. Me

Cart remains globally reachable.

## P0 screens
- Splash
- Home
- Shop
- Collection
- Search
- Product Detail
- Cart
- Checkout

## P1
- Living Lookbook
- Saved
- Recently Viewed
- Account shell
- Shopify customer authentication/order history
- analytics hooks

## Visual direction
Editorial restraint. Near-black, bone, warm neutrals, campaign-driven accents. Large imagery. Hairline rules. Limited radius. No generic SaaS card system. No excessive pills. No Material-looking default UI. Motion subtle and functional.

## Commerce behavior
- Real Shopify data only
- respect variant availability
- no hard-coded prices
- no duplicated inventory
- persistent cart
- Checkout Kit for checkout
- error/loading/empty states required

## Performance
- paginate collections
- cache queries
- optimize images
- preload only next lookbook frames
- no full 70+ frame preload
- target fluid 60fps scrolling

## Security
- no Admin API token in mobile client
- no private Shopify token in mobile client
- public Storefront token only with least privilege
- secure storage for customer auth tokens
- no secrets committed

## Repository expectations
Use small branches and commits. Keep lint/typecheck passing. Document new environment variables in `.env.example`.

## Definition of done
A physical Android device can install the build, browse real Melato products, search, select an available variant, add it to bag, modify the cart and enter Shopify checkout without P0 failures.

Use `docs/MELATO_ANDROID_APP_BLUEPRINT_v1.1.md` as the governing product/design specification.

## Repository-aware execution order

1. Clone/open `TheHighBrid/MelatoApp`.
2. Inspect `TheHighBrid/Gelato` for current website conventions relevant to the task.
3. Query the live Shopify store for commercial data and current handles.
4. Implement the app feature in `MelatoApp`.
5. Test locally/Android.
6. Commit only app changes to `MelatoApp`.
7. If a web change is also necessary, create a separate scoped change in `Gelato`.
