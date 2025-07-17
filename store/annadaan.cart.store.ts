import { create } from 'zustand';

type CartItem = {
  itemName: string;
  totQty: number;
  bookQty: number;
  price: number;
};

type CartState = {
  type: 'annadaan';
  cart: { items: CartItem[] };
};

type CartActions = {
  addToCart: (item: CartItem) => void;
  deleteFromCart: (itemName: string) => void;
  incrementQty: (itemName: string) => void;
  decrementQty: (itemName: string) => void;
  reset: () => void;
};

type CartStore = CartState & { cartActions: CartActions };

export const useAnnadaanCartStore = create<CartStore>((set) => ({
  type: 'annadaan',
  cart: { items: [] },
  cartActions: {
    reset: () => set({ cart: { items: [] } }),
    addToCart: (item: CartItem) =>
      set((state) => ({
        cart: { items: [...(state.cart?.items ?? []), item] },
      })),
    deleteFromCart: (itemName: string) =>
      set((state) => ({
        cart: {
          items: state.cart.items.filter((i) => i.itemName !== itemName),
        },
      })),
    incrementQty: (itemName: string) =>
      set((state) => ({
        cart: {
          items: state.cart.items.map((i) =>
            i.itemName === itemName ? { ...i, bookQty: i.bookQty + 0.5 } : i
          ),
        },
      })),
    decrementQty: (itemName: string) =>
      set((state) => ({
        cart: {
          items: state.cart.items
            .filter(
              (b) =>
                b.itemName !== itemName ||
                (b.itemName === itemName && b.bookQty > 0.5)
            )
            .map((b) =>
              b.itemName === itemName ? { ...b, bookQty: b.bookQty - 0.5 } : b
            ),
        },
      })),
  },
}));
