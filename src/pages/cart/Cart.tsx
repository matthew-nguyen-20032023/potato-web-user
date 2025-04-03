import { Modal } from "flowbite";
import { cacheCart } from "@/const.ts";
import { Link } from "react-router-dom";
import {
  selectIsOpenCart,
  selectLoadCart,
  selectProductsAddedToCart,
} from "@/features/cart/cartSelector.ts";
import {
  removeFromCart,
  triggerOpenAndHideCart,
} from "@/features/cart/cartSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RefObject, useEffect, useRef, useState } from "react";

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
      className="hidden fixed top-0 right-0 z-50 w-1/6 p-4 overflow-x-hidden overflow-y-auto scroll-container"
      ref={modalRef}
    >
      <div className="relative w-full max-w-md max-h-full top-0 right-0">
        <div className="relative bg-white rounded-lg shadow bg-list-product-color">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h2 className="text-2xl secondary-color w-full flex justify-start">
              <strong>Your cart</strong>
            </h2>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <img
                      src={product.img}
                      alt=""
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg secondary-color">
                      {product.name} x {product.quantity}
                    </h3>
                    <div className="flex">
                      <h3 className="text-lg secondary-color">
                        {product.quantity * product.price}.00 $
                      </h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-white bg-main-color rounded-xl p-2"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mb-5" />
          <div>
            <div className="flex justify-center w-full mb-3">
              <h3 className="w-full text-2xl secondary-color flex justify-start ml-5">
                <strong>Estimated total</strong>
              </h3>
              <h3 className="w-full flex text-2xl secondary-color justify-end mr-6">
                ${products.reduce((acc, p) => acc + p.quantity * p.price, 0)}
                .00 USD
              </h3>
            </div>
            <div className="w-full flex ml-5">
              Taxes, discounts and shipping calculated at checkout.
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
    </div>
  );
}
