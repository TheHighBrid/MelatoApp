import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/src/design/tokens';
import { formatMoney } from '@/src/lib/money';
import type { Product } from '@/src/types/commerce';

type ProductCardProps = {
  product: Pick<Product, 'handle' | 'title' | 'featuredImage' | 'availableForSale' | 'variants'>;
  width?: number;
};

export function ProductCard({ product, width }: ProductCardProps) {
  const firstVariant = product.variants[0];

  return (
    <Link href={{ pathname: '/product/[handle]', params: { handle: product.handle } }} asChild>
      <Pressable
        accessibilityLabel={`View ${product.title}`}
        accessibilityRole="button"
        style={[styles.root, width ? { flexGrow: 0, width } : styles.gridItem]}
      >
        <View style={styles.mediaWrap}>
          {product.featuredImage ? (
            <Image
              accessibilityLabel={product.featuredImage.altText ?? product.title}
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: product.featuredImage.url }}
              style={styles.media}
              transition={180}
            />
          ) : (
            <View accessibilityLabel={`${product.title} image unavailable`} style={styles.placeholder} />
          )}
          {!product.availableForSale ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SOLD OUT</Text>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
        {firstVariant ? <Text style={styles.price}>{formatMoney(firstVariant.price)}</Text> : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xs,
  },
  gridItem: {
    flex: 1,
  },
  mediaWrap: {
    aspectRatio: 0.76,
    backgroundColor: colors.graphite,
    overflow: 'hidden',
    position: 'relative',
  },
  media: {
    height: '100%',
    width: '100%',
  },
  placeholder: {
    backgroundColor: colors.graphite,
    height: '100%',
    width: '100%',
  },
  badge: {
    backgroundColor: colors.ink,
    bottom: spacing.xs,
    left: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
    position: 'absolute',
  },
  badgeText: {
    color: colors.bone,
    fontFamily: typography.meta.family,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  title: {
    color: colors.bone,
    fontFamily: typography.ui.family,
    fontSize: 13,
    lineHeight: 18,
    minHeight: 36,
  },
  price: {
    color: colors.muted,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: 1.1,
  },
});
