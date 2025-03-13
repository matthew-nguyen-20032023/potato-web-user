import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { IGetOrderDetail } from "@/types.ts";
import { Spinning } from "@/components/Spinning.tsx";
import { getOrderHistory } from "@/api/product-order.ts";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";

export function MyOrder() {
  const [perPage] = useState(5);
  const [page, setPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [isSpinner, setIsSpinner] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState("");
  const [orders, setOrders] = useState<IGetOrderDetail[]>([]);
  const [orderDetail, setOrderDetail] = useState<IGetOrderDetail>();

  const handleSearch = async () => {
    setIsSpinner(true);
    try {
      const data = await getOrderHistory(paypalOrderId, page, perPage);
      setOrders(data.data);
      setTotalOrder(data.metadata.total);
      showMessageSuccess(data.message);
    } catch (err) {
      showMessageError(err);
    } finally {
      setIsSpinner(false);
    }
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    handleSearch();
  }, [page]);

  return (
    <div>
      <div className="bg-list-product-color secondary-color pt-5 pb-5 flex justify-center items-center w-full">
        <div className="w-1/2">
          <h1 className="text-5xl font-semibold text-center">My Order</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <input
          className="bg-white m-1 border border-gray-300 text-md rounded-lg block py-3 ps-4 pe-9 w-1/6 secondary-color"
          type="text"
          placeholder="Paypal order id..."
          onChange={(e) => setPaypalOrderId(e.target.value)}
        />
        <button
          type="button"
          className="m-1 p-2.5 bg-main-color text-white font-medium rounded-lg text-md text-center hover:scale-110"
          onClick={handleSearch}
        >
          {isSpinner && <Spinning />}
          {!isSpinner && "Search"}
        </button>
      </div>
      <div className="bg-list-product-color secondary-color flex justify-center items-center w-full p-5">
        <table className="w-3/4 text-sm text-left rtl:text-right secondary-color border border-black">
          <thead className="text-xs text-gray-700 uppercase secondary-color">
            <tr className="border border-black text-center">
              <th className="border border-black" scope="col">
                Order Id
              </th>
              <th className="border border-black" scope="col">
                Paypal Order Id
              </th>
              <th className="border border-black" scope="col">
                Full Name
              </th>
              <th className="border border-black" scope="col">
                Receive Address
              </th>
              <th className="border border-black" scope="col">
                Postal Code
              </th>
              <th className="border border-black" scope="col">
                Total Price
              </th>
              <th className="border border-black" scope="col">
                Discount
              </th>
              <th className="border border-black" scope="col">
                Final Price
              </th>
              <th className="border border-black" scope="col">
                Status
              </th>
              <th className="border border-black" scope="col">
                Created At
              </th>
              <th className="border border-black" scope="col">
                Updated At
              </th>
              <th className="border border-black" scope="col">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <>
                  <tr
                    className="border border-black text-center"
                    key={order.id}
                  >
                    <td className="border border-black">{order.id}</td>
                    <td className="border border-black">
                      {order.paypal_order_id}
                    </td>
                    <td className="border border-black">{order.full_name}</td>
                    <td className="border border-black w-1/6 break-words">
                      {order.address_line_1} Or <br /> {order.address_line_2}
                    </td>
                    <td className="border border-black">{order.postal_code}</td>
                    <td className="border border-black">{order.total_price}</td>
                    <td className="border border-black">{order.discount}</td>
                    <td className="border border-black">{order.final_price}</td>
                    <td className="border border-black">{order.status}</td>
                    <td className="border border-black">
                      {order.created_at.toString()}
                    </td>
                    <td className="border border-black">
                      {order.updated_at.toString()}
                    </td>
                    <td>
                      <button
                        className="m-1 p-2.5 bg-main-color text-white font-medium rounded-lg text-md text-center hover:scale-110"
                        onClick={() => setOrderDetail(order)}
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                  {order.id === orderDetail?.id && (
                    <tr>
                      <td colSpan={12}>
                        <table className="w-full text-sm text-left rtl:text-right secondary-color border border-green-700">
                          <thead className="text-xs text-gray-700 uppercase secondary-color">
                            <tr className="border border-green-700 text-center">
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Product Name
                              </th>
                              <th
                                className="border border-green-700 w-32"
                                scope="col"
                              >
                                Image
                              </th>
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Quantity
                              </th>
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Discount
                              </th>
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Final Price
                              </th>
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Created At
                              </th>
                              <th
                                className="border border-green-700"
                                scope="col"
                              >
                                Updated At
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.details.map((detail) => {
                              return (
                                <tr
                                  className="border border-green-700 text-center"
                                  key={detail.order_details_product_detail_id}
                                >
                                  <td className="border border-green-700">
                                    {detail.products_name}
                                  </td>
                                  <td className="border border-green-700">
                                    <img
                                      className="w-32 h-32"
                                      src={
                                        detail.product_details_img_urls.split(
                                          ","
                                        )[0]
                                      }
                                      alt={detail.products_name}
                                    />
                                  </td>
                                  <td className="border border-green-700">
                                    {detail.order_details_quantity}
                                  </td>
                                  <td className="border border-green-700">
                                    {detail.order_details_discount}
                                  </td>
                                  <td className="border border-green-700">
                                    {detail.order_details_final_price}
                                  </td>
                                  <td className="border border-green-700">
                                    {detail.order_details_created_at.toString()}
                                  </td>
                                  <td className="border border-green-700">
                                    {detail.order_details_updated_at.toString()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-list-product-color secondary-color flex justify-center items-center w-full pb-5">
        <ReactPaginate
          className="inline-flex -space-x-px text-xl pagination"
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={totalOrder}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          activeClassName="active"
        />
      </div>
    </div>
  );
}
