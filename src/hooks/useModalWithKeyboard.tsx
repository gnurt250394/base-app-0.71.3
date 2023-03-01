import {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import {Animated, Easing, Platform, Keyboard} from 'react-native';
import {height} from 'configs/Const';

const useModalWithKeyboard = (initValue: boolean = false) => {
  const [visible, setValue] = useState<boolean>(initValue);
  const translateY = useRef(new Animated.Value(height / 2)).current;

  const open = useCallback(() => {
    setValue(value => true);
  }, []);

  const toValue = useMemo(() => (Platform.OS === 'ios' ? -0 : 0), []);
  const close = useCallback(() => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      setValue(false);
    });
  }, []);

  const _keyboardWillHide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  }, []);
  const _keyboardWillShow = useCallback(e => {
    console.log('e: ', e);
    // Animated.timing(translateY, {
    //   toValue: -e.startCoordinates?.height,
    //   duration: 300,
    //   useNativeDriver: true,
    //   easing: Easing.quad,
    // }).start();
  }, []);
  const action = Platform.OS == 'ios' ? 'Will' : 'Did';
  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: toValue,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.quad,
      }).start();
    }
    let keyboardHide = Keyboard.addListener(
      // @ts-ignore
      'keyboard' + action + 'Hide',
      _keyboardWillHide,
    );
    let keyboardShow = Keyboard.addListener(
      // @ts-ignore
      'keyboard' + action + 'Show',
      _keyboardWillShow,
    );
    // cleanup function
    return () => {
      keyboardHide && keyboardHide.remove();
      keyboardShow && keyboardShow.remove();
      // Keyboard.removeListener('keyboard' + action + 'Show', _keyboardWillShow);
      // Keyboard.removeListener('keyboard' + action + 'Hide', _keyboardWillHide);
    };
  }, [visible, toValue]);

  return {
    visible,
    translateY,
    open,
    close,
  };
};
export default useModalWithKeyboard;
