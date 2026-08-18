import { createCatalogService } from '@/src/commerce/storefront/catalog';

const productNode = {
  id: 'gid://shopify/Product/1',
  handle: 'detour-tee',
  title: 'Detour Tee',
  availableForSale: true,
  featuredImage: { url: 'https://cdn.shopify.com/tee.jpg', altText: 'Detour Tee' },
  variants: {
    nodes: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'S',
        availableForSale: true,
        price: { amount: '89.00', currencyCode: 'CAD' },
        selectedOptions: [{ name: 'Size', value: 'S' }],
      },
    ],
  },
};

describe('Shopify catalog service', () => {
  it('requests a current collection by handle and returns Shopify product-card data', async () => {
    const request = vi.fn().mockResolvedValue({
      collection: {
        id: 'gid://shopify/Collection/1',
        handle: 'new-arrivals',
        title: 'New Arrivals',
        description: 'Recent additions.',
        image: null,
        products: { nodes: [productNode], pageInfo: { hasNextPage: false, endCursor: null } },
      },
    });
    const service = createCatalogService({ request });

    const result = await service.getCollection('new-arrivals');

    expect(request).toHaveBeenCalledWith(expect.stringContaining('query Collection'), { handle: 'new-arrivals', cursor: null });
    expect(result).toMatchObject({
      collection: { handle: 'new-arrivals', title: 'New Arrivals' },
      products: [{ handle: 'detour-tee', variants: [{ price: { amount: '89.00' } }] }],
    });
  });

  it('maps a full Storefront product response before the PDP consumes images and variants', async () => {
    const request = vi.fn().mockResolvedValue({
      product: {
        ...productNode,
        description: 'Product copy',
        descriptionHtml: '<p>Product copy</p>',
        productType: 'Tee',
        tags: ['new-arrivals'],
        images: { nodes: [{ url: 'https://cdn.shopify.com/tee.jpg', altText: null }] },
        options: [{ id: 'option-1', name: 'Size', values: ['S'] }],
      },
    });
    const service = createCatalogService({ request });

    const product = await service.getProduct('detour-tee');

    expect(product.images).toEqual([{ url: 'https://cdn.shopify.com/tee.jpg', altText: null }]);
    expect(product.variants[0]).toMatchObject({ id: 'gid://shopify/ProductVariant/1' });
  });

  it('does not turn an unknown collection into a fake empty collection', async () => {
    const service = createCatalogService({ request: vi.fn().mockResolvedValue({ collection: null }) });

    await expect(service.getCollection('does-not-exist')).rejects.toThrow('Collection not found.');
  });
});
