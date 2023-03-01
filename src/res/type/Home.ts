import {ApolloError, NetworkStatus} from '@apollo/client';

export interface CategoryItemProp {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  parentId: string;
  children: CategoryItemProp[];
  order: number;
  isSelected?: boolean;
}
export interface Address {
  isDefault: boolean;
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
  wardId: number;
  wardName: string;
  street: string;
}
export interface AdvertisementPartner {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  createdAt: string; // DateTime!
  updatedAt: string; // DateTime!
  isDel: boolean;
}
export interface AdvertisementProductAttribute {
  name: string;
  type: string;
  value: string[];
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
export type DiscountType = 'percent' | 'unit';
export interface AdvertisementProductScheduler {
  id: string;
  name: string;
  advertisementProductType: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string; // DateTime
  endDate: string;
  startTime: string;
  endTime: string;
  selectedDay: string[];
  advertisementProductIds: string[];
  advertisementProducts: AdvertisementProduct[];
  isSpecialOffer: boolean;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}
export interface ItemAttribute {
  name: string;
  value: string;
}
export interface ComboItem {
  productId: string;
  product: AdvertisementProduct;
  schedulers: AdvertisementProductScheduler[];
  attributes: ItemAttribute[];
}
export interface ComboProducts {
  name: string;
  items: ComboItem[];
}
export interface AdvertisementProductCustomerContact {
  id: string;
  productId: string;
  name: string;
  note: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}
type ProductType = 'ADVERTISEMENT' | 'TRADING';
export interface FacebookTemplate {
  name: string;
  content: string;
}
export interface HotDealsItemProp {
  forSale: boolean;
  forWholeSale: boolean;
  priceWholeSale: number;
  discountWholeSaleLevel1: number;
  weight: number;
  deliveryType: string;
  deliveryFee: number;
  reviewImages: string[];
  id: string;
  name: string;
  categoryIds: string[];
  images: string[];
  type: ProductType;
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
  createdAt: string; // DateTime!
  updatedAt: string; //DateTime!
  isDel: boolean;
  facebookTemplates: FacebookTemplate[];
}
export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export interface Result<T> {
  data: T | undefined;
  networkStatus: NetworkStatus;
  error: ApolloError | undefined;
  loading: boolean;
  refreshing: boolean;
  isLoadMore: boolean;
  refresh: (arg0?: {name?: SortEnum; price?: SortEnum}) => void;

  loadMore(): void;
}
export interface ParamsBase<T> {
  filters: {
    page?: number;
    query?: T;
    limit?: number;
    sort?: {
      createdAt: SortEnum;
    };
    populate?: string[];
    pagination?: boolean;
  };
}
