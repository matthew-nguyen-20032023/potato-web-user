import {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { paypalConfig } from "@/const.ts";
import { useDispatch } from "react-redux";
import Zoom from "react-medium-image-zoom";
import { Cart } from "@/pages/cart/Cart.tsx";
import { useParams } from "react-router-dom";
import { Spinning } from "@/components/Spinning.tsx";
import { IProduct, IProductDetail } from "@/types.ts";
import { ReactNode, useEffect, useState } from "react";
import { getProductDetailById } from "@/api/product.ts";
import StarContainer from "@/components/StarContainer.tsx";
import { calculateDiscount, sleep } from "@/utils/helper.ts";
import { addProductToCart } from "@/features/cart/cartSlice.ts";
import { orderProduct, preOrderProduct } from "@/api/product-order.ts";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";

export default function ProductDetail() {
  const { id } = useParams();
  const [imageDisplay, setImageDisplay] = useState("");
  const [productDetails, setProductDetails] = useState<IProductDetail[]>();
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState(
    productDetail?.price ? productDetail?.price : 0
  );
  const dispatch = useDispatch();
  const [isSpinner, setIsSpinner] = useState(false);
  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "horizontal",
    label: "buynow",
    tagline: false,
  };

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
    });
  }, [id]);

  const addToCart = () => {
    setIsSpinner(true);
    setTimeout(() => {
      if (product && productDetail) {
        dispatch(
          addProductToCart({
            id: productDetail.id,
            name: product.name,
            quantity,
            price: productDetail.price,
            img: imageDisplay,
          })
        );
      }
      setIsSpinner(false);
      showMessageSuccess("Product added to cart");
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

  const CustomZoomContent = ({ img }: { img: ReactNode }) => {
    return <>{img}</>;
  };

  return (
    <div className="bg-white">
      <Cart />
      <div className="w-full flex justify-center">
        <div className="flex justify-center w-2/3">
          <div className="p-6">
            <Zoom classDialog={"custom-zoom"} ZoomContent={CustomZoomContent}>
              <img
                src={
                  imageDisplay
                    ? imageDisplay
                    : productDetail?.img_urls.split(",")[0]
                }
                alt=""
                className="rounded-xl object-cover"
                style={{ height: "30rem", width: "30rem" }}
              />
            </Zoom>
            <div className="mt-3 flex items-center justify-start max-w-96 overflow-y-auto scroll-container pb-3">
              {productDetails?.map((pDetail) => {
                return pDetail.img_urls.split(",").map((img, index) => {
                  return (
                    <img
                      key={`${pDetail.id}-${index}`}
                      src={img}
                      alt=""
                      className="rounded-xl h-28 w-28 object-cover mr-3 hover:cursor-pointer flex-shrink-0"
                      onClick={() => {
                        setImageDisplay(img);
                        setProductDetail(pDetail);
                      }}
                    />
                  );
                });
              })}
            </div>
          </div>
          <div className="p-6 max-w-xl">
            <h1 className="flex secondary-color text-left max-w-80">
              {product?.name}
            </h1>
            <div className="relative mb-10">
              <StarContainer
                average_star={product?.average_star}
                review_count={product?.review_count}
              />
            </div>
            <hr className="mb-5 border-black" />

            <div className="secondary-color text-3xl w-full flex">
              <span className="text-red-800 mr-4">
                -{productDetail?.discount}%
              </span>
              <span className="relative w-4/12">
                <span className="absolute text-sm left-1">$</span>
                <span className="absolute left-3">
                  {calculateDiscount(
                    productDetail?.price,
                    productDetail?.discount
                  )}
                </span>
              </span>
            </div>
            <div className="secondary-color text-sm w-full flex mb-5">
              <span>
                Original price:{" "}
                <span className="line-through">${productDetail?.price}</span>
              </span>
            </div>
            <hr className="mb-5 border-black" />
            <div className="secondary-color text-sm w-full flex mb-3">
              <span>
                Size:{" "}
                <span className="text-black">{productDetail?.size_name}</span>
              </span>
            </div>
            <div className="secondary-color text-sm w-full flex mb-3">
              <span>
                Color:{" "}
                <span className="text-black">{productDetail?.color_name}</span>
              </span>
            </div>
            <div className="secondary-color text-sm max-w-80 flex mb-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((e) => {
                return (
                  <div className="border border-black p-3 mr-1 mb-1" key={e}>
                    <div>{productDetail?.size_name}</div>
                    <div>
                      $
                      {calculateDiscount(
                        productDetail?.price,
                        productDetail?.discount
                      )}
                    </div>
                    <span className="line-through">
                      ${productDetail?.price}
                    </span>
                  </div>
                );
              })}
            </div>
            <form className="mb-5">
              <div className="flex max-w-[8rem] shadow-lg shadow-lime-800/50 rounded-b">
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
              className="text-white bg-main-color w-full rounded-lg shadow-lg shadow-lime-800/50 size-12 mb-5"
              onClick={addToCart}
            >
              {isSpinner && <Spinning />}
              {!isSpinner && "Add to cart"}
            </button>
            <PayPalScriptProvider options={paypalConfig}>
              <PayPalButtons
                style={styles}
                createOrder={handleCreateOrder}
                onApprove={handleApproveOrder}
              />
            </PayPalScriptProvider>
            <p id="result-message"></p>

            <div className="mt-2">
              <div className="flex mb-5">
                <h3 style={{ fontSize: 25 }}>Custom by MewMew! ʕ •ɷ•ʔฅ</h3>
              </div>
              <div className="mb-5">
                <table className="w-full text-left rtl:text-right secondary-color border border-black">
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
                    <tr className="border border-black text-center text-black">
                      <td className="border border-black">
                        {productDetail?.length} cm
                      </td>
                      <td className="border border-black">
                        {productDetail?.width} cm
                      </td>
                      <td className="border border-black">
                        {productDetail?.height} cm
                      </td>
                      <td className="border border-black">
                        {productDetail?.weight} gram
                      </td>
                    </tr>
                  </tbody>
                </table>
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
