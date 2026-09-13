import { useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/src/components/AppHeader';
import { ProductCard } from '@/src/components/ProductCard';
import { ScreenState } from '@/src/components/ScreenState';
import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { useInfiniteCollection } from '@/src/hooks/useCommerce';

export default function CollectionScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const collection = useInfiniteCollection(handle ?? '');

  if (collection.isLoading) {
    return (
      <View style={styles.screen}>
        <AppHeader title="SHOP" />
        <ScreenState title="Loading collection" variant="loading" />
      </View>
    );
  }

  if (collection.isError) {
    return (
      <View style={styles.screen}>
        <AppHeader title="SHOP" />
        <ScreenState
          actionLabel="Return to shop"
          body="The current collection could not be reached. Check your connection and try again."
          onAction={() => router.replace('/shop')}
          title="COLLECTION UNAVAILABLE"
          variant="error"
        />
      </View>
    );
  }

  const pages = collection.data?.pages ?? [];
  const collectionMeta = pages[0]?.collection;
  const products = pages.flatMap((page) => page.products);

  if (!collectionMeta || products.length === 0) {
    return (
      <View style={styles.screen}>
        <AppHeader title="SHOP" />
        <ScreenState
          actionLabel="View new arrivals"
          body="There are no pieces in this collection at the moment."
          onAction={() => router.replace({ pathname: '/collection/[handle]', params: { handle: 'new-arrivals' } })}
          title="NO PIECES FOUND"
          variant="empty"
        />
      </View>
    );
  }

  const loadedCountLabel = collection.hasNextPage ? `${products.length}+ pieces` : `${products.length} ${products.length === 1 ? 'piece' : 'pieces'}`;

  return (
    <View style={styles.screen}>
      <AppHeader title="SHOP" />
      <FlatList
        ListFooterComponent={collection.isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator color={colors.bone} />
          </View>
        ) : null}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Collection</Text>
            <Text accessibilityRole="header" style={styles.title}>{collectionMeta.title}</Text>
            {collectionMeta.description ? <Text style={styles.description}>{collectionMeta.description}</Text> : null}
            <Text style={styles.count}>{loadedCountLabel}</Text>
          </View>
        }
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        data={products}
        keyExtractor={(product) => product.id}
        numColumns={2}
        onEndReached={() => {
          if (collection.hasNextPage && !collection.isFetchingNextPage) {
            void collection.fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.6}
        refreshControl={<RefreshControl onRefresh={collection.refetch} refreshing={collection.isRefetching && !collection.isFetchingNextPage} tintColor={colors.bone} />}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { gap: spacing.md, paddingBottom: spacing.hero },
  header: {
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: layout.gutter,
  },
  eyebrow: { color: colors.accent, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, textTransform: 'uppercase' },
  title: { color: colors.bone, fontFamily: typography.display.family, fontSize: 46, letterSpacing: typography.display.letterSpacing, lineHeight: 44 },
  description: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 15, lineHeight: 22, maxWidth: 330 },
  count: { color: colors.muted, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: 1.2, marginTop: spacing.sm, textTransform: 'uppercase' },
  row: { gap: spacing.sm, paddingHorizontal: layout.gutterCompact },
  footerLoader: { alignItems: 'center', justifyContent: 'center', minHeight: 72 },
});
