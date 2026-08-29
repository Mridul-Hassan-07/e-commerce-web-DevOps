export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export interface ProductVariant {
  id: string;
  sku: string;
  name_en: string;
  name_bn: string;
  price: number;
  original_price?: number;
  stock: number;
  is_default?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  features_en: string[];
  features_bn: string[];
  category_id: string;
  subcategory_id?: string;
  keywords?: string[];
  brand: string;
  primary_image: string;
  images: string[];
  variants: ProductVariant[];
  is_featured?: boolean;
  is_active: boolean;
  low_stock_threshold: number;
  video_url?: string;
  video_title?: string;
  video_placement?: 'gallery' | 'below_images' | 'below_description';
  video_enabled?: boolean;
  rating: number;
  reviews_count: number;
  sales_count: number;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string;
  description_en?: string;
  description_bn?: string;
  image: string;
  parent_id?: string;
  is_active: boolean;
  icon_name?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid';
export type AreaType = 'dhaka' | 'outside_dhaka';

export interface OrderItem {
  productId: string;
  variantId: string;
  title_en: string;
  title_bn: string;
  variant_name_en: string;
  variant_name_bn: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderStatusLog {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  area_type: AreaType;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  coupon_code?: string;
  total_amount: number;
  order_status: OrderStatus;
  payment_method: 'cod';
  payment_status: PaymentStatus;
  courier: 'Steadfast';
  courier_consignment_id?: string;
  dispatch_date?: string;
  purchase_tracked: boolean;
  admin_notes?: string;
  status_timeline: OrderStatusLog[];
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  phone: string;
  email: string;
  password?: string;
  district?: string;
  upazila?: string;
  address?: string;
  area_type?: AreaType;
  created_at: string;
  is_blocked?: boolean;
  role: 'customer' | 'admin';
}

export interface AdminAccount {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'manager' | 'support';
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  min_spend: number;
  is_active: boolean;
  description_en: string;
  description_bn: string;
}

export interface ShippingSettings {
  dhaka_fee: number;
  outside_dhaka_fee: number;
  free_shipping_threshold?: number;
}

export interface SiteSettings {
  site_name: string;
  tagline_en: string;
  tagline_bn: string;
  hotline: string;
  support_email: string;
  office_address_en: string;
  office_address_bn: string;
  steadfast_enabled: boolean;
  facebook_url?: string;
  whatsapp_number?: string;
  instagram_url?: string;
  youtube_url?: string;
  revenue_metric_mode: 'delivered_only' | 'all_orders';
}

export interface FAQ {
  id: string;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  category: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  reply?: string;
  created_at: string;
}

export interface DataLayerEvent {
  id: string;
  event: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'custom';
  timestamp: string;
  payload: Record<string, any>;
}

export type ActiveRoute =
  | { view: 'home' }
  | { view: 'shop'; categorySlug?: string; subcategorySlug?: string; search?: string; searchQuery?: string }
  | { view: 'product'; slug: string }
  | { view: 'cart' }
  | { view: 'checkout' }
  | { view: 'order_success'; orderNumber: string }
  | { view: 'order_track'; initialOrderNumber?: string; initialPhone?: string }
  | { view: 'auth'; mode?: 'login' | 'signup' | 'forgot' | 'reset' }
  | { view: 'profile' }
  | { view: 'my_orders'; selectedOrderNumber?: string }
  | { view: 'about' }
  | { view: 'contact' }
  | { view: 'policy'; policyType: 'shipping' | 'refund' | 'privacy' | 'terms' }
  | { view: 'admin'; section: 'dashboard' | 'orders' | 'products' | 'categories' | 'brands' | 'customers' | 'reports' | 'shipping' | 'admins' | 'site' | 'content' | 'support' | 'refunds' };
