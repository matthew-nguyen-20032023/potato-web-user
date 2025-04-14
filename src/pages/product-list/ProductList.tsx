import { AppError } from "@/types.ts";
import Info from "@/components/Info.tsx";
import { getColors } from "@/api/color.ts";
import ReactPaginate from "react-paginate";
import { LiaSadCry } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "@/api/product.ts";
import { ProductListed } from "mewmew-api-type";
import { getCategories } from "@/api/category.ts";
import { Spinning } from "@/components/Spinning.tsx";
import { cacheCategory, cacheColor } from "@/const.ts";
import MultiSelect from "@/components/MultipleSelect.tsx";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";

export default function ProductList() {
  const [categories, setCategories] = useState<
    { value: string; label: string; id: number }[]
  >([]);
  const [colors, setColors] = useState<
    { value: string; label: string; id: number }[]
  >([]);

  const perPage = 8;
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [isSpinner, setIsSpinner] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [products, setProducts] = useState<ProductListed>([]);
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchColor, setSearchColor] = useState<string>("");

  useEffect(() => {
    const categoriesCache = sessionStorage.getItem(cacheCategory);
    if (categoriesCache) {
      setCategories(JSON.parse(categoriesCache));
    } else {
      getCategories().then((data) => {
        const categoriesOption = data.data.map((category) => {
          return {
            value: category.name,
            label: category.name,
            id: category.id,
          };
        });
        sessionStorage.setItem(cacheCategory, JSON.stringify(categoriesOption));
        setCategories(categoriesOption);
      });
    }
  }, []);

  useEffect(() => {
    const colorsCache = sessionStorage.getItem(cacheColor);
    if (colorsCache) {
      setColors(JSON.parse(colorsCache));
    } else {
      getColors().then((data) => {
        const colorsOption = data.data.map((color) => {
          return { value: color.name, label: color.name, id: color.id };
        });
        sessionStorage.setItem(cacheColor, JSON.stringify(colorsOption));
        setColors(colorsOption);
      });
    }
  }, []);

  const navigate = useNavigate();
  const handleClick = (productId: number) => {
    navigate(`/product-detail/${productId}`);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  const listProductHandler = async () => {
    setIsSpinner(true);
    try {
      const data = await listProducts(
        page,
        perPage,
        searchName,
        searchCategory,
        searchColor
      );
      setProducts(data.data);
      setTotalProduct(data?.metadata?.total ?? 0);
      showMessageSuccess(data.message);
    } catch (err) {
      showMessageError(err as AppError);
    } finally {
      setIsSpinner(false);
    }
  };

  useEffect(() => {
    listProductHandler().then();
  }, [page]);

  return (
    <div className="bg-white">
      <div className="flex justify-center pt-4 items-center">
        <div className="flex justify-center items-center w-3/6 p-3">
          <input
            type="text"
            id="searchName"
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search..."
            className="bg-white m-1 border border-gray-300 rounded-lg block py-3 ps-4 pe-9 w-[30vh] secondary-color text-[1.5vh] h-[3vh]"
          />
          <MultiSelect
            title="Select Category..."
            options={categories}
            onChange={(values) => {
              setSearchCategory(values);
            }}
            className={"w-[29vh] h-[3vh]"}
          />
          <MultiSelect
            title="Select Color..."
            options={colors}
            onChange={(values) => {
              setSearchColor(values);
            }}
            className={"w-[29vh] h-[3vh]"}
          />
          <button
            type="button"
            className="flex items-center justify-center m-1 bg-main-color text-white rounded-lg text-[1.4vh] hover:scale-110 w-[10vh] h-[3vh]"
            onClick={listProductHandler}
          >
            {isSpinner && <Spinning />}
            {!isSpinner && "Search"}
          </button>
        </div>
      </div>
      {products.length === 0 && (
        <div className="w-full flex justify-center">
          <h2 className="flex items-center gap-2 secondary-color">
            So sorry, we can not found product for you <LiaSadCry />
          </h2>
        </div>
      )}
      {products.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 w-3/6">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="relative overflow-hidden shadow-lg rounded-xl group h-[20vh] border hover:cursor-pointer"
                  onClick={handleClick.bind(null, product.id)}
                >
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={product.img_urls.split(",")[0]}
                    alt=""
                  />
                  <Info productInfo={product} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="w-full flex justify-center pb-5">
        <ReactPaginate
          className="inline-flex -space-x-px text-[1.7vh] p-2 pagination"
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={totalProduct}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          activeClassName="active"
        />
      </div>
    </div>
  );
}
