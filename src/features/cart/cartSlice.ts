import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductAddedToCart } from "@/types.ts";
import { cacheCart } from "@/const.ts";

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [] as IProductAddedToCart[] },
  reducers: {
    syncCartFromCache: (state) => {
      const cache = localStorage.getItem(cacheCart);
      if (cache) {
        state.products = JSON.parse(cache);
      }
    },
    addProductToCart: (state, action: PayloadAction<IProductAddedToCart>) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProductToCart,
  syncCartFromCache,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
