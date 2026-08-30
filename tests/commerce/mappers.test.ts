import { mapCart, mapProduct } from '@/src/commerce/storefront/mappers';

describe('Storefront response mappers', () => {
  it('maps Storefront product nodes without fabricating price or availability', () => {
    const product = mapProduct({
      id: 'gid://shopify/Product/1',
      handle: 'detour-tee',
      title: 'Detour Tee',
      description: 'Product copy',
      descriptionHtml: '<p>Product copy</p>',
      productType: 'Tee',
      tags: ['new-arrivals'],
      availableForSale: true,
      featuredImage: { url: 'https://cdn.shopify.com/tee.jpg', altText: null },
      images: { nodes: [{ url: 'https://cdn.shopify.com/tee.jpg', altText: null }] },
      options: [{ id: 'option-1', name: 'Size', values: ['S', 'M'] }],
      variants: {
        nodes: [
          {
            id: 'gid://shopify/ProductVariant/1',
            title: 'S',
            availableForSale: true,
            quantityAvailable: 3,
            price: { amount: '89.00', currencyCode: 'CAD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Size', value: 'S' }],
            image: null,
          },
        ],
      },
    });

    expect(product).toMatchObject({
      handle: 'detour-tee',
      availableForSale: true,
      variants: [{ title: 'S', price: { amount: '89.00' } }],
    });
  });

  it('maps cart merchandise as product variants for cart presentation', () => {
    const cart = mapCart({
      id: 'gid://shopify/Cart/1',
      checkoutUrl: 'https://melato.ca/cart/c/1',
      totalQuantity: 1,
      cost: {
        subtotalAmount: { amount: '89.00', currencyCode: 'CAD' },
        totalAmount: { amount: '100.57', currencyCode: 'CAD' },
      },
      lines: {
        nodes: [
          {
            id: 'gid://shopify/CartLine/1',
            quantity: 1,
            cost: { totalAmount: { amount: '89.00', currencyCode: 'CAD' } },
            merchandise: {
              id: 'gid://shopify/ProductVariant/1',
              title: 'S',
              availableForSale: true,
              price: { amount: '89.00', currencyCode: 'CAD' },
              selectedOptions: [{ name: 'Size', value: 'S' }],
              image: null,
              product: { handle: 'detour-tee', title: 'Detour Tee', featuredImage: null },
            },
          },
        ],
      },
    });

    expect(cart.lines[0]).toMatchObject({
      quantity: 1,
      merchandise: { product: { title: 'Detour Tee' } },
    });
  });
});
