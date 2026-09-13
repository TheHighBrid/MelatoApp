# Implementation Validation Notes

## Shopify runtime validation

**Observed on 2026-08-18.** Melato’s canonical Shopify domain is `vtjufw-k7.myshopify.com`, as returned by the public `https://melato.ca/meta.json` metadata endpoint. The live shop returned 19 published collections and 90 published products at the time of the check.

The following tokenless Storefront API endpoint was successfully queried:

```text
https://vtjufw-k7.myshopify.com/api/2026-07/graphql.json
```

Live probes verified that New Arrivals collection data, product handles, live variant prices, `availableForSale`, product imagery, product details, and predictive product search can be read without embedding a Storefront token. The tokenless product query rejected `quantityAvailable` because the public access scope `unauthenticated_read_product_inventory` is not granted. The app deliberately uses `availableForSale` for enabled/disabled purchase controls and does not request inventory counts.

A public Storefront token remains optional. It may be supplied only through `EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` if required for a permitted scope. No Admin or private credential belongs in the mobile bundle.

## Official Shopify references

- [Storefront API](https://shopify.dev/docs/api/storefront) documents the `2026-07` endpoint, tokenless catalog/search/cart access, and public/mobile token use.
- [Storefront API mobile/headless overview](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api) distinguishes client-safe public tokens from private server-only tokens.
- [Checkout Kit](https://shopify.dev/docs/storefronts/mobile/checkout-kit) confirms React Native Checkout Kit accepts a Storefront cart `checkoutUrl`, presents Shopify checkout, and exposes completion/error lifecycle events.
- [Checkout Kit React Native repository](https://github.com/Shopify/checkout-sheet-kit-react-native) identifies native build requirements and the React Native SDK usage pattern.

## Android delivery validation

The Expo configuration uses application ID `ca.melato.app`, EAS `preview` APK and `production` AAB profiles, and Checkout Kit’s native module provider. Local Android prebuild completed successfully after Expo SDK dependency alignment. Expo doctor passed all 21 checks, and the Android JavaScript export completed successfully.

This sandbox has no Android SDK environment variables configured, so it cannot assemble a local Gradle APK. The available EAS CLI session was not authenticated, so no remote EAS artifact could be started. The project is otherwise configured for a logged-in EAS account to run `npx eas-cli init` followed by the documented preview/production build commands.
