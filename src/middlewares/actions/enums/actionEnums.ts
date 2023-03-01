import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {RoleType} from 'common/Constants';
import AuthApi from 'network/apis/auth/AuthApi';
import snackbarUtils from 'utils/snackbar-utils';
import actionTypes from '../actionTypes';
import {Enums} from 'res/type/Enums';
const _onSaveEnums = (payload: Enums) => {
  return {
    type: actionTypes.SAVE_ENUMS,
    payload,
  };
};
export const onSaveEnums = (enums: Enums) => {
  return (dispatch: any, getState: any) => {
    dispatch(_onSaveEnums(enums));
  };
};
