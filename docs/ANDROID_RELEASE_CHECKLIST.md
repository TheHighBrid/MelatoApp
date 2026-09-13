# Android Release Checklist

## Build identity

| Item | Value |
| --- | --- |
| Application name | Melato |
| Android package ID | `ca.melato.app` |
| Version | `1.0.0` |
| Internal artifact | EAS `preview` APK |
| Play artifact | EAS `production` AAB |

## Before remote build

- [ ] Log in to the correct Expo/EAS account.
- [ ] Run `npx eas-cli init` from this repository to create/link the EAS project and populate `expo.extra.eas.projectId`.
- [ ] Confirm the default Android signing credential is owned by the Melato/EAS organization and back up the keystore according to account policy.
- [ ] Confirm `.env` contains no private, Admin, customer, checkout, or payment credentials.
- [ ] Run `pnpm lint`, `pnpm typecheck`, and `pnpm test`.

## Internal Android APK

- [ ] Run `npx eas-cli build --platform android --profile preview`.
- [ ] Install the returned APK on a physical Android device.
- [ ] Validate Home, collection browsing, search, PDP, variant availability, add to Bag, quantity update, remove, app restart, and Checkout Kit presentation.
- [ ] Test normal network loss and restore.
- [ ] Complete a Shopify test/sandbox checkout only after merchant approval.

## Google Play AAB

- [ ] Run `npx eas-cli build --platform android --profile production`.
- [ ] Upload the AAB to the Play Console internal test track.
- [ ] Add testers and validate the closed-test/public-production eligibility required by the current developer-account status.
- [ ] Enter the privacy-policy URL and support contact.
- [ ] Add phone and 7-inch/10-inch screenshots, feature graphic, short description, and full description.
- [ ] Complete Data safety, content rating, target audience, app access, and ads declarations.
- [ ] Confirm the Play signing configuration and release notes.

## Release guardrails

- [ ] Never test production payments without explicit merchant authorization.
- [ ] Never ship a client build containing an Admin API token, private Storefront token, customer OAuth token, or payment secret.
- [ ] Keep Shopify as the source of truth for product availability, price, cart, checkout, customer, and order state.
