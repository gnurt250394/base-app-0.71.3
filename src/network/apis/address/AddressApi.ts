import {RequestMethod} from '../../request';
import network from 'network/apis';
import API from 'network/request';
import {AddressParams, ShippingParams} from './AddressRequest';

class AddressApi {
  getAddress<T>(params: AddressParams) {
    return API.request<T>(RequestMethod.GET, '/ghtk', params);
  }
  getShipping<T>(params: ShippingParams) {
    return API.request<T>(RequestMethod.GET, '/ghtk', params);
  }
}
export default new AddressApi();
