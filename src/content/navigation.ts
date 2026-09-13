export type PrimaryTab = {
  label: 'Home' | 'Shop' | 'Lookbook' | 'Saved' | 'Me';
  pathname: '/(tabs)' | '/shop' | '/lookbook' | '/saved' | '/me';
  icon: 'home' | 'grid' | 'book-open' | 'heart' | 'user';
};

export const primaryTabs: readonly PrimaryTab[] = [
  { label: 'Home', pathname: '/(tabs)', icon: 'home' },
  { label: 'Shop', pathname: '/shop', icon: 'grid' },
  { label: 'Lookbook', pathname: '/lookbook', icon: 'book-open' },
  { label: 'Saved', pathname: '/saved', icon: 'heart' },
  { label: 'Me', pathname: '/me', icon: 'user' },
];

export const globalActions = [
  { label: 'Search' as const, pathname: '/search' },
  { label: 'Bag' as const, pathname: '/cart' },
] as const;
