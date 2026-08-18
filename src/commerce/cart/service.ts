import { mapCart } from '@/src/commerce/storefront/mappers';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from '@/src/commerce/storefront/queries';
import type { Cart } from '@/src/types/commerce';

type StorefrontRequest = <TData>(query: string, variables?: Record<string, unknown>) => Promise<TData>;

type CartMutationResult = {
  cart: unknown | null;
  userErrors: { message: string }[];
};

type CartServiceClient = {
  request: StorefrontRequest;
};

function requireCart(result: CartMutationResult): Cart {
  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors.map((error) => error.message).join(', '));
  }

  if (!result.cart) {
    throw new Error('Shopify did not return an updated cart.');
  }

  return mapCart(result.cart as Parameters<typeof mapCart>[0]);
}

export function createCartService(client: CartServiceClient) {
  return {
    async addItem(cart: Cart | null, merchandiseId: string, quantity = 1): Promise<Cart> {
      if (!cart) {
        const data = await client.request<{ cartCreate: CartMutationResult }>(CART_CREATE_MUTATION, {
          input: { lines: [{ merchandiseId, quantity }] },
        });
        return requireCart(data.cartCreate);
      }

      const data = await client.request<{ cartLinesAdd: CartMutationResult }>(CART_LINES_ADD_MUTATION, {
        cartId: cart.id,
        lines: [{ merchandiseId, quantity }],
      });
      return requireCart(data.cartLinesAdd);
    },

    async updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
      const data = await client.request<{ cartLinesUpdate: CartMutationResult }>(CART_LINES_UPDATE_MUTATION, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });
      return requireCart(data.cartLinesUpdate);
    },

    async removeLine(cartId: string, lineId: string): Promise<Cart> {
      const data = await client.request<{ cartLinesRemove: CartMutationResult }>(CART_LINES_REMOVE_MUTATION, {
        cartId,
        lineIds: [lineId],
      });
      return requireCart(data.cartLinesRemove);
    },
  };
}
