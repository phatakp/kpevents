import { create } from 'zustand';

type CartItem = {
  itemName: string;
  bookAmt: number;
  totAmt: number;
};

type CartState = {
  type: 'temple';
  cart: { items: CartItem[] };
};

type CartActions = {
  addToCart: (item: CartItem) => void;
  deleteFromCart: (itemName: string) => void;
  incrementAmt: (itemName: string) => void;
  decrementAmt: (itemName: string) => void;
  reset: () => void;
};

type CartStore = CartState & { cartActions: CartActions };

export const useTempleCartStore = create<CartStore>((set) => ({
  type: 'temple',
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
    incrementAmt: (itemName: string) =>
      set((state) => ({
        cart: {
          items: state.cart.items.map((i) =>
            i.itemName === itemName
              ? {
                  ...i,
                  bookAmt:
                    i.bookAmt + 100 > i.totAmt ? i.totAmt : i.bookAmt + 100,
                }
              : i
          ),
        },
      })),
    decrementAmt: (itemName: string) =>
      set((state) => ({
        cart: {
          items: state.cart.items
            .filter(
              (b) =>
                b.itemName !== itemName ||
                (b.itemName === itemName && b.bookAmt > 100)
            )
            .map((b) =>
              b.itemName === itemName ? { ...b, bookQty: b.bookAmt - 100 } : b
            ),
        },
      })),
  },
}));
