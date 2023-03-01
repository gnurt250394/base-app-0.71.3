export type AddressParams = {
  endpoint: string;
  'params[type]'?: string;
  'params[parent_id]'?: string;
};
export type ShippingParams = {
  endpoint: string;
  'data[fromCityName]': string;
  'data[fromDistrictName]': string;
  'data[toCityName]': string;
  'data[toDistrictName]': string;
  'data[shippingWeight]': number;
  'data[carrierIds][0]': number;
};
