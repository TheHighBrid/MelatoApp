import { useMutation } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';

import { cartService } from '@/src/commerce/storefront/services';
import { useCartStore } from '@/src/state/cartStore';

export function useCartMutations() {
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  const addItem = useMutation({
    mutationFn: async ({ merchandiseId, quantity = 1 }: { merchandiseId: string; quantity?: number }) => {
      const updatedCart = await cartService.addItem(cart, merchandiseId, quantity);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      setCart(updatedCart);
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
  });

  const updateLine = useMutation({
    mutationFn: async ({ lineId, quantity }: { lineId: string; quantity: number }) => {
      if (!cart) {
        throw new Error('There is no active cart.');
      }
      return cartService.updateLine(cart.id, lineId, quantity);
    },
    onSuccess: setCart,
  });

  const removeLine = useMutation({
    mutationFn: async (lineId: string) => {
      if (!cart) {
        throw new Error('There is no active cart.');
      }
      return cartService.removeLine(cart.id, lineId);
    },
    onSuccess: setCart,
  });

  return { addItem, removeLine, updateLine };
}
