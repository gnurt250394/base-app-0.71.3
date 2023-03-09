import API, {RequestMethod} from 'network/request';
import {BaseParam} from 'network/BaseParam';

class EmployeeApi {
  createEmployee<T>(params: any[]) {
    return API.request<T>(
      RequestMethod.POST,
      '/user/create-employee',
      params,
      true,
    );
  }
  getEmployees<T>(params: BaseParam) {
    return API.request<T>(
      RequestMethod.GET,
      '/user/get-employees',
      params,
      true,
    );
  }
}
export default new EmployeeApi();
