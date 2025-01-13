import Info from "./Info.tsx";

export default function ProductCarousel() {
  return (
    <>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-white hover:text-white border border-orange-600 bg-white hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-orange-500 dark:text-white-500 dark:hover:text-white dark:hover:bg-orange-500 dark:bg-orange-500 dark:focus:ring-orange-300"
        >
          All categories
        </button>
        <button
          type="button"
          className="text-white hover:text-white border border-orange-600 bg-white hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-orange-500 dark:text-white-500 dark:hover:text-white dark:hover:bg-orange-500 dark:bg-orange-400 dark:focus:ring-orange-300"
        >
          Shoes
        </button>
        <button
          type="button"
          className="text-white hover:text-white border border-orange-600 bg-white hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-orange-500 dark:text-white-500 dark:hover:text-white dark:hover:bg-orange-500 dark:bg-orange-400 dark:focus:ring-orange-300"
        >
          Hats
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6">
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
    </>
  );
}
