import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Cart } from '@/src/types/commerce';

type CartState = {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      setCart: (cart) => set({ cart }),
      clearCart: () => set({ cart: null }),
    }),
    {
      name: 'melato-cart-v1',
      partialize: (state) => ({ cart: state.cart }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
