import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEventListener, ScreenRect} from 'react-native';

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
});
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
};

const useKeyboard = () => {
  const [shown, setShown] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    start?: ScreenRect;
    end: ScreenRect;
  }>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const handleKeyboardWillShow: KeyboardEventListener = e => {
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
  };
  const handleKeyboardDidShow: KeyboardEventListener = e => {
    setShown(true);
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardWillHide: KeyboardEventListener = e => {
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
  };
  const handleKeyboardDidHide: KeyboardEventListener = e => {
    setShown(false);
    if (e) {
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  useEffect(() => {
    let keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow,
    );
    let keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    let keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillHide,
    );
    let keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardWillShow && keyboardWillShow.remove();
      keyboardDidShow && keyboardDidShow.remove();
      keyboardWillHide && keyboardWillHide.remove();
      keyboardDidHide && keyboardDidHide.remove();
      // Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow);
      // Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow);
      // Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide);
      // Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
    };
  }, []);

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  };
};

export default useKeyboard;
