import { IProductAddedToCart } from "@/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [] as IProductAddedToCart[], loadCart: false },
  reducers: {
    syncCartFromCache: (
      state,
      action: PayloadAction<IProductAddedToCart[]>
    ) => {
      state.products = action.payload;
      state.loadCart = true;
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
