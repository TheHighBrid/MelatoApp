type GraphQLError = {
  message: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

type StorefrontClientConfig = {
  fetcher?: typeof fetch;
  shopDomain: string;
  storefrontAccessToken?: string;
};

export type StorefrontClient = {
  request: <TData>(query: string, variables?: Record<string, unknown>) => Promise<TData>;
};

const apiVersion = '2026-07';

export function createStorefrontClient({
  fetcher = fetch,
  shopDomain,
  storefrontAccessToken,
}: StorefrontClientConfig): StorefrontClient {
  const domain = shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!domain) {
    throw new Error('Shopify shop domain is required.');
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  return {
    async request<TData>(query: string, variables?: Record<string, unknown>): Promise<TData> {
      const response = await fetcher(endpoint, {
        body: JSON.stringify({ query, variables }),
        headers: {
          ...(storefrontAccessToken
            ? { 'X-Shopify-Storefront-Access-Token': storefrontAccessToken }
            : {}),
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Shopify request failed with status ${response.status}.`);
      }

      const payload = (await response.json()) as GraphQLResponse<TData>;
      if (payload.errors?.length) {
        throw new Error(payload.errors.map((error) => error.message).join(', '));
      }

      if (!payload.data) {
        throw new Error('Shopify returned an empty response.');
      }

      return payload.data;
    },
  };
}
