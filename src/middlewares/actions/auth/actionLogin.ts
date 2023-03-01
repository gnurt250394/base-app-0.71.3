import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {RoleType} from 'common/Constants';
import AuthApi from 'network/apis/auth/AuthApi';
import snackbarUtils from 'utils/snackbar-utils';
import actionTypes from '../actionTypes';
const _login = (payload: any, token?: string, role?: string) => {
  return {
    type: actionTypes.LOGIN,
    payload,
    token,
    role,
  };
};
const _savelogin = (payload: any) => {
  return {
    type: actionTypes.SAVE_LOGIN,
    payload,
  };
};
const _saveTimeShowPopup = (payload: number) => {
  return {
    type: actionTypes.SAVE_TIME_SHOW_POPUP,
    payload,
  };
};
const _onSelectPosition = (payload: RoleType) => {
  return {
    type: actionTypes.SELECT_POSITION,
    payload,
  };
};
const _logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const onSaveDataUser = (user: any, token?: string, role?: RoleType) => {
  return async (dispatch: any, getState: any) => {
    dispatch(_login(user, token, role));
  };
};
export const onSaveTime = (time: number) => {
  return async (dispatch: any, getState: any) => {
    dispatch(_saveTimeShowPopup(time));
  };
};

export const onLogout = () => async (dispatch: any, getState: any) => {
  dispatch(_logout());
};
export const onLogin =
  (user: any, token: string, role: RoleType) =>
  async (dispatch: any, getState: any) => {
    dispatch(_login(user, token, role));
  };
export const onSaveLogin =
  (username: string, password: string, isSave: boolean) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(_savelogin({username, password, isSave}));
    } catch (error) {}
  };
export const onSelectPosition = (position: RoleType) => {
  return (dispatch: any, getState: any) => {
    dispatch(_onSelectPosition(position));
  };
};
