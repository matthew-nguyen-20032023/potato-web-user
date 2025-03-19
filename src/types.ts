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

export interface IProduct {
  average_star: number;
  category_id: number;
  created_at: string;
  id: number;
  img_urls: string;
  name: string;
  price: number;
  review_count: number;
  story: string;
  updated_at: string;
}

export interface IProductDetail {
  color_id: number;
  created_at: string;
  height: number;
  discount: number;
  id: number;
  img_urls: string;
  length: number;
  size_name: string;
  price: number;
  product_id: number;
  quantity: number;
  remaining_quantity: number;
  size_id: number;
  updated_at: string;
  width: number;
  weight: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IColor {
  id: number;
  name: string;
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
