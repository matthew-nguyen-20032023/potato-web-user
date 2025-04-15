export default function FAQ() {
  return (
    <div className="bg-list-product-color secondary-color p-12">
      <h1 className="text-[3vh] font-semibold  mb-4">FAQ</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-[2vh] font-semibold ">
            How do I track my order?
          </h2>
          <p className="text-gray-600 text-[1.5vh]">
            You can track your order by clicking on the tracking link in your
            email confirmation.
          </p>
        </div>
        <div>
          <h2 className="text-[2vh] font-semibold ">
            What is your return policy?
          </h2>
          <p className="text-gray-600 text-[1.5vh]">
            We accept returns up to 30 days after delivery, if the item is
            unused and in its original condition.
          </p>
        </div>
        <div>
          <h2 className="text-[2vh] font-semibold ">
            Do you ship internationally?
          </h2>
          <p className="text-gray-600 text-[1.5vh]">
            Yes, we ship to most countries in the world.
          </p>
        </div>
        <div>
          <h2 className="text-[2vh] font-semibold ">
            How do I contact customer support?
          </h2>
          <p className="text-gray-600 text-[1.5vh]">
            You can contact customer support at
          </p>
        </div>
      </div>
    </div>
  );
}
