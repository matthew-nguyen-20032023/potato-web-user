export function Cart() {
  return (
    <div
      id="top-left-modal"
      data-modal-placement="top-left"
      tabIndex={-1}
      className="fixed top-0 justify-end z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow bg-list-product-color">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h2 className="text-2xl secondary-color w-full flex justify-start">
              <strong>Your cart</strong>
            </h2>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mb-5" />
          <div>
            <div className="flex justify-center w-full mb-3">
              <h3 className="w-full text-2xl secondary-color flex justify-start ml-5">
                <strong>Estimated total</strong>
              </h3>
              <h3 className="w-full flex text-2xl secondary-color justify-end mr-6">
                $110.00 USD
              </h3>
            </div>
            <div className="w-full flex ml-5">
              Taxes, discounts and shipping calculated at checkout.
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="text-white bg-main-color w-full rounded-xl p-3 m-5"
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
