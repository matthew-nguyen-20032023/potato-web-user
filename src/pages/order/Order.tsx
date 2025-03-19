import { sleep } from "@/utils/helper.ts";
import { paypalConfig } from "@/const.ts";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext.tsx";
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

export function Order() {
  const { products, removeProduct, clearAll } = useCart();
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
    const totalPrice = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
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
      showMessageError(err);
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
        clearAll();
      } catch (error) {
        showMessageError(error);
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
      <div className="bg-list-product-color secondary-color pt-16 flex justify-center items-center w-full">
        <div className="w-1/2">
          <h1 className="text-5xl font-semibold text-center">Order</h1>
        </div>
      </div>
      <div className="bg-list-product-color secondary-color p-16 flex justify-center items-center w-full">
        <div className="w-1/2">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex items-center justify-between mb-3"
              >
                <div>
                  <img
                    src={product.img}
                    alt=""
                    className="w-36 h-36 object-cover rounded-lg"
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
                    onClick={() => removeProduct(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center mb-16">
        {products.length > 0 && (
          <div className="w-1/6 rounded-xl">
            <PayPalScriptProvider options={paypalConfig}>
              <PayPalButtons
                style={styles}
                createOrder={handleCreateOrder}
                onApprove={handleApproveOrder}
              />
            </PayPalScriptProvider>
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
  );
}
