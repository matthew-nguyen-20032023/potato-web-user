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
  depth: number;
  discount: number;
  id: number;
  img_urls: string;
  length: number;
  price: number;
  product_id: number;
  quantity: number;
  remaining_quantity: number;
  size_id: number;
  updated_at: string;
  width: number;
}
