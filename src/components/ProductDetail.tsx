import {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { AppError } from "@/types.ts";
import { paypalConfig } from "@/const.ts";
import { useDispatch } from "react-redux";
import Zoom from "react-medium-image-zoom";
import { useParams } from "react-router-dom";
import { Spinning } from "@/components/Spinning.tsx";
import { ReactNode, useEffect, useState } from "react";
import { getProductDetailById } from "@/api/product.ts";
import StarContainer from "@/components/StarContainer.tsx";
import {
  calculateDiscount,
  calculateFinalPrice,
  calculateTotalDiscount,
  SHIPPING_FEE,
  sleep,
} from "@/utils/helper.ts";
import { addProductToCart } from "@/features/cart/cartSlice.ts";
import { Product, ProductDetail as PDetail } from "mewmew-api-type";
import { orderProduct, preOrderProduct } from "@/api/product-order.ts";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";
import SingleSelect from "@/components/SingleSelect.tsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [imageDisplay, setImageDisplay] = useState("");
  const [productDetails, setProductDetails] = useState<PDetail["details"]>();
  const [productDetail, setProductDetail] =
    useState<PDetail["details"][number]>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState("0");
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
      calculateFinalPrice(
        productDetail?.price ?? 0,
        quantity,
        productDetail?.discount ?? 0,
        SHIPPING_FEE
      )
    );
  }, [quantity, productDetail]);

  useEffect(() => {
    getProductDetailById(id).then((response) => {
      setProduct(response.data.product);
      setProductDetail(response.data.details[0]);
      setImageDisplay(response.data.details[0].img_urls.split(",")[0]);
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
            color_name: productDetail.color_name,
            color_code: productDetail.color_code,
            size_name: productDetail.size_name,
            length: productDetail.length,
            height: productDetail.height,
            width: productDetail.width,
            weight: productDetail.weight,
            discount: productDetail.discount,
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
            value: totalPrice,
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
      showMessageError(err as AppError);
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
        showMessageError(error as AppError);
      }
    } else {
      await sleep(1000);
      await handleApproveOrder(_data, actions);
    }
  };

  const CustomZoomContent = ({ img }: { img: ReactNode }) => {
    return <>{img}</>;
  };

  const chooseProductDetail = (e: PDetail["details"][number]) => {
    setImageDisplay(e.img_urls.split(",")[0]);
    setProductDetail(e);
  };

  return (
    <div className="bg-white">
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
                className="rounded-xl object-cover w-[50vh] h-[50vh]"
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
                      className="rounded-xl h-[11vh] w-[11vh] object-cover mr-3 hover:cursor-pointer flex-shrink-0"
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
            <div className="flex text-left max-w-80 text-[3vh] font-bold">
              {product?.name}
            </div>
            <div className="relative mb-10">
              <StarContainer
                average_star={+(product?.average_star ?? 0)}
                review_count={product?.review_count}
              />
            </div>
            <hr className="mb-5 border-black" />

            <div className="secondary-color text-[2.8vh] w-full flex">
              <span className="text-red-800 mr-4">
                -{productDetail?.discount}%
              </span>
              <span className="relative w-4/12">
                <span className="absolute text-[1.5vh] left-1">$</span>
                <span className="absolute left-3">
                  {calculateDiscount(
                    productDetail?.price,
                    productDetail?.discount
                  )}
                </span>
              </span>
            </div>
            <div className="secondary-color text-[1.5vh] w-full flex mb-3">
              <span>
                Original price:{" "}
                <span className="line-through">${productDetail?.price}</span>
              </span>
            </div>
            <div className="secondary-color text-[1.5vh] w-full flex">
              <span>
                Size:{" "}
                <span className="text-black font-bold">
                  {productDetail?.size_name}
                </span>
              </span>
            </div>
            <div className="secondary-color text-[1.5vh] max-w-80 flex mb-3 flex-wrap">
              {productDetails?.map((e) => {
                return (
                  <div
                    className={
                      "border border-black rounded-lg p-3 mr-1 mb-1 cursor-pointer" +
                      (productDetail?.id === e.id
                        ? " bg-main-color text-white"
                        : "")
                    }
                    key={e.id}
                    onClick={() => {
                      chooseProductDetail(e);
                    }}
                  >
                    <div>{e?.size_name}</div>
                  </div>
                );
              })}
            </div>
            <div className="secondary-color text-[1.5vh] w-full flex items-center">
              <span>
                Color:{" "}
                <span className="text-black font-bold">
                  {productDetail?.color_name}
                </span>
              </span>
            </div>
            <div className="secondary-color text-[1.5vh] max-w-80 flex mb-3 flex-wrap">
              {productDetails?.map((e) => {
                return (
                  <span
                    key={e.id}
                    onClick={() => {
                      chooseProductDetail(e);
                    }}
                    className="mr-2 inline-block rounded-full cursor-pointer"
                    style={{
                      backgroundColor: e?.color_code ?? "#FFFFFF",
                      lineHeight: "2rem",
                      width: "2rem",
                    }}
                  >
                    &nbsp;
                  </span>
                );
              })}
            </div>

            <p id="result-message"></p>

            <div className="mt-2">
              <div className="flex">
                <h3
                  style={{ fontSize: 20 }}
                  className="secondary-color font-bold"
                >
                  Product detail
                </h3>
              </div>
              <div className="mb-5">
                <table className="w-full text-left rtl:text-right border border-black">
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
                    <tr className="border border-black text-center text-[2vh]">
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
              <div className="flex">
                <h3
                  style={{ fontSize: 20 }}
                  className="secondary-color font-bold"
                >
                  About product
                </h3>
              </div>
              <div className="flex whitespace-pre-wrap text-left">
                {product?.story}
              </div>
            </div>
          </div>
          <div className="p-3 border m-6 rounded-xl max-w-[30vh]">
            <div className="flex w-full mb-3">
              <h3 className="text-[3vh]">${totalPrice}</h3>
            </div>
            <div className="mb-4">
              <p className="text-[1.5vh] text-left secondary-color">
                The total cost of your order includes the product price,
                shipping fee, applicable VAT,... And discount already. Happy
                shopping
              </p>
              <p className="text-left secondary-color">⸜(｡˃ ᵕ ˂ )⸝♡</p>
            </div>
            <div>
              <p className="text-[2vh] text-left main-color font-bold">
                In Stock
              </p>
            </div>
            <div className="mb-4 flex">
              <SingleSelect
                title={"Quantity: 1"}
                options={[
                  { value: "1", label: "1", id: 1 },
                  { value: "2", label: "2", id: 2 },
                  { value: "3", label: "3", id: 3 },
                  { value: "4", label: "4", id: 4 },
                  { value: "5", label: "5", id: 5 },
                  { value: "6", label: "6", id: 6 },
                  { value: "7", label: "7", id: 7 },
                  { value: "8", label: "8", id: 8 },
                  { value: "9", label: "9", id: 9 },
                  { value: "10", label: "10", id: 10 },
                ]}
                onChange={(selectedValue) => {
                  setQuantity(selectedValue);
                }}
                className={"h-[4.5vh]"}
              />
            </div>
            <button
              type="button"
              className="text-white bg-main-color w-full rounded-lg shadow-lg shadow-lime-800/50 size-12 mb-4"
              onClick={addToCart}
            >
              {isSpinner && <Spinning />}
              {!isSpinner && "Add to cart"}
            </button>
            <div className="mb-4">
              <table className="text-left text-[1.6vh]">
                <tbody>
                  <tr>
                    <td className="secondary-color">Ships from:</td>
                    <td className="pl-5">VietNam</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Deliver to:</td>
                    <td className="pl-5">USA</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Delivery ETA:</td>
                    <td className="pl-5">5 days</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Subtotal:</td>
                    <td className="pl-5">
                      {quantity} item{quantity > 1 ? "s" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Price/unit:</td>
                    <td className="pl-5">${productDetail?.price ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Shipping Fee:</td>
                    <td className="pl-5">${SHIPPING_FEE}</td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Discount:</td>
                    <td className="pl-5">
                      - $
                      {calculateTotalDiscount(
                        productDetail?.price ?? 0,
                        productDetail?.discount ?? 0,
                        quantity
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td className="secondary-color">Total price:</td>
                    <td className="pl-5">${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <PayPalScriptProvider options={paypalConfig}>
              <PayPalButtons
                style={styles}
                createOrder={handleCreateOrder}
                onApprove={handleApproveOrder}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
