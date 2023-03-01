import React, {useEffect, useRef} from 'react';
import {Easing, LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {Config, State} from 'res/type/animated';
import {runTiming} from 'utils/runTiming';

const {Clock, Value} = Animated;

export function useCollapsible(show?: boolean) {
  const [height, setHeight] = React.useState(0);

  const [isShow, setIsShow] = React.useState<boolean>(show || false);

  const onPress = () => {
    setIsShow(isShow => !isShow);
  };

  return {
    onPress,
    isShow,
  };
}
