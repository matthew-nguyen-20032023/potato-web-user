import Star from "./Star.tsx";
import { IProduct } from "../types.ts";

export default function Info({ productInfo }: { productInfo: IProduct }) {
  return (
    <div className="absolute w-full bottom-0 left-0 bg-secondary-color secondary-color px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-80 transition-opacity duration-300">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight">
          {productInfo.name}
        </h5>
      </a>
      <div className="flex items-center mt-2.5 mb-5">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {productInfo.average_star > 0 && <Star />}
          {productInfo.average_star > 1 && <Star />}
          {productInfo.average_star > 2 && <Star />}
          {productInfo.average_star > 3 && <Star />}
          {productInfo.average_star > 4 && <Star />}
        </div>
        <span className="bg-white secondary-color font-semibold px-2.5 py-0.5 rounded dark:bg-white ms-3">
          {productInfo.average_star}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">${productInfo.price}</span>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
