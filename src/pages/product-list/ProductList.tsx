import { useEffect, useState } from "react";
import { listProducts } from "../../api/product.ts";
import Info from "../../components/Info.tsx";
import { ICategory, IColor, IProduct } from "../../types.ts";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultipleSelect.tsx";
import { getCategories } from "../../api/category.ts";
import { getColors } from "../../api/color.ts";

export function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [colors, setColors] = useState<{ value: string; label: string }[]>([]);
  const cacheCategory = "categories";
  const cacheColor = "colors";

  useEffect(() => {
    const categoriesCache = sessionStorage.getItem(cacheCategory);
    if (categoriesCache) {
      setCategories(JSON.parse(categoriesCache));
    } else {
      getCategories().then((data: { data: ICategory[] }) => {
        const categoriesOption = data.data.map((category) => {
          return { value: category.name, label: category.name };
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
      getColors().then((data: { data: IColor[] }) => {
        const colorsOption = data.data.map((category) => {
          return { value: category.name, label: category.name };
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

  useEffect(() => {
    listProducts(page, perPage).then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <div>
      <div className="bg-list-product-color flex justify-center p-4 items-center">
        <MultiSelect title="Select Category..." options={categories} />
        <MultiSelect title="Select Color..." options={colors} />
      </div>
      <div className="w-full flex justify-center bg-list-product-color">
        <br />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-list-product-color w-3/6">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="relative overflow-hidden shadow-lg rounded-xl group max-h-96 border"
              >
                <img
                  onClick={handleClick.bind(null, product.id)}
                  className="h-auto max-w-full rounded-lg object-cover hover:cursor-pointer"
                  src={product.img_urls}
                  alt=""
                />
                <Info productInfo={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
