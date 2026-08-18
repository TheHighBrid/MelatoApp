# MelatoApp

Official mobile application repository for **Melato**.

## Project mandate

This repository is the **single source of truth for Melato mobile application development**.

- **Phase 1:** Android
- **Phase 2:** iOS
- **Mobile stack:** React Native + Expo + TypeScript
- **Commerce:** Shopify Storefront API
- **Checkout:** Shopify Checkout Kit
- **Live store:** https://melato.ca

All app source code, Android/iOS configuration, mobile UI, Shopify mobile integrations, tests, build workflows, release configuration and implementation documentation belong in this repository.

## Related Shopify website repository

The Melato Shopify website/theme is maintained separately at:

**https://github.com/TheHighBrid/Gelato**

`TheHighBrid/Gelato` is the reference repository for the current melato.ca website experience, including Shopify Liquid theme code, sections, snippets, theme assets, navigation, merchandising structure, Living Lookbook implementation and website-specific presentation.

### Repository boundary

- Mobile app changes go to **`TheHighBrid/MelatoApp`**.
- Shopify website/theme changes go to **`TheHighBrid/Gelato`**.
- Shopify itself remains the commercial source of truth for products, variants, prices, inventory, collections, customers, cart, checkout and orders.
- Before reproducing an existing website feature or visual convention in the app, inspect the corresponding implementation in `Gelato` instead of guessing.
- Do not copy Liquid theme architecture directly into React Native.
- Do not hard-code Shopify catalog or inventory data into this repository.

## Development documentation

See `docs/PROJECT_GOVERNANCE.md` for the repository and collaboration rules.

The Android Phase 1 blueprint and Manus execution handoff govern implementation priorities and acceptance criteria.
