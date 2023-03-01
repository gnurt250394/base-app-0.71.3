import {
  Address,
  AdvertisementPartner,
  AdvertisementProductAttribute,
  AdvertisementProductCustomerContact,
  AdvertisementProductScheduler,
  ComboProducts,
} from './Home';

export type CartCategoryProps = OrderDetail & AdOrderDetail;
export type AllOrders = Order & AdOrder;

export type StatusOrderType =
  | 'IN_CART'
  | 'BOOKING'
  | 'PAID'
  | 'ORDERED'
  | 'ORDER_FAILED'
  | 'AT_WAREHOUSE'
  | 'ON_DELIVERY'
  | 'RECEIVED'
  | 'CANCEL'
  | 'COMPLAIN';

export interface OrderDetailProduct {
  productInfo: string;
  productOption: string;
  productLink: string;
  image: string;
  weight: number;
  price: number;
  priceWholeSale: number;
  amount: number;
  currencyUnit: string;
}

export interface Web {
  id: string;
  categories: string[];
  image: string;
  description: string;
  url: string;
  currencyUnit: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}

export interface OrderFee {
  subTotal: number;
  total: number;
  paid: number;
  shippingFeeAtPurchasePlace: number;
  shippingFeeToReceivePlace: number;
  purchaseFee: number;
  refund: number;
  totalRefund: number;
  refunded: number;
}

export interface OrderUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  deliveryLocation: Address;
  isWholeSale: boolean;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}

export interface OrderStaff {
  customerCareStaff: string;
  warehouseStaff: string;
  orderStaff: string;
  customerCare: OrderUser;
  warehouse: OrderUser;
  order: OrderUser;
}

export interface OrderComplain {
  id: string;
  complainNote: string;
  resolveNote: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InfoVA {
  response_code: string;
  message: string;
  account_no: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
  map_id: string;
  request_id: string;
  start_date: string;
  end_date: string;
  amount: number;
  transactionType: string;
  description: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  isWholeSale: boolean;
}

export interface Order {
  id: string;
  userId: string;
  fee: OrderFee;
  staff: OrderStaff;
  isShipAllAtOnce: boolean;
  deliveryLocation: Address;
  orderStatus: StatusOrderType;
  status: StatusOrderType;
  complainIds: string[];
  complains: OrderComplain[];
  infoVA: InfoVA;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  user: OrderUser;
  orderDetails: OrderDetail[];
  Kind: string;
  exchangeRate: ExchangeRate[];
  isWholeSale: boolean;
}

export interface OrderDetail {
  id: string;
  orderId: string;
  webId: string;
  web: Web;
  product: OrderDetailProduct;
  fee: OrderDetailFee;
  status: string;
  customerNote: string;
  staffNote: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  order: Order;
  Kind: string;
}

export interface OrderDetailFee {
  shippingFeeToReceivePlace: number;
  shippingFeeToReceivePlacePerWeb: number;
  subTotal: number;
  purchaseFee: number;
  subTotalWeb: number;
  shippingFeeAtPurchasePlace: number;
}

export interface AdOrderDetailFee {
  shippingFee: number;
  subTotal: number;
  discount: number;
}

export interface AdOrderProductAttribute {
  name: string;
  value: string;
}

export interface AdOrderFee {
  subTotal: number;
  total: number;
  paid: number;
  shippingFee: number;
  discount: number;
  resaleTotal: number;
}

export interface AdOrderUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  deliveryLocation: Address;
  isWholeSale: boolean;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}

export interface AdOrderStaff {
  customerCareStaff: string;
  warehouseStaff: string;
  customerCare: AdOrderUser;
  warehouse: AdOrderUser;
}

export interface UserCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: Address[];
  userId: string;
}
export interface AdOrder {
  id: string;
  userId: string;
  paymentId: string;
  user: AdOrderUser;
  fee: AdOrderFee;
  staff: AdOrderStaff;
  deliveryLocation: Address;
  userCustomerId: string;
  payment: Payment;
  userCustomer: UserCustomer;
  adOrderStatus: StatusOrderType;
  status: StatusOrderType;
  complainIds: string[];
  complains: OrderComplain[];
  infoVA: InfoVA;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  isWholeSale: boolean;
  orderDetails: AdOrderDetail[];
  Kind: string;
  isCustomerBearShippingFee: boolean;
  isCustomerPaid: boolean;
}

export interface AdOrderDetail {
  id: string;
  orderId: string;
  productId: string;
  product: AdvertisementProduct;
  amount: number;
  fee: AdOrderDetailFee;
  attributes: AdOrderProductAttribute[];
  customerNote: string;
  staffNote: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  schedulers: AdvertisementProductScheduler[];
  order: AdOrder;
  Kind: string;
  feeResale: number;
}

export interface AdvertisementProduct {
  id: string;
  name: string;
  categoryIds: string[];
  images: string[];
  type: string;
  price: number;
  hasShippingFee: boolean;
  shippingFee: number;
  partnerId: string;
  partner: AdvertisementPartner;
  link: string;
  schedulers: AdvertisementProductScheduler[];
  attributes: AdvertisementProductAttribute[];
  comboProducts: ComboProducts[];
  customerContacts: AdvertisementProductCustomerContact[];
  shortDescription: string;
  description: string;
  moreInformation: string;
  availableForShopping: boolean;
  slug: string;
  estimateShippingTimeFrom: string;
  estimateShippingTimeTo: string;
  isSpecialOffer: boolean;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCEL';
export type PaymentMethod = 'VA' | 'MOMO';

export interface Payment {
  id: string;
  orderIds: string[];
  method: PaymentMethod;
  status: PaymentStatus;
  detail: any;
  makePaymentAt: string;
  isDel: boolean;
  createdAt: string;
  updatedAt: string;
}
