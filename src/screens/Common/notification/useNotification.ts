import {useState} from 'react';
import {useSelector} from 'hooks/useSelector';
import messaging from '@react-native-firebase/messaging';
import NotificationApi from 'network/apis/notification/NotificationApi';

interface useNotificationProps {}

const useNotification = () => {
  const [state, setState] = useState();
  const userProfile = useSelector(state => state.userProfile);
  const requestPermission = () => {
    messaging()
      .requestPermission()
      .then(() => {
        onRegisterFirebase();
      })
      .catch(error => {
        console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  async function checkPermission() {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      onRegisterFirebase();
    } else {
      requestPermission();
    }
  }
  const onOpen = () => {};
  const onRegisterFirebase = async () => {
    try {
      let token = await messaging().getToken();
      console.log('-> token', token);
      let res = await NotificationApi.registerNotification([token]);
      console.log('-> res', res);
    } catch (e) {
      console.log('-> 1e', e);
    }
  };
  return {
    onOpen,
    onRegisterFirebase,
    checkPermission,
    requestPermission,
  };
};

export default useNotification;
