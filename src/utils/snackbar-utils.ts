// import { Toast } from 'native-base';
import { AppName } from 'configs/Const';
import { showMessage, hideMessage, MessageType, Icon } from 'react-native-flash-message';
export default {
  showShort(message: string, type: MessageType) {
    this.show(message, type, 3000);
  },
  showLong(message: string, type: MessageType) {
    this.show(message, type, 6000);
  },
  show(message: string, type: MessageType, duration?: number) {
    if (duration != 0 && !duration) duration = 3000;
    this.showWithTitle(AppName, message, type, duration, type);

    // Toast.show({
    //     text: message,
    //     duration: 3000,
    //     type: _type
    // });
  },
  showWithTitle(message: string, description?: string, type?: MessageType, duration?: number, icon?: Icon) {
    showMessage({
      message,
      description,
      type,
      duration,
      icon,
    });
  },
};
