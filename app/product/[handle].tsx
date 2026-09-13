import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppHeader } from '@/src/components/AppHeader';
import { ScreenState } from '@/src/components/ScreenState';
import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { useCartMutations } from '@/src/hooks/useCart';
import { useProduct } from '@/src/hooks/useCommerce';
import { formatMoney } from '@/src/lib/money';

export default function ProductDetailScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const { width: viewportWidth } = useWindowDimensions();
  const productQuery = useProduct(handle ?? '');
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const { addItem } = useCartMutations();

  if (productQuery.isLoading) {
    return (
      <View style={styles.screen}>
        <AppHeader title="MELATO" />
        <ScreenState title="Loading piece" variant="loading" />
      </View>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <View style={styles.screen}>
        <AppHeader title="MELATO" />
        <ScreenState
          actionLabel="Return to shop"
          body="This piece could not be reached. Check your connection and try again."
          onAction={() => router.replace('/shop')}
          title="PIECE UNAVAILABLE"
          variant="error"
        />
      </View>
    );
  }

  const product = productQuery.data;
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId)
    ?? product.variants.find((variant) => variant.availableForSale)
    ?? product.variants[0];
  const gallery = product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : [];
  const canAdd = Boolean(selectedVariant?.availableForSale) && !addItem.isPending;

  return (
    <View style={styles.screen}>
      <AppHeader title="MELATO" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {gallery.length ? gallery.map((image, index) => (
            <Image
              key={`${image.url}-${index}`}
              accessibilityLabel={image.altText ?? `${product.title} image ${index + 1}`}
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: image.url }}
              style={[styles.image, { width: viewportWidth }]}
              transition={180}
            />
          )) : <View accessibilityLabel={`${product.title} image unavailable`} style={[styles.imagePlaceholder, { width: viewportWidth }]} />}
        </ScrollView>

        <View style={styles.detail}>
          <Text style={styles.eyebrow}>{product.productType || 'Melato piece'}</Text>
          <Text accessibilityRole="header" style={styles.title}>{product.title}</Text>
          {selectedVariant ? <Text style={styles.price}>{formatMoney(selectedVariant.price)}</Text> : null}
          {product.description ? <Text style={styles.description}>{product.description}</Text> : null}

          {product.variants.length > 1 ? (
            <View style={styles.variantSection}>
              <Text style={styles.optionLabel}>Select an option</Text>
              <View style={styles.variantGrid}>
                {product.variants.map((variant) => {
                  const selected = variant.id === selectedVariant?.id;
                  return (
                    <Pressable
                      key={variant.id}
                      accessibilityLabel={`${variant.title}${variant.availableForSale ? '' : ', sold out'}`}
                      accessibilityRole="button"
                      accessibilityState={{ disabled: !variant.availableForSale, selected }}
                      disabled={!variant.availableForSale}
                      onPress={() => setSelectedVariantId(variant.id)}
                      style={[styles.variant, selected && styles.variantSelected, !variant.availableForSale && styles.variantUnavailable]}
                    >
                      <Text style={[styles.variantText, !variant.availableForSale && styles.variantTextUnavailable]}>{variant.title}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          <AppButton
            disabled={!canAdd}
            onPress={() => selectedVariant && addItem.mutate({ merchandiseId: selectedVariant.id })}
          >
            {addItem.isPending ? 'Adding' : selectedVariant?.availableForSale ? 'Add to bag' : 'Sold out'}
          </AppButton>
          {addItem.isError ? <Text style={styles.error}>{addItem.error.message}</Text> : null}

          <View style={styles.detailBlocks}>
            <DetailBlock heading="Construction" value="Product construction details are maintained in Shopify and will appear here as they are configured." />
            <DetailBlock heading="Delivery & returns" value="Delivery and return terms are confirmed in Shopify checkout and Melato policies." />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailBlock({ heading, value }: { heading: string; value: string }) {
  return (
    <View style={styles.detailBlock}>
      <Text style={styles.blockHeading}>{heading}</Text>
      <Text style={styles.blockValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { paddingBottom: spacing.hero },
  gallery: { aspectRatio: 0.76, backgroundColor: colors.graphite },
  image: { height: '100%' },
  imagePlaceholder: { backgroundColor: colors.graphite, height: '100%' },
  detail: { gap: spacing.md, padding: layout.gutter },
  eyebrow: { color: colors.accent, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, textTransform: 'uppercase' },
  title: { color: colors.bone, fontFamily: typography.display.family, fontSize: 46, letterSpacing: typography.display.letterSpacing, lineHeight: 44 },
  price: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 13, letterSpacing: 1 },
  description: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 15, lineHeight: 23 },
  variantSection: { gap: spacing.sm, marginTop: spacing.sm },
  optionLabel: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, textTransform: 'uppercase' },
  variantGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  variant: { alignItems: 'center', borderColor: colors.line, borderWidth: 1, justifyContent: 'center', minHeight: 46, minWidth: 52, paddingHorizontal: spacing.sm },
  variantSelected: { backgroundColor: colors.bone, borderColor: colors.bone },
  variantUnavailable: { opacity: 0.3 },
  variantText: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: 1 },
  variantTextUnavailable: { textDecorationLine: 'line-through' },
  error: { color: '#E88F8A', fontFamily: typography.ui.family, fontSize: 13, lineHeight: 19 },
  detailBlocks: { borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth, marginTop: spacing.md },
  detailBlock: { borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth, gap: spacing.xs, paddingVertical: spacing.lg },
  blockHeading: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, textTransform: 'uppercase' },
  blockValue: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 14, lineHeight: 21 },
});
