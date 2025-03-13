import { useCart } from "@/contexts/CartContext.tsx";

export function Cart() {
  const { products, removeProduct } = useCart();

  const handleCheckout = async () => {
    window.location.href = "/order";
  };

  return (
    <div
      id="top-left-modal"
      data-modal-placement="top-left"
      tabIndex={-1}
      className="fixed top-0 justify-end z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full scroll-container"
    >
      <div className="relative w-full max-w-md max-h-full">
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
                      onClick={() => removeProduct(product.id)}
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
                ${products.reduce((acc, p) => acc + p.quantity * p.price, 0)}.00
                USD
              </h3>
            </div>
            <div className="w-full flex ml-5">
              Taxes, discounts and shipping calculated at checkout.
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="text-white bg-main-color w-full rounded-xl p-3 m-5"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
