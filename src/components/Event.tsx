import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Info from "@/components/Info.tsx";
import { getEvents } from "@/api/event.ts";
import { IEvent, IProduct } from "@/types.ts";

export default function Event() {
  const [events, setEvents] = useState<{ event: IEvent; data: IProduct[][] }[]>(
    [{ event: {} as IEvent, data: [[]] }]
  );

  useEffect(() => {
    getEvents().then((response) => {
      const data: { event: IEvent; data: IProduct[][] }[] = [];
      response.data.forEach((event: { event: IEvent; data: IProduct[] }) => {
        let index = 0;
        const products: IProduct[][] = [];
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-list-product-color w-2/3">
            {event.data.map((products, index) => {
              return (
                <div key={index} className="grid gap-4">
                  {products.map((product) => {
                    return (
                      <div
                        key={product.id}
                        className="relative overflow-hidden shadow-lg group"
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
              );
            })}
          </div>
        </div>
      </div>
    );
  });
}
