import { RequestMethod } from './../../request';
import network from "network/apis";
import { LoginParams } from "./AuthRequest";
import API from "network/request";

class AuthApi {
  async LoginApi<T>(params: LoginParams) {
    return API.request<T>(RequestMethod.POST, network.path.login, params, true);
  };
  async RegisterApi<T>(params: LoginParams) {
    return API.request<T>(RequestMethod.POST, network.path.register, params, true);
  };
  LogoutApi<T>(accessToken: string) {
    return API.request<T>(RequestMethod.GET, network.path.logout, { accessToken });
  };
  ForgotPasswordApi<T>(params: LoginParams) {
    return API.request<T>(RequestMethod.POST, network.path.forgotPassword, params);
  };
  CheckPhoneApi<T>(phone: string) {
    return API.request<T>(RequestMethod.GET, network.path.checkPhone, { phone });
  };
}
export default new AuthApi()
