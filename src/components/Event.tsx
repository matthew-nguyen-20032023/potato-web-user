import { IEvent } from "@/types.ts";
import Info from "@/components/Info.tsx";
import { getEvents } from "@/api/event.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductListed } from "mewmew-api-type";

export default function Event() {
  const [events, setEvents] = useState<
    { event: IEvent; data: ProductListed[] }[]
  >([{ event: {} as IEvent, data: [[]] }]);

  useEffect(() => {
    getEvents().then((response) => {
      const data: { event: IEvent; data: ProductListed[] }[] = [];
      response.data.forEach((event) => {
        let index = 0;
        const products: ProductListed[] = [];
        event.data.forEach((product) => {
          if (products[index] === undefined) {
            products[index] = [];
          }

          if (products[index].length < 3) {
            products[index].push(product);
          } else {
            index++;
            products[index] = [];
            products[index].push(product);
          }
        });

        data.push({ event: event.event, data: products });
        setEvents(data);
      });
    });
  }, []);

  const navigate = useNavigate();
  const handleClick = (productId: number) => {
    navigate(`/product-detail/${productId}`);
  };

  return events.map((event, index) => {
    return (
      <div key={index} className="bg-list-product-color">
        <h2 className="pt-4 secondary-color">{event.event.name}</h2>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-list-product-color w-3/6">
            {event.data.map((products) => {
              return products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="relative overflow-hidden shadow-lg rounded-xl group max-h-56 border hover:cursor-pointer"
                    onClick={handleClick.bind(null, product.id)}
                  >
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      src={product.img_urls}
                      alt=""
                    />
                    <Info productInfo={product} />
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  });
}
