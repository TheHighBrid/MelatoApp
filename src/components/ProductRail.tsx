import { ScrollView, StyleSheet, View } from 'react-native';

import { layout, spacing } from '@/src/design/tokens';
import { ProductCard } from '@/src/components/ProductCard';
import type { CatalogProduct } from '@/src/commerce/storefront/catalog';

type ProductRailProps = {
  products: CatalogProduct[];
};

export function ProductRail({ products }: ProductRailProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {products.map((product) => <ProductCard key={product.id} product={product} width={164} />)}
      <View style={styles.trailingSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingHorizontal: layout.gutter,
  },
  trailingSpace: { width: layout.gutter - spacing.sm },
});
