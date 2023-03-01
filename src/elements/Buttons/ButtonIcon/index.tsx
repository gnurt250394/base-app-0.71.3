import Image from 'elements/Image';
import React, {memo, useCallback} from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface ButtonIconProps {
  icon: ImageSourcePropType;
  style?: ViewStyle;
  iconStyle?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
  marginRight?: number;
  backgroundColor?: ColorValue | string;
  tintColor?: ColorValue | string;
  marginLeft?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  borderColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonIcon = memo(
  ({
    icon,
    backgroundColor = colors.White,
    tintColor,
    marginRight,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderColor,
    borderRadius = 16,
    height = 32,
    width = 32,
    style,
    iconStyle,
    onPress,
    disabled,
    ...props
  }: ButtonIconProps) => {
    const _onPress = useCallback(() => {
      onPress && onPress();
    }, [onPress]);

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.54}
        style={[
          styles.container,
          {
            backgroundColor: disabled ? colors.Platinum : backgroundColor,
            marginRight: marginRight,
            marginLeft: marginLeft,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            borderColor: borderColor
              ? borderColor
              : disabled
              ? colors.Platinum
              : backgroundColor,
            borderWidth: 1,
            borderRadius: borderRadius,
            height: height,
            width: width,
          },
          style,
        ]}
        disabled={disabled}
        onPress={_onPress}>
        <Image tintColor={tintColor} style={[iconStyle]} source={icon} />
      </TouchableOpacity>
    );
  },
);

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    ...Theme.center,
  },
});
