import axios from 'axios';
import HostConfig from 'network/HostConfig';
import API, {RequestMethod} from 'network/request';
import {UploadImageCampainParams} from './ProfileRequest';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';

class ProfileApi {
  uploadAvatar<T>(params: any[]) {
    return API.requestUploadFiles('/assets/single', params, () => {}, true);
  }
  async uploadImageCampain<T>(params: any) {
    return API.requestUploadFiles('/assets/single', params, () => {}, true);
  }
}
export default new ProfileApi();
