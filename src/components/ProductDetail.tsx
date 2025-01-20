import { loadScript } from "@paypal/paypal-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetailById } from "../api/product.ts";
import { IProductDetail } from "../types.ts";

export default function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState(price); // Total price

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  useEffect(() => {
    getProductDetailById(id).then((response) => {
      setProductDetail(response.data[0]);
      setPrice(response.data[0].price);
    });
  }, []);

  useEffect(() => {
    loadScript({
      clientId: "test",
    })
      .then((paypal) => {
        if (paypal) paypal.Buttons().render("#paypal-button-container");
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });
  }, []);

  return (
    <div className="bg-list-product-color">
      <div className="w-full flex justify-center">
        <div className="flex justify-center bg-list-product-color w-2/3">
          <div className="p-6">
            <img
              src={productDetail?.img_urls.split(",")[0]}
              alt=""
              className="rounded-xl"
            />
            <div className="mt-5 flex items-center justify-between">
              {productDetail?.img_urls.split(",").map((img) => {
                return (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className="rounded-xl w-1/6 max-h-28"
                  />
                );
              })}
            </div>
          </div>
          <div className="p-6 max-w-xl">
            <h1 className="mb-5">Babybara with Orange</h1>
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
                  type="text"
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
            >
              Add to cart
            </button>
            <div id="paypal-button-container"></div>
            <p id="result-message"></p>

            <div className="mt-5">
              <div className="flex mb-5">
                <h3 style={{ fontSize: 25 }}>Sleepy Baby Capybara! ʕ •ɷ•ʔฅ</h3>
              </div>
              <div className="flex whitespace-pre-wrap text-left">
                Meet our adorable Sleepy babybara keychain, crafted with love
                from polymer clay. This little guy is the perfect addition to
                your keychain or backpack. His sleepy face and chubby cheeks are
                sure to bring a smile to your face.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
