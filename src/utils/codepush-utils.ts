import codePush from 'react-native-code-push';
import {Alert, Platform, Linking} from 'react-native';
import snackbar from 'utils/snackbar-utils';
import {
  getAppstoreAppVersion,
  getAppstoreAppMetadata,
} from 'react-native-appstore-version-checker';
import DeviceInfo from 'react-native-device-info';
const getVerstionAppstore = async () => {
  try {
    let bunndleId = DeviceInfo.getBundleId();
    let versionApp = DeviceInfo.getVersion();
    let option =
      Platform.OS == 'ios'
        ? {
            jquerySelectors: {
              version: "[itemprop='softwareVersion']",
            },
            typeOfId: 'bundleId',
          }
        : undefined;
    let appVersion = await getAppstoreAppMetadata(bunndleId, option);
    return appVersion?.version > versionApp;
  } catch (error) {
    return false;
  }
};
function updateFromAppStore() {
  const appName = Platform.OS == 'android' ? 'CH Play' : 'App Store';
  const packageName = 'com.jaytest';
  const id = '14281484221';
  Alert.alert(
    'THÔNG BÁO',
    `Ứng dụng đã có phiên bản mới trên ${appName}. Bạn vui lòng cập nhật để có trải nghiệm tốt nhất!`,
    [
      {
        text: 'Cập nhật',
        onPress: () => {
          let link =
            Platform.OS == 'android'
              ? `market://details?id=${packageName}`
              : `itms-apps://itunes.apple.com/us/app/id${id}?mt=8`;
          Linking.canOpenURL(link).then(
            (supported) => {
              supported && Linking.openURL(link);
            },
            (err) => {
              console.log('err: ', err);
            },
          );
        },
      },
    ],
    {cancelable: false},
  );
}
export default {
  async checkupDate() {
    let updateFromStore = await getVerstionAppstore();
    if (updateFromStore) {
      updateFromAppStore();
    } else {
      return codePush.checkForUpdate();
    }
  },
};
