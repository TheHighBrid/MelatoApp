# Melato Mobile Project Governance

## Primary development platform

All Melato mobile application development is performed in GitHub in the dedicated repository:

**https://github.com/TheHighBrid/MelatoApp**

Repository: `TheHighBrid/MelatoApp`

This repository is the single source of truth for:

- React Native / Expo application source
- Android Phase 1
- iOS Phase 2
- mobile UI components and design tokens
- Shopify Storefront API client code
- Shopify Checkout Kit integration
- Shopify Customer Account integration
- Living Lookbook mobile implementation
- local state and caching
- tests and QA
- GitHub Actions
- EAS configuration
- APK/AAB release work
- app documentation and agent handoffs

Do not create or use a parallel mobile repository unless explicitly authorized.

## Shopify website reference repository

The Melato Shopify website is maintained separately in:

**https://github.com/TheHighBrid/Gelato**

Repository: `TheHighBrid/Gelato`

Live storefront: **https://melato.ca**

`Gelato` is the reference codebase for the existing Shopify website and theme. It should be inspected whenever the mobile app needs to match or understand current web behavior, including:

- navigation taxonomy
- collection handles and merchandising
- homepage/editorial hierarchy
- Living Lookbook implementation
- Liquid sections and snippets
- theme assets and icons
- product presentation conventions
- size/fit content
- policies and customer-facing language
- brand copy and visual conventions

## Hard repository boundary

### MelatoApp owns

- mobile application code
- Android/iOS platform configuration
- mobile-only assets
- mobile navigation and app state
- app-specific Shopify clients
- mobile CI/CD and releases

### Gelato owns

- Shopify theme code
- Liquid
- web JavaScript/CSS
- theme templates
- website sections/snippets
- website assets and web behavior

### Shopify owns commercial truth

Shopify remains authoritative for:

- products
- variants
- prices
- inventory
- collections
- customers
- cart
- checkout
- orders

Do not duplicate these values from `Gelato` into app code.

## Mandatory implementation sequence

For any app feature that mirrors existing melato.ca behavior:

1. Inspect the relevant code/content in `TheHighBrid/Gelato`.
2. Confirm live Shopify handles/data through Shopify APIs where commercial data is involved.
3. Implement the mobile experience in `TheHighBrid/MelatoApp`.
4. Test on Android.
5. Commit app changes only to `MelatoApp`.
6. If the task also requires a website/theme change, make that as a separate scoped change in `Gelato`.

## Source-of-truth hierarchy

### Commerce data
1. Live Shopify store
2. Shopify APIs
3. `Gelato` only as implementation/reference context

### Mobile behavior
1. `MelatoApp`
2. approved mobile blueprint
3. approved implementation tickets

### Website behavior
1. `Gelato`
2. live melato.ca

## Collaboration rule for ChatGPT, Manus and other agents

Agents must not independently switch architecture, repositories, checkout systems, authentication models or source-of-truth rules without documenting the reason and receiving review.

When in doubt:

- read `MelatoApp` for mobile decisions
- read `Gelato` for current website implementation
- query Shopify for live commerce data
