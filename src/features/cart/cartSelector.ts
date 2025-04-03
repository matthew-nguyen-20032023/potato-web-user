import { IProductAddedToCart } from "@/types.ts";

export const selectProductsAddedToCart = (state: {
  cart: {
    products: IProductAddedToCart[];
  };
}) => state.cart.products;

export const selectLoadCart = (state: {
  cart: {
    loadCart: boolean;
  };
}) => state.cart.loadCart;

export const selectIsOpenCart = (state: {
  cart: {
    isOpenCart: boolean;
  };
}) => state.cart.isOpenCart;
