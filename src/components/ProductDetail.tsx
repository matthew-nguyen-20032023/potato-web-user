import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetailById } from "../api/product.ts";
import { IProduct, IProductDetail } from "../types.ts";
import { Cart } from "../pages/cart/Cart.tsx";
import { useCart } from "../contexts/CartContext.tsx";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { paypalConfig } from "../const.ts";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import { showMessageError, showMessageSuccess } from "../alerts/alert.ts";
import { orderProduct, preOrderProduct } from "../api/product-order.ts";
import { sleep } from "../utils/helper.ts";
import { Spinning } from "./Spinning.tsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [imgs, setImgs] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [productDetails, setProductDetails] = useState<IProductDetail[]>();
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState(
    productDetail?.price ? productDetail?.price : 0
  );
  const { addProduct } = useCart();
  const [isSpinner, setIsSpinner] = useState(false);

  useEffect(() => {
    const imageURL = imgs[imgIndex];
    const productDetailFound = productDetails?.find((detail) =>
      detail.img_urls.includes(imageURL)
    );
    if (productDetailFound !== productDetail) {
      setProductDetail(productDetailFound);
    }
  }, [imgIndex, imgs, productDetail, productDetails]);

  useEffect(() => {
    setTotalPrice(
      (isNaN(quantity) ? 0 : quantity) *
        (productDetail?.price ? productDetail?.price : 0)
    );
  }, [quantity, productDetail]);

  useEffect(() => {
    getProductDetailById(id).then((response) => {
      const { product } = response.data;
      setProduct(product);
      setProductDetail(response.data.details[0]);
      setProductDetails(response.data.details);
      response.data.details.forEach((detail: IProductDetail) => {
        setImgs((imgs) => [...imgs, ...detail.img_urls.split(",")]);
      });
    });
  }, [id]);

  const addToCart = () => {
    setIsSpinner(true);
    setTimeout(() => {
      if (product && productDetail) {
        addProduct({
          id: productDetail.id,
          name: product.name,
          quantity,
          price: productDetail.price,
          img: imgs[imgIndex],
        });
      }
      setIsSpinner(false);
    }, 300);
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

    if (!productDetail) return "";

    try {
      const preOrder = await preOrderProduct({
        paypal_order_id: orderId,
        products: [{ product_detail_id: productDetail.id, quantity }],
      });
      showMessageSuccess(preOrder.message);
      return orderId;
    } catch (err) {
      showMessageError(err);
      return "";
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

    if (productDetail && paypalOrder.id) {
      try {
        const serverOrder = await orderProduct({
          paypal_order_id: paypalOrder.id,
          products: [{ product_detail_id: productDetail.id, quantity }],
        });
        showMessageSuccess(serverOrder.message);
      } catch (error) {
        showMessageError(error);
      }
    } else {
      await sleep(1000);
      await handleApproveOrder(_data, actions);
    }
  };

  return (
    <div className="bg-list-product-color">
      <Cart />
      <div className="w-full flex justify-center">
        <div className="flex justify-center bg-list-product-color w-2/3">
          <div className="p-6">
            <img src={imgs[imgIndex]} alt="" className="rounded-xl" />
            <div className="mt-5 flex items-center justify-start">
              {imgs.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="rounded-xl w-1/6 max-h-28 mr-3 hover:cursor-pointer"
                    onClick={() => setImgIndex(index)}
                  />
                );
              })}
            </div>
          </div>
          <div className="p-6 max-w-xl">
            <h1 className="mb-5 flex">{product?.name}</h1>
            <h3 className="secondary-color size-4 w-full flex mb-5">
              ${totalPrice} USD
            </h3>
            <h3 className="secondary-color size-4 w-full flex mb-3">
              Quantity
            </h3>
            <form className="mb-5">
              <div className="flex max-w-[8rem] shadow-lg shadow-lime-800/50 rounded-xl">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  className="bg-main-color border-x-0 border-gray-300 rounded-s-lg p-3 h-11"
                  onClick={() =>
                    setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)
                  }
                >
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-main-color border-0 border-gray-300 h-11 text-center text-white text-sm block w-full py-2.5 dark:text-white"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-main-color border-x-0 border-gray-300 rounded-e-lg p-3 h-11"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <button
              type="button"
              className="text-white bg-main-color w-full rounded-xl shadow-lg shadow-lime-800/50 size-12 mb-5"
              onClick={addToCart}
            >
              {isSpinner && <Spinning />}
              {!isSpinner && "Add to cart"}
            </button>
            <PayPalScriptProvider options={paypalConfig}>
              <PayPalButtons
                createOrder={handleCreateOrder}
                onApprove={handleApproveOrder}
              />
            </PayPalScriptProvider>
            <p id="result-message"></p>

            <div className="mt-5">
              <div className="flex mb-5">
                <h3 style={{ fontSize: 25 }}>Custome by Potato! ʕ •ɷ•ʔฅ</h3>
              </div>
              <div className="flex whitespace-pre-wrap text-left">
                {product?.story}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
