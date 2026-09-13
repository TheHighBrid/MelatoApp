import { useCartStore } from '@/src/state/cartStore';

const cartFixture = {
  id: 'gid://shopify/Cart/cart-1',
  checkoutUrl: 'https://melato.ca/cart/c/cart-1',
  totalQuantity: 2,
  lines: [],
  cost: {
    subtotalAmount: { amount: '250.00', currencyCode: 'CAD' },
    totalAmount: { amount: '282.50', currencyCode: 'CAD' },
  },
};

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('stores the live Shopify cart used by the global bag count', () => {
    useCartStore.getState().setCart(cartFixture);

    expect(useCartStore.getState().cart).toMatchObject({
      id: 'gid://shopify/Cart/cart-1',
      totalQuantity: 2,
    });
  });

  it('clears cart state after a completed checkout', () => {
    useCartStore.getState().setCart(cartFixture);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().cart).toBeNull();
  });

  it('exposes persisted cart state for normal application restarts', () => {
    expect(useCartStore.persist).toBeDefined();
  });
});
