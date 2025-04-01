export interface UserProfile {
  id: number;
  role: string;
  name: string;
  phone: string;
  email: string;
  referral_code: string;
  profile_img_url: string;
  created_at: string;
  updated_at: string;
}

export interface IEvent {
  id: number;
  name: string;
  description: string;
}

export interface IProductAddedToCart {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: string;
}

export interface IOrderDetail {
  order_details_order_id: number;
  order_details_product_detail_id: number;
  order_details_quantity: number;
  order_details_discount: number;
  order_details_final_price: number;
  order_details_created_at: Date;
  order_details_updated_at: Date;
  product_details_price: number;
  product_details_img_urls: string;
  products_name: string;
}

export interface IGetOrderDetail {
  id: number;
  user_id: number;
  paypal_order_id: string;
  full_name: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  country_code: string;
  total_price: number;
  discount: number;
  final_price: number;
  status: "created" | "delivering" | "done" | "returned" | "canceled";
  created_at: Date;
  updated_at: Date;
  details: IOrderDetail[];
}
