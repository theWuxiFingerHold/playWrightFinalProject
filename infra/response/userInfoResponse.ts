interface ShippingAddress {
  city: null | string;
  street: null | string;
  telephone: null | string;
  lastname: null | string;
  firstname: null | string;
}

interface AvailablePaymentMethod {
  code: string;
}

interface ScAmount {
  currency: string;
  value: number;
}

interface CartItem {
  __typename: string;
  id: string;
  product: ConfigurableProduct;
}

interface ConfigurableProduct {
  __typename: string;
  sku: string;
  id: number;
  visibility: string;
  status: string;
  early_cutoff: number;
  icon_stampa: null;
  justlanded: string;
  stock_status2: string;
  stampa: null;
  stampa_sale: number;
  stampa_strip: number;
  stampa_vip_strip: null;
  lastcall: string;
  category_ids: string[];
  brand: string;
  has_school: boolean;
  use_qty: number;
  brand_url: {
    brand: number;
    name: string;
    url: string;
  };
  div_top: string;
  div_top_code: string;
  div: string;
  div_code: string;
  type: string;
  fabric: string;
  meta_title: null | string;
  meta_keyword: null | string;
  meta_description: null | string;
  swatch_image: null;
  image: {
    disabled: null;
    label: string;
    position: null;
    url: string;
  };
}

interface CartObject {
  id: string;
  email: string;
  max_dc_points: number;
  shipping_address: ShippingAddress;
  selected_shipping_method: null;
  available_payment_methods: AvailablePaymentMethod[];
  sc_amount_left: ScAmount;
  max_sc_amount_redeem: number;
  items: CartItem[];
}

interface SocialLoginSession {
  date_of_birth: null;
  email: null;
  first_name: null;
  is_proxy_email: null;
  last_name: null;
  provider: null;
  redirect_url: null;
}

interface CurrentUserInfo {
  customerId: number;
  social_login_session: SocialLoginSession;
  is_logged_in: number;
  scBalance: number;
  customerGroupId: number;
  firstName: string;
  firstNameOriginal: string;
  lastName: string;
  gender: string;
  birthdate: string;
  email: string;
  city: string;
  zip: string;
  country: string;
  isDCMember: number;
  dcId: string;
  dcBalance: number;
  dc_membership_points_percent: number;
  dc_vip_checked: boolean;
  dc_vip_show: boolean;
  telephone: string;
  international_phone: string;
  isMultipassUser: boolean;
  isMultipassLinkVisible: boolean;
  cart_items_count: number;
  customerEmail: string;
  first_time_user: number;
  pastPurchase: number;
  cart_object: CartObject;
}

export interface Main {
  data: {
    currentUserInfo: CurrentUserInfo;
  };
}
