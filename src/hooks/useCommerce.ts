import { useQuery } from '@tanstack/react-query';

import { catalogService } from '@/src/commerce/storefront/services';

export function useCollection(handle: string) {
  return useQuery({
    enabled: Boolean(handle),
    queryFn: () => catalogService.getCollection(handle),
    queryKey: ['collection', handle],
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
