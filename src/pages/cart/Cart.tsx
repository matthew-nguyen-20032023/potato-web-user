import { Modal } from "flowbite";
import { cacheCart } from "@/const.ts";
import { Link } from "react-router-dom";
import {
  selectIsOpenCart,
  selectLoadCart,
  selectProductsAddedToCart,
} from "@/features/cart/cartSelector.ts";
import {
  addProductToCart,
  removeFromCart,
  triggerOpenAndHideCart,
} from "@/features/cart/cartSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RefObject, useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { IProductAddedToCart } from "@/types.ts";
import { calculateFinalPrice } from "@/utils/helper.ts";

export default function Cart({
  cartButtonRef,
}: {
  cartButtonRef: RefObject<HTMLButtonElement>;
}) {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsAddedToCart);
  const isCartLoad = useSelector(selectLoadCart);
  const isOpenCart = useSelector(selectIsOpenCart);
  const [modal, setModal] = useState<Modal>();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleAddProductToCart = (product: IProductAddedToCart) => {
    dispatch(addProductToCart({ ...product, quantity: 1 }));
  };
  const handleMinusProductFromCart = (product: IProductAddedToCart) => {
    dispatch(addProductToCart({ ...product, quantity: -1 }));
  };

  useEffect(() => {
    if (isCartLoad) localStorage.setItem(cacheCart, JSON.stringify(products));
  }, [products, isCartLoad]);

  useEffect(() => {
    const modalElementCreate: HTMLElement | null =
      document.querySelector("#your-cart");

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(e.target as Node)
      ) {
        dispatch(triggerOpenAndHideCart(false));
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    const modalOptions = {
      backdropClasses: "z-0",
    };
    setModal(new Modal(modalElementCreate, modalOptions));
  }, []);

  useEffect(() => {
    if (!modal) return;
    if (!isOpenCart) modal.hide();
    else modal.show();
  }, [isOpenCart]);

  return (
    <div
      id="your-cart"
      tabIndex={-1}
      className="hidden fixed top-1 right-0 z-50 w-1/4 max-h-[95vh] p-4"
      ref={modalRef}
    >
      <div className="w-full top-0 right-0 justify-end max-h-[75vh]">
        <div className="w-full bg-white shadow bg-list-product-color overflow-x-hidden overflow-y-auto scroll-container rounded-tl-xl max-h-[75vh]">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h2 className="text-2xl secondary-color w-full flex justify-start">
              <strong>Your cart</strong>
            </h2>
          </div>
          <div className="p-5 text-[1.8vh] space-y-4">
            <table className="w-full">
              <tbody>
                {products.map((product) => {
                  return (
                    <tr
                      key={product.id}
                      className="flex items-center justify-between mb-5"
                    >
                      <td>
                        <img
                          src={product.img}
                          alt=""
                          className="w-[15vh] h-[15vh] object-cover rounded-lg"
                        />
                      </td>
                      <td className="pl-3 pt-2">
                        <table>
                          <tbody className="text-left">
                            <tr>
                              <td className="text-black font-bold">
                                {product.name}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} className="text-black font-bold">
                                {product.size_name}-
                                <span
                                  className="ml-1 inline-block rounded-full cursor-pointer"
                                  style={{
                                    backgroundColor:
                                      product?.color_code ?? "#FFFFFF",
                                    lineHeight: "1rem",
                                    width: "1rem",
                                  }}
                                >
                                  &nbsp;
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="flex gap-5 justify-center border border-green-700 rounded-xl w-[5vw] font-bold text-black pl-1 pr-1">
                                  {product.quantity > 1 && (
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={() => {
                                        handleMinusProductFromCart(product);
                                      }}
                                    >
                                      <FaMinus />
                                    </div>
                                  )}
                                  {product.quantity === 1 && (
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={() =>
                                        handleRemoveProduct(product.id)
                                      }
                                    >
                                      <FaTrash />
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    {product.quantity}
                                  </div>
                                  <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => {
                                      handleAddProductToCart(product);
                                    }}
                                  >
                                    <FaPlus />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="pt-3" colSpan={2}>
                                Total price:
                                <span className="pr-3 pl-2 text-black font-bold">
                                  $
                                  {calculateFinalPrice(
                                    product.price,
                                    product.quantity,
                                    product.discount,
                                    0
                                  )}
                                </span>
                                <span className="line-through">
                                  $
                                  {(product.price * product.quantity).toFixed()}
                                </span>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-list-product-color rounded-bl-xl">
          <div className="flex justify-center w-full">
            <h3 className="w-full text-[1.35vw] secondary-color flex justify-start ml-5">
              <strong>
                Subtotal ({products.length} item
                {products.length > 1 ? "s" : ""})
              </strong>
            </h3>
            <h3 className="w-full flex text-2xl text-black font-bold justify-end mr-6">
              $
              {products
                .reduce(
                  (acc, product) =>
                    acc +
                    Number(
                      calculateFinalPrice(
                        product?.price ?? 0,
                        product.quantity,
                        product?.discount ?? 0,
                        0
                      )
                    ),
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
          <div className="w-full ml-5 text-left text-[0.8vw]">
            Taxes, shipping will be calculated at checkout. Happy shopping!
            <p className="text-left secondary-color">⸜(｡˃ ᵕ ˂ )⸝♡</p>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/order"
              className="w-full rounded-xl p-3 m-5 text-white bg-main-color"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
