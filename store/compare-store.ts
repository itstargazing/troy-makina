import { create } from "zustand";
import { Product } from "@/lib/products";

type CompareState = {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareState>((set) => ({
  items: [],
  toggle: (product) =>
    set((state) => {
      const exists = state.items.find((p) => p.id === product.id);
      if (exists) {
        return { items: state.items.filter((p) => p.id !== product.id) };
      }
      if (state.items.length >= 3) {
        return state; // max 3
      }
      return { items: [...state.items, product] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  clear: () => set({ items: [] }),
}));

