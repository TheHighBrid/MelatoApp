import { createCartService } from '@/src/commerce/cart/service';

const cartResponse = {
  id: 'gid://shopify/Cart/1',
  checkoutUrl: 'https://melato.ca/cart/c/1',
  totalQuantity: 1,
  cost: {
    subtotalAmount: { amount: '89.00', currencyCode: 'CAD' },
    totalAmount: { amount: '100.57', currencyCode: 'CAD' },
  },
  lines: { nodes: [] },
};

describe('Shopify cart service', () => {
  it('creates a real Storefront cart with a selected merchandise variant', async () => {
    const request = vi.fn().mockResolvedValue({
      cartCreate: { cart: cartResponse, userErrors: [] },
    });
    const service = createCartService({ request });

    const cart = await service.addItem(null, 'gid://shopify/ProductVariant/1');

    expect(cart).toMatchObject({ id: 'gid://shopify/Cart/1', totalQuantity: 1 });
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('mutation CartCreate'),
      expect.objectContaining({
        input: { lines: [{ merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 1 }] },
      }),
    );
  });

  it('throws Shopify cart user errors instead of claiming an item was added', async () => {
    const request = vi.fn().mockResolvedValue({
      cartCreate: { cart: null, userErrors: [{ message: 'Variant is sold out.' }] },
    });
    const service = createCartService({ request });

    await expect(service.addItem(null, 'gid://shopify/ProductVariant/1')).rejects.toThrow('Variant is sold out.');
  });
});
