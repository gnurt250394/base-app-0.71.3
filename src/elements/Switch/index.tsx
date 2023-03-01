import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import scale from 'utils/scale';

interface Props {
  style?: ViewStyle;
  enable?: boolean;
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  onPress?: () => void;
}

export default ({
  style,
  enable,
  backgroundActive,
  backgroundInactive,
  circleActiveColor,
  circleInActiveColor,
  onPress,
}: Props) => {
  const transX = useRef(new Animated.Value(0)).current;
  const colorToggle = enable ? circleActiveColor : circleInActiveColor;
  const viewToggle = enable
    ? {backgroundColor: backgroundActive}
    : {backgroundColor: backgroundInactive};

  const _onPress = (type: any) => {
    if (enable) {
      Animated.spring(transX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (enable === false) {
      Animated.spring(transX, {
        toValue: 12,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View
        style={[
          styles.container,
          viewToggle,
          style,
          {
            borderWidth: !enable ? 0.5 : scale(1.5),
            borderColor: enable ? circleActiveColor : colors.transparent,
          },
        ]}>
        <Animated.View
          style={[
            styles.circleToggle,
            {backgroundColor: colorToggle},
            {transform: [{translateX: transX}]},
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(34),
    height: scale(22),
    borderRadius: scale(16),
    justifyContent: 'center',
    borderColor: colors.primary,
  },
  circleToggle: {
    width: scale(16),
    margin: scale(2),
    height: scale(16),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
});
