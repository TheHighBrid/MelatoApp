import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppHeader } from '@/src/components/AppHeader';
import { ScreenState } from '@/src/components/ScreenState';
import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { useCartMutations } from '@/src/hooks/useCart';
import { formatMoney } from '@/src/lib/money';
import { useCartStore } from '@/src/state/cartStore';

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const checkout = useShopifyCheckoutSheet();
  const { removeLine, updateLine } = useCartMutations();

  useEffect(() => {
    if (!cart?.checkoutUrl) {
      return;
    }
    checkout.preload(cart.checkoutUrl);
  }, [cart?.checkoutUrl, checkout]);

  useEffect(() => {
    const completed = checkout.addEventListener('completed', () => {
      clearCart();
      router.dismissAll();
      router.replace('/');
    });
    return () => completed?.remove();
  }, [checkout, clearCart]);

  if (!cart || cart.lines.length === 0) {
    return (
      <View style={styles.screen}>
        <AppHeader title="BAG" />
        <ScreenState
          actionLabel="Explore new arrivals"
          body="Your bag is ready for a considered selection."
          onAction={() => router.replace({ pathname: '/collection/[handle]', params: { handle: 'new-arrivals' } })}
          title="YOUR BAG IS EMPTY"
          variant="empty"
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="BAG" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>{cart.totalQuantity} {cart.totalQuantity === 1 ? 'piece' : 'pieces'}</Text>
        {cart.lines.map((line) => {
          const image = line.merchandise.image ?? line.merchandise.product.featuredImage;
          const isChanging = removeLine.isPending || updateLine.isPending;
          return (
            <View key={line.id} style={styles.line}>
              {image ? <Image cachePolicy="memory-disk" contentFit="cover" source={{ uri: image.url }} style={styles.image} /> : <View style={styles.placeholder} />}
              <View style={styles.lineCopy}>
                <Text style={styles.lineTitle}>{line.merchandise.product.title}</Text>
                <Text style={styles.variant}>{line.merchandise.title}</Text>
                <Text style={styles.linePrice}>{formatMoney(line.cost.totalAmount)}</Text>
                <View style={styles.actions}>
                  <Pressable accessibilityLabel="Decrease quantity" disabled={isChanging || line.quantity <= 1} onPress={() => updateLine.mutate({ lineId: line.id, quantity: line.quantity - 1 })} style={styles.quantityControl}>
                    <Text style={styles.quantityText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantityValue}>{line.quantity}</Text>
                  <Pressable accessibilityLabel="Increase quantity" disabled={isChanging} onPress={() => updateLine.mutate({ lineId: line.id, quantity: line.quantity + 1 })} style={styles.quantityControl}>
                    <Text style={styles.quantityText}>+</Text>
                  </Pressable>
                  <Pressable accessibilityLabel={`Remove ${line.merchandise.product.title}`} disabled={isChanging} onPress={() => removeLine.mutate(line.id)} style={styles.remove}>
                    <Text style={styles.removeLabel}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryAmount}>{formatMoney(cart.cost.subtotalAmount)}</Text>
          </View>
          <Text style={styles.delivery}>Delivery and taxes are confirmed securely during Shopify checkout.</Text>
          <AppButton disabled={!cart.checkoutUrl} onPress={() => checkout.present(cart.checkoutUrl)}>Secure checkout</AppButton>
          {removeLine.isError || updateLine.isError ? <Text style={styles.error}>We could not update your bag. Please try again.</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { padding: layout.gutter, paddingBottom: spacing.hero },
  kicker: { color: colors.muted, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, marginBottom: spacing.md, textTransform: 'uppercase' },
  line: { borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md },
  image: { backgroundColor: colors.graphite, height: 144, width: 104 },
  placeholder: { backgroundColor: colors.graphite, height: 144, width: 104 },
  lineCopy: { flex: 1, gap: spacing.xs },
  lineTitle: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 16, lineHeight: 21 },
  variant: { color: colors.muted, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  linePrice: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 11, letterSpacing: 1 },
  actions: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs, marginTop: 'auto' },
  quantityControl: { alignItems: 'center', borderColor: colors.line, borderWidth: 1, height: 32, justifyContent: 'center', width: 32 },
  quantityText: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 18 },
  quantityValue: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 10, minWidth: 18, textAlign: 'center' },
  remove: { marginLeft: spacing.sm, padding: spacing.xs },
  removeLabel: { color: colors.muted, fontFamily: typography.meta.family, fontSize: 9, letterSpacing: 1, textDecorationLine: 'underline', textTransform: 'uppercase' },
  summary: { gap: spacing.md, paddingTop: spacing.xl },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 16 },
  summaryAmount: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 13, letterSpacing: 1 },
  delivery: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 13, lineHeight: 20 },
  error: { color: '#E88F8A', fontFamily: typography.ui.family, fontSize: 13 },
});
