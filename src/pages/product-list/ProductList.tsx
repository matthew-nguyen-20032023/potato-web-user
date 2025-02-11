import { useEffect, useState } from "react";
import { listProducts } from "../../api/product.ts";
import Info from "../../components/Info.tsx";
import { IProduct } from "../../types.ts";
import { useNavigate } from "react-router-dom";

export function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 12;

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
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-list-product-color w-2/3">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="relative overflow-hidden shadow-lg group max-h-96"
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
