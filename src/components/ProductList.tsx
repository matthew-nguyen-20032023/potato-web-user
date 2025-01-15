import Info from "./Info.tsx";

export default function ProductCarousel() {
  return (
    <div className="w-full flex justify-center bg-list-product-color">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-list-product-color w-2/3">
        <div className="grid gap-4">
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt=""
            />
            <Info />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt=""
            />
            <Info />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
              alt=""
            />
            <Info />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
              alt=""
            />
            <Info />
          </div>
          <div className="relative overflow-hidden shadow-lg group">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
              alt=""
            />
            <Info />
          </div>
        </div>
      </div>
    </div>
  );
}
