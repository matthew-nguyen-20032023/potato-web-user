export interface IProductAddedToCart {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: string;
}

export type AppError = string | { response: { data: { message: string } } };
