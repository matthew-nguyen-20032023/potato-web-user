import Info from "./Info.tsx";
import { useNavigate } from "react-router-dom";

export default function ProductCarousel() {
  const products = [
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    ],
  ];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product-detail");
  };

  return (
    <div className="bg-list-product-color">
      <h2 className="pt-4 secondary-color">Featured products</h2>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-list-product-color w-2/3">
          {products.map((product) => {
            return (
              <div key={product[0]} className="grid gap-4">
                {product.map((img) => {
                  return (
                    <div
                      key={img}
                      className="relative overflow-hidden shadow-lg group"
                    >
                      <img
                        onClick={handleClick}
                        className="h-auto max-w-full rounded-lg object-cover hover:cursor-pointer"
                        src={img}
                        alt=""
                      />
                      <Info />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
