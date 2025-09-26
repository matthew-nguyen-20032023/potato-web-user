import { AppError } from "@/types.ts";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductDetailById } from "@/api/product.ts";
import StarContainer from "@/components/StarContainer.tsx";
import { addProductToCart } from "@/features/cart/cartSlice.ts";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";
import { Product } from "mewmew-api-type";

export default function Info({ productId }: { productId: number }) {
  const dispatch = useDispatch();
  const [isSpinner, setIsSpinner] = useState(false);
  const [productInfo, setProductInfo] = useState<Product>();

  const addToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      setIsSpinner(true);
      const productDetailResponse = await getProductDetailById(
        productId.toString()
      );
      const productDetail = productDetailResponse.data.details[0];
      const product = productDetailResponse.data.product;
      setProductInfo(product);
      dispatch(
        addProductToCart({
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          img: product.img_urls.split(",")[0],
          color_name: product.color_name,
          size_name: productDetail.size_name,
          discount: productDetail.discount,
          length: productDetail.length,
          width: productDetail.width,
          height: productDetail.height,
          weight: productDetail.weight,
          color_code: product.color_code,
        })
      );
      showMessageSuccess("Product added to cart");
    } catch (error) {
      showMessageError(error as AppError);
    } finally {
      setIsSpinner(false);
    }
  };

  return (
    <div className="absolute w-full bottom-0 left-0 bg-secondary-color secondary-color px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-80 transition-opacity duration-300">
      <a href="#">
        <h5 className="text-[2vh] font-semibold tracking-tight">
          {productInfo?.name}
        </h5>
      </a>
      <div className="flex items-center mt-2.5 mb-7">
        <StarContainer average_star={+(productInfo?.average_star ?? 5)} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[2vh] font-bold">${productInfo?.price}</span>
        <button
          type="button"
          onClick={addToCart}
          className="text-white bg-lime-900 font-medium rounded-lg text-[1.4vh] text-center w-[11vh] z-20"
        >
          {isSpinner && (
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}

          {!isSpinner && "Add to cart"}
        </button>
      </div>
    </div>
  );
}
