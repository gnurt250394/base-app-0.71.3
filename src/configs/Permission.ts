import {Alert, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export type PermissionStatus =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited';

export const requestCameraPermission = async (
  callback: (isGranted: boolean, status: PermissionStatus) => void,
) => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  const checkPermission = await check(permission!!);
  console.log(checkPermission);

  if (checkPermission === 'denied') {
    const requestPermission = await request(permission!!);
    if (requestPermission === 'granted') {
      // ToastMessage(i18next.t('ePerMissingCamera'));
      callback(true, requestPermission);
    }
  } else if (checkPermission === 'unavailable') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingPhotoLibUnavailable'));
  } else if (checkPermission === 'limited') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingPhotoLibLimited'));
  } else if (checkPermission === 'blocked') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingCamera'));
  } else if (checkPermission === 'granted') {
    callback(true, checkPermission);
  }
};

export const requestGalleryPermission = async (
  callback: (isGranted: boolean, status: PermissionStatus) => void,
) => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  });
  const checkPermission = await check(permission!!);
  console.log(checkPermission);

  if (checkPermission === 'denied') {
    // ToastMessage(i18next.t('ePerMissingCamera'));
    callback(false, checkPermission);
  } else if (checkPermission === 'unavailable') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingPhotoLibUnavailable'));
  } else if (checkPermission === 'limited') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingPhotoLibLimited'));
  } else if (checkPermission === 'blocked') {
    callback(false, checkPermission);
    //   ToastMessage(i18next.t('ePerMissingCamera'));
  } else if (checkPermission === 'granted') {
    callback(true, checkPermission);
  }
};
