import { createCartService } from '@/src/commerce/cart/service';
import { createCatalogService } from '@/src/commerce/storefront/catalog';
import { storefront } from '@/src/commerce/storefront/storefront';

export const catalogService = createCatalogService(storefront);
export const cartService = createCartService(storefront);
