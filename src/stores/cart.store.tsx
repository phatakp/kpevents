import { create } from "zustand";
import { getStepAmount, getStepQty } from "@/lib/utils";
import type { BookingRequest } from "@/types";

type CartState = {
    items: BookingRequest[];
};

type CartActions = {
    initCart: (items: BookingRequest[]) => void;
    addToCart: (item: BookingRequest) => void;
    deleteFromCart: (itemId: number) => void;
    incrementQty: (itemId: number) => void;
    decrementQty: (itemId: number) => void;
    incrementAmt: (itemId: number) => void;
    decrementAmt: (itemId: number) => void;
    clearCart: () => void;
};

type CartStore = CartState & CartActions;

export const useCart = create<CartStore>((set) => ({
    items: [] as BookingRequest[],
    initCart: (items: BookingRequest[]) =>
        set((state) => ({ ...state, items })),

    addToCart: (item: BookingRequest) =>
        set((state) => ({ ...state, items: [...state.items, item] })),

    deleteFromCart: (itemId: number) =>
        set((state) => {
            const item = state.items.find((i) => i.itemId === itemId);
            if (!item) return state;

            return {
                ...state,
                items: state.items.filter((i) => i.itemId !== item.itemId),
            };
        }),

    incrementQty: (itemId: number) =>
        set((state) => {
            const item = state.items.find((i) => i.itemId === itemId);
            if (!item) return state;
            const incrementQty = getStepQty(item.bookingQty);

            item.bookingQty = Math.min(
                item.totalQty,
                item.bookingQty + incrementQty,
            );
            item.bookingAmt = item.price * item.bookingQty;
            const items = state.items.map((i) =>
                i.itemId === itemId ? item : i,
            );
            return {
                ...state,
                items,
            };
        }),

    decrementQty: (itemId: number) =>
        set((state) => {
            const item = state.items.find((i) => i.itemId === itemId);
            if (!item) return state;

            const decrementQty = getStepQty(item.bookingQty);
            item.bookingQty = Math.max(0, item.bookingQty - decrementQty);
            item.bookingAmt = item.price * item.bookingQty;
            const items = state.items
                .filter((i) => i.bookingQty > 0)
                .map((i) => (i.itemId === itemId ? item : i));
            return {
                ...state,
                items,
            };
        }),

    incrementAmt: (itemId: number) =>
        set((state) => {
            const item = state.items.find((i) => i.itemId === itemId);
            if (!item) return state;

            const incrementAmt = getStepAmount(item.bookingAmt);

            item.bookingAmt = Math.min(
                item.totalAmt,
                item.bookingAmt + incrementAmt,
            );
            const items = state.items.map((i) =>
                i.itemId === itemId ? item : i,
            );
            return {
                ...state,
                items,
            };
        }),

    decrementAmt: (itemId: number) =>
        set((state) => {
            const item = state.items.find((i) => i.itemId === itemId);
            if (!item) return state;

            const decrementAmt = getStepAmount(item.bookingAmt);

            item.bookingAmt = Math.max(0, item.bookingAmt - decrementAmt);
            const items = state.items
                .filter((i) => i.bookingAmt > 0)
                .map((i) => (i.itemId === itemId ? item : i));
            return {
                ...state,
                items,
            };
        }),
    clearCart: () => set(() => ({ items: [] })),
}));

export const useCartTotal = () => {
    const items = useCart((state) => state.items);
    return items.reduce((acc, b) => acc + b.bookingAmt, 0);
};
