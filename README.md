# Melato Mobile

The official Android-first, React Native mobile application for **Melato**. This repository is the single source of truth for mobile app code, Android release configuration, future iOS support, and mobile-specific Shopify integration.

The app is a native **Expo + React Native + TypeScript** experience. It is not a website wrapper. `TheHighBrid/Gelato` remains the Shopify website/theme reference repository; do not place Liquid/theme source here.

## Product scope

The current MVP provides an editorial Home experience, the five approved destinations (Home, Shop, Lookbook, Saved, and Me), globally reachable Search and Bag actions, live Shopify collection browsing, product detail, availability-aware variant selection, persistent cart state, and Shopify Checkout Kit handoff.

Commerce data is resolved at runtime from Shopify. The app does not store product prices, stock levels, variants, customer records, or payment details in application source.

| Layer | Technology |
| --- | --- |
| Native app | React Native, Expo, Expo Router, TypeScript |
| Server state | TanStack Query |
| Client state | Zustand with AsyncStorage cart persistence |
| Catalog, search, cart | Shopify Storefront GraphQL API |
| Checkout | Shopify Checkout Kit for React Native |
| Customer accounts | Shopify Customer Account API, planned for authenticated P1 |
| Android delivery | EAS Build |

## Prerequisites

Use Node.js 22 and pnpm 11. Android Checkout Kit requires a development or preview build; it cannot be fully exercised in Expo Go because it contains native code.

```bash
corepack enable
pnpm install
cp .env.example .env
```

## Shopify environment contract

The app can use Shopify’s tokenless Storefront API for the P0 catalog/search/cart operations currently used by Melato. Leave `EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` blank unless a **public** Storefront token is intentionally provisioned for additional allowed scopes.

```dotenv
EXPO_PUBLIC_SHOPIFY_SHOP_DOMAIN=vtjufw-k7.myshopify.com
EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=
EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2026-07
```

> Never put an Admin API token, private Storefront token, Shopify customer token, checkout secret, or payment credential in `.env`, source code, EAS public variables, or GitHub.

## Local development

```bash
pnpm start
pnpm android
```

For an Android native development build with Checkout Kit installed, configure EAS once for the project and run:

```bash
npx eas-cli build --platform android --profile development
```

Install the generated APK on a physical Android device, then run Metro with `pnpm start -- --dev-client`.

## Verification

Run these checks before committing or opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

The unit suite validates the visual-token contract, approved navigation, non-commercial editorial configuration, Shopify money formatting, Storefront request handling, product/cart mapping, collection retrieval, real cart-mutation behavior, and cart persistence.

## Android release profiles

| EAS profile | Output | Intended use |
| --- | --- | --- |
| `development` | APK development client | Engineering and physical-device debugging |
| `preview` | Internal-distribution APK | Stakeholder, QA, and closed internal testing |
| `production` | Android App Bundle (AAB) | Google Play internal testing and release workflow |

Create an internal APK:

```bash
npx eas-cli build --platform android --profile preview
```

Create the Play-ready AAB:

```bash
npx eas-cli build --platform android --profile production
```

The Android application ID is `ca.melato.app`. Before Play submission, complete the listing, privacy-policy URL, support URL, screenshots, feature graphic, Data safety form, content rating, and test-track requirements in Play Console.

## Core QA path

On an Android development or preview build, verify the following with a live network connection:

1. Launch the app and load Home.
2. Confirm that the New Arrivals, The Uniform, and Objects rails render Shopify imagery/products.
3. Open a collection and a product page.
4. Change variants; unavailable variants must remain disabled.
5. Add an available variant to Bag.
6. Change quantity and remove a line.
7. Close/reopen the app and confirm the cart remains available.
8. Open Secure Checkout and complete a sandbox/test checkout if approved.
9. Confirm a completed checkout clears the app cart through the Checkout Kit lifecycle callback.
10. Temporarily disable connectivity and confirm loading/error/empty boundaries remain usable.

## Repository boundary

| Repository | Responsibility |
| --- | --- |
| `TheHighBrid/MelatoApp` | All React Native source, app configuration, tests, EAS profiles, CI, Android/iOS work, and mobile documentation |
| `TheHighBrid/Gelato` | Shopify Liquid theme, website assets, current site navigation, merchandising reference, policies, and editorial source material |
| Shopify | Products, variants, inventory, prices, collections, carts, customers, orders, checkout, and media |

## P1 and later

Living Lookbook progression, local wishlist/recently viewed, Shopify Customer Account OAuth with PKCE, order history, analytics hooks, notifications, deep links, restock alerts, account-synced wishlist, and broader cultural editorial are sequenced after the core purchase path is physically tested.

## References

- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Shopify Checkout Kit](https://shopify.dev/docs/storefronts/mobile/checkout-kit)
- [Melato storefront](https://melato.ca)
