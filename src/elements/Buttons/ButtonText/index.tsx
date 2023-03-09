import {useTheme} from 'configs/ChangeTheme';
import Text, {TextProps} from 'elements/Text';
import React, {memo} from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';

interface ButtonTextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  marginLeft?: number;
  backgroundColor?: ColorValue | string;
  white?: boolean;
  hilight?: boolean;
  blueLight?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  height?: number | string;
}

const ButtonText = memo(
  ({
    backgroundColor,
    title,
    style,
    titleColor = colors.text,
    onPress,
    borderColor,
    marginLeft,
    white,
    blueLight,
    hilight,
    disabled,
    isLoading,
    height,
    ...textProps
  }: ButtonTextProps) => {
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          Theme.flexRow,
          {
            marginLeft: marginLeft,
            backgroundColor: disabled
              ? String(backgroundColor) + '70'
              : backgroundColor || theme.backgroundItem,
            height: height ? height : 42,
          },
          style,
        ]}
        onPress={onPress}
        activeOpacity={0.54}>
        <Text
          blueLight={blueLight}
          color={disabled ? titleColor + '98' : titleColor}
          white={white}
          hilight={hilight}
          {...textProps.textProps}>
          {title}
        </Text>
        {!!isLoading && (
          <ActivityIndicator color={colors.White} style={{marginLeft: 10}} />
        )}
      </TouchableOpacity>
    );
  },
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.White,
    ...Theme.center,
  },
});
