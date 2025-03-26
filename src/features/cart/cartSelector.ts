import { IProductAddedToCart } from "@/types.ts";

export const selectProductsAddedToCart = (state: {
  cart: {
    products: IProductAddedToCart[];
  };
}) => state.cart.products;
