import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { catalogService } from '@/src/commerce/storefront/services';

type CollectionPage = Awaited<ReturnType<typeof catalogService.getCollection>>;

export function useCollection(handle: string) {
  return useQuery({
    enabled: Boolean(handle),
    queryFn: () => catalogService.getCollection(handle),
    queryKey: ['collection', handle],
  });
}

export function useInfiniteCollection(handle: string) {
  return useInfiniteQuery<CollectionPage, Error, CollectionPage[], readonly ['collection-infinite', string], string | null>({
    enabled: Boolean(handle),
    getNextPageParam: (lastPage) => (
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined
    ),
    initialPageParam: null,
    queryFn: ({ pageParam }) => catalogService.getCollection(handle, pageParam),
    queryKey: ['collection-infinite', handle] as const,
    select: (data) => data.pages,
  });
}

export function useProduct(handle: string) {
  return useQuery({
    enabled: Boolean(handle),
    queryFn: () => catalogService.getProduct(handle),
    queryKey: ['product', handle],
  });
}

export function useSearch(query: string) {
  return useQuery({
    enabled: query.trim().length > 1,
    queryFn: () => catalogService.search(query.trim()),
    queryKey: ['search', query.trim()],
  });
}

export function usePredictiveSearch(query: string) {
  return useQuery({
    enabled: query.trim().length > 1,
    queryFn: () => catalogService.predictiveSearch(query.trim()),
    queryKey: ['predictive-search', query.trim()],
    staleTime: 15_000,
  });
}
