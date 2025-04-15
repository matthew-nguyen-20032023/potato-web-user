import { useEffect, useState } from "react";
import { AppError, IProductAddedToCart } from "@/types.ts";
import {
  calculateFinalPrice,
  calculateTotalDiscount,
  SHIPPING_FEE,
  sleep,
} from "@/utils/helper.ts";
import { cacheCart, paypalConfig } from "@/const.ts";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import { orderProduct, preOrderProduct } from "@/api/product-order.ts";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadCart,
  selectProductsAddedToCart,
} from "@/features/cart/cartSelector.ts";
import {
  addProductToCart,
  clearCart,
  removeFromCart,
} from "@/features/cart/cartSlice.ts";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

export default function Order() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsAddedToCart);
  const isCartLoad = useSelector(selectLoadCart);
  const [subTotal, setSubTotal] = useState("0"); // not include shipping fee
  const [totalPrice, setTotalPrice] = useState("0"); // include shipping fee

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
    if (isCartLoad) {
      localStorage.setItem(cacheCart, JSON.stringify(products));
      const finalPrice = products.reduce(
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
      );
      setSubTotal(finalPrice.toFixed(2));
      setTotalPrice((finalPrice + SHIPPING_FEE).toFixed(2));
    }
  }, [products, isCartLoad]);

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "horizontal",
    label: "checkout",
    tagline: false,
  };

  const handleCreateOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const orderId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${totalPrice}`,
          },
        },
      ],
    });

    try {
      const preOrder = await preOrderProduct({
        paypal_order_id: orderId,
        products: products.map((e) => {
          return { product_detail_id: e.id, quantity: e.quantity };
        }),
      });
      showMessageSuccess(preOrder.message);
      return orderId;
    } catch (err) {
      showMessageError(err as AppError);
      throw err;
    }
  };

  const handleApproveOrder = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    if (!actions.order) {
      return showMessageError("Order not success, please try again.");
    }
    const paypalOrder = await actions.order.capture();

    if (paypalOrder.id) {
      try {
        const serverOrder = await orderProduct({
          paypal_order_id: paypalOrder.id,
          products: products.map((e) => {
            return { product_detail_id: e.id, quantity: e.quantity };
          }),
        });
        showMessageSuccess(serverOrder.message);
        dispatch(clearCart());
      } catch (error) {
        showMessageError(error as AppError);
      }
    } else {
      await sleep(1000);
      await handleApproveOrder(_data, actions);
    }
  };

  const navigate = useNavigate();
  const handleShopping = () => {
    navigate("/products");
  };

  return (
    <div>
      <div className="bg-list-product-color secondary-color pt-5 flex justify-center items-center w-full">
        <div className="w-1/2">
          <h1 className="text-[3vh] font-semibold text-center">
            Shopping Cart
          </h1>
        </div>
      </div>
      <div className="bg-list-product-color secondary-color p-5 flex justify-center items-center w-[200vh]">
        <div className="flex justify-center">
          <table>
            <tbody>
              {products.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="flex items-start justify-between mb-[2vh]"
                  >
                    <td>
                      <img
                        src={product.img}
                        alt=""
                        className="w-[17vh] h-[17vh] object-cover rounded-lg"
                      />
                    </td>
                    <td className="pl-5 pr-5">
                      <div className="flex text-black font-bold text-left text-[2.3vh] w-[30vh]">
                        {product.name}
                      </div>
                      <div className="mb-[1vh]">
                        <table>
                          <tbody className="text-left text-[1.7vh]">
                            <tr>
                              <td>Size:</td>
                              <td className="text-black font-bold pl-2">
                                {product.size_name}
                              </td>
                            </tr>
                            <tr>
                              <td>Color:</td>
                              <td className="text-black font-bold pl-2">
                                {product.color_name}
                              </td>
                              <td>
                                <span
                                  className="ml-1 inline-block rounded-full cursor-pointer"
                                  style={{
                                    backgroundColor:
                                      product?.color_code ?? "#FFFFFF",
                                    lineHeight: "2vh",
                                    width: "2vh",
                                  }}
                                >
                                  &nbsp;
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <table className="w-[30vh] text-left rtl:text-right border border-black">
                          <thead className="text-[1.3vh] uppercase text-black">
                            <tr className="border border-black text-center">
                              <th className="border border-black" scope="col">
                                Length
                              </th>
                              <th className="border border-black" scope="col">
                                Width
                              </th>
                              <th className="border border-black" scope="col">
                                Height
                              </th>
                              <th className="border border-black" scope="col">
                                Weight
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border border-black text-center text-[1.8vh]">
                              <td className="border border-black">
                                {product?.length} cm
                              </td>
                              <td className="border border-black">
                                {product?.width} cm
                              </td>
                              <td className="border border-black">
                                {product?.height} cm
                              </td>
                              <td className="border border-black">
                                {product?.weight} gram
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                    <td>
                      <table>
                        <tbody className="text-left">
                          <tr>
                            <td colSpan={2}>
                              <div className="flex gap-[2vh] justify-center border border-green-700 rounded-xl w-[9.5vh] font-bold text-black pl-1 pr-1">
                                {product.quantity > 1 && (
                                  <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => {
                                      handleMinusProductFromCart(product);
                                    }}
                                  >
                                    <FaMinus className="size-[1.6vh]" />
                                  </div>
                                )}
                                {product.quantity === 1 && (
                                  <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() =>
                                      handleRemoveProduct(product.id)
                                    }
                                  >
                                    <FaTrash className="size-[1.6vh]" />
                                  </div>
                                )}
                                <div className="flex items-center text-[1.7vh]">
                                  {product.quantity}
                                </div>
                                <div
                                  className="flex items-center cursor-pointer"
                                  onClick={() => {
                                    handleAddProductToCart(product);
                                  }}
                                >
                                  <FaPlus className="size-[1.6vh]" />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-[1.7vh]">
                            <td>Price/unit: </td>
                            <td className="font-bold text-black pl-2">
                              ${product.price}
                            </td>
                          </tr>
                          <tr className="text-[1.7vh]">
                            <td>Discount percent: </td>
                            <td className="font-bold text-black pl-2">
                              {product.discount}%
                            </td>
                          </tr>
                          <tr className="text-[1.7vh]">
                            <td>Total Discount: </td>
                            <td className="font-bold text-black pl-2">
                              - $
                              {calculateTotalDiscount(
                                product?.price ?? 0,
                                product?.discount ?? 0,
                                product.quantity
                              )}
                            </td>
                          </tr>
                          <tr className="text-[1.7vh]">
                            <td>Total price: </td>
                            <td className="font-bold text-black pl-2">
                              $
                              {calculateFinalPrice(
                                product?.price ?? 0,
                                product.quantity,
                                product?.discount ?? 0,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="text-[1.7vh]">
                            <td
                              className="cursor-pointer text-blue-500"
                              onClick={() => handleRemoveProduct(product.id)}
                            >
                              delete
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
          {products.length > 0 && (
            <div className="ml-10 border border-black rounded-xl p-[1vh] w-[30vh] h-[40vh]">
              <table>
                <tbody className="text-left">
                  <tr className="text-[2vh]">
                    <td className="font-bold">
                      Subtotal ({products.length} item
                      {products.length > 0 ? "s" : ""}):
                    </td>
                    <td className="text-black font-bold text-right">
                      ${subTotal}
                    </td>
                  </tr>
                  <tr className="text-[2vh]">
                    <td className="font-bold">Shipping fee:</td>
                    <td className="text-black font-bold text-right">
                      ${SHIPPING_FEE}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="pb-3 pt-3">
                      <hr className="border-black" />
                    </td>
                  </tr>
                  <tr className="text-[2vh]">
                    <td className="font-bold">Total price:</td>
                    <td className="text-black font-bold text-right">
                      ${totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 text-[1.4vh]" colSpan={2}>
                      The total price includes a shipping fee of ${SHIPPING_FEE}
                      . Happy shopping!
                      <p className="text-left secondary-color">⸜(｡˃ ᵕ ˂ )⸝♡</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-[1vh]" colSpan={2}>
                      <div className="rounded-xl">
                        <PayPalScriptProvider options={paypalConfig}>
                          <PayPalButtons
                            style={styles}
                            createOrder={handleCreateOrder}
                            onApprove={handleApproveOrder}
                          />
                        </PayPalScriptProvider>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr className="border-black" />
                    </td>
                  </tr>
                  <tr className="text-[1.7vh]">
                    <td className="pt-[1vh]">Ships from:</td>
                    <td className="pt-[1vh] text-right font-bold text-black">
                      Viet Nam
                    </td>
                  </tr>
                  <tr className="text-[1.7vh]">
                    <td className="secondary-color">Deliver to:</td>
                    <td className="text-right font-bold text-black">USA</td>
                  </tr>
                  <tr className="text-[1.7vh]">
                    <td className="secondary-color">Delivery ETA:</td>
                    <td className="text-right font-bold text-black">5 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {products.length === 0 && (
            <h1 className="text-[3vh] secondary-color flex">
              Your cart is empty.{" "}
              <span
                onClick={handleShopping}
                className="ml-2 flex items-center justify-center text-green-800 hover:cursor-pointer"
              >
                Shopping now <CiShoppingCart />
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
