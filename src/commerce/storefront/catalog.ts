import { mapProduct, type StorefrontProductNode } from '@/src/commerce/storefront/mappers';
import { COLLECTION_QUERY, PRODUCT_QUERY, PREDICTIVE_SEARCH_QUERY, SEARCH_QUERY } from '@/src/commerce/storefront/queries';
import type { Collection, Image, Product, ProductVariant } from '@/src/types/commerce';

export type CatalogProduct = Pick<
  Product,
  'id' | 'handle' | 'title' | 'availableForSale' | 'featuredImage'
> & { variants: ProductVariant[] };

type StorefrontRequest = <TData>(query: string, variables?: Record<string, unknown>) => Promise<TData>;

type ProductCardNode = CatalogProduct & {
  variants: { nodes: ProductVariant[] };
};

type CollectionNode = Collection & {
  products: {
    nodes: ProductCardNode[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

function mapProductCard(node: ProductCardNode): CatalogProduct {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    availableForSale: node.availableForSale,
    featuredImage: node.featuredImage ?? null,
    variants: node.variants.nodes.map((variant) => ({
      ...variant,
      compareAtPrice: variant.compareAtPrice ?? null,
      image: variant.image ?? null,
    })),
  };
}

function mapCollection(node: CollectionNode): Collection {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    image: node.image ?? null,
  };
}

export function createCatalogService(client: { request: StorefrontRequest }) {
  return {
    async getCollection(handle: string, cursor: string | null = null) {
      const data = await client.request<{ collection: CollectionNode | null }>(COLLECTION_QUERY, { handle, cursor });
      if (!data.collection) {
        throw new Error('Collection not found.');
      }

      return {
        collection: mapCollection(data.collection),
        pageInfo: data.collection.products.pageInfo,
        products: data.collection.products.nodes.map(mapProductCard),
      };
    },

    async getProduct(handle: string) {
      const data = await client.request<{ product: StorefrontProductNode | null }>(PRODUCT_QUERY, { handle });
      if (!data.product) {
        throw new Error('Product not found.');
      }

      return mapProduct(data.product);
    },

    async search(query: string, cursor: string | null = null) {
      const data = await client.request<{
        search: { nodes: ProductCardNode[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
      }>(SEARCH_QUERY, { query, cursor });
      return {
        pageInfo: data.search.pageInfo,
        products: data.search.nodes.map(mapProductCard),
      };
    },

    async predictiveSearch(query: string) {
      const data = await client.request<{
        predictiveSearch: { products: ProductCardNode[]; collections: (Pick<Collection, 'id' | 'handle' | 'title'> & { image?: Image | null })[] };
      }>(PREDICTIVE_SEARCH_QUERY, { query });
      return {
        collections: data.predictiveSearch.collections.map((collection) => ({ ...collection, image: collection.image ?? null })),
        products: data.predictiveSearch.products.map(mapProductCard),
      };
    },
  };
}
