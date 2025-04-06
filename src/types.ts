export interface IProductAddedToCart {
  id: number;
  name: string;
  color_name: string;
  color_code: string;
  size_name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  discount: number;
  quantity: number;
  price: number;
  img: string;
}

export type AppError = string | { response: { data: { message: string } } };
