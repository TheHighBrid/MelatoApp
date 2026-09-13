import { createStorefrontClient } from '@/src/commerce/storefront/client';

const shopDomain = process.env.EXPO_PUBLIC_SHOPIFY_SHOP_DOMAIN ?? 'vtjufw-k7.myshopify.com';
const storefrontAccessToken = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export const storefront = createStorefrontClient({
  shopDomain,
  storefrontAccessToken,
});
