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
          <h1 className="text-5xl font-semibold text-center">Shopping Cart</h1>
        </div>
      </div>
      <div className="bg-list-product-color secondary-color p-5 flex justify-center items-center w-full">
        <div className="flex justify-center" style={{ minWidth: "750px" }}>
          <table>
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
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                    </td>
                    <td className="pl-5 pr-5">
                      <div className="flex text-black font-bold text-left text-2xl max-w-96 w-96">
                        {product.name}
                      </div>
                      <div className="mb-2">
                        <table>
                          <tbody className="text-left">
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
                                    lineHeight: "1rem",
                                    width: "1rem",
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
                        <table className="w-full text-left rtl:text-right border border-black">
                          <thead className="text-xs uppercase text-black">
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
                            <tr className="border border-black text-center text-xl">
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
                              <div className="flex gap-5 justify-center border border-green-700 rounded-xl max-w-24 font-bold text-black pl-1 pr-1">
                                {product.quantity > 1 && (
                                  <div
                                    className="flex items-center"
                                    onClick={() => {
                                      handleMinusProductFromCart(product);
                                    }}
                                  >
                                    <FaMinus />
                                  </div>
                                )}
                                {product.quantity === 1 && (
                                  <div
                                    className="flex items-center"
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
                                  className="flex items-center"
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
                            <td>Price/unit: </td>
                            <td className="font-bold text-black pl-2">
                              ${product.price}
                            </td>
                          </tr>
                          <tr>
                            <td>Discount percent: </td>
                            <td className="font-bold text-black pl-2">
                              {product.discount}%
                            </td>
                          </tr>
                          <tr>
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
                          <tr>
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
                          <tr>
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
            <div className="ml-10 border border-black rounded-xl p-5 max-w-72 max-h-96">
              <table>
                <tbody className="text-left">
                  <tr className="text-xl">
                    <td className="font-bold">
                      Subtotal ({products.length} item
                      {products.length > 0 ? "s" : ""}):
                    </td>
                    <td className="text-black font-bold text-right">
                      ${subTotal}
                    </td>
                  </tr>
                  <tr className="text-xl">
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
                  <tr className="text-xl">
                    <td className="font-bold">Total price:</td>
                    <td className="text-black font-bold text-right">
                      ${totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 text-sm" colSpan={2}>
                      The total price includes a shipping fee of ${SHIPPING_FEE}
                      . Happy shopping!
                      <p className="text-left secondary-color">⸜(｡˃ ᵕ ˂ )⸝♡</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3" colSpan={2}>
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
                  <tr>
                    <td className="pt-5">Ships from:</td>
                    <td className="pt-5 text-right font-bold text-black">
                      Viet Nam
                    </td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Deliver to:</td>
                    <td className="text-right font-bold text-black">USA</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Delivery ETA:</td>
                    <td className="text-right font-bold text-black">5 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {products.length === 0 && (
            <h1 className="text-3xl secondary-color flex">
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
