import { createStorefrontClient } from '@/src/commerce/storefront/client';

describe('Shopify Storefront client', () => {
  it('sends GraphQL queries to the versioned Storefront endpoint with only the public token', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { shop: { name: 'Melato' } } }),
    });
    const client = createStorefrontClient({
      fetcher,
      shopDomain: 'melato.ca',
      storefrontAccessToken: 'public-token',
    });

    await expect(client.request<{ shop: { name: string } }>('query { shop { name } }')).resolves.toEqual({
      shop: { name: 'Melato' },
    });

    expect(fetcher).toHaveBeenCalledWith(
      'https://melato.ca/api/2026-07/graphql.json',
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Shopify-Storefront-Access-Token': 'public-token',
        }),
        method: 'POST',
      }),
    );
  });

  it('surfaces Storefront GraphQL user-facing errors', async () => {
    const client = createStorefrontClient({
      fetcher: vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ errors: [{ message: 'Unavailable' }] }),
      }),
      shopDomain: 'melato.ca',
      storefrontAccessToken: 'public-token',
    });

    await expect(client.request('query { shop { name } }')).rejects.toThrow('Unavailable');
  });
});
