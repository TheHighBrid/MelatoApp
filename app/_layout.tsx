import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopifyCheckoutSheetProvider } from '@shopify/checkout-sheet-kit';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/src/design/tokens';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60_000,
            gcTime: 10 * 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ShopifyCheckoutSheetProvider
          configuration={{
            preloading: true,
            colors: {
              android: {
                backgroundColor: colors.bone,
                headerBackgroundColor: colors.bone,
                headerTextColor: colors.ink,
                closeButtonColor: colors.ink,
                progressIndicator: colors.ink,
              },
            },
          }}
        >
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              animation: 'fade',
              contentStyle: { backgroundColor: colors.ink },
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="collection/[handle]" />
            <Stack.Screen name="product/[handle]" />
            <Stack.Screen name="search" options={{ presentation: 'modal' }} />
            <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
          </Stack>
        </ShopifyCheckoutSheetProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
