import Image from 'elements/Image';
import React, {memo} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface CheckBoxProps {
  icon?: ImageSourcePropType;
  isCheck?: boolean | number;
  style?: ViewStyle;
  onPress?: () => void;
  isRounded?: boolean;
}

const CheckBox = memo(
  ({isCheck, style, onPress, isRounded, icon}: CheckBoxProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={{...Theme.icons, ...Theme.center, ...style}}
        onPress={onPress}>
        {isCheck ? (
          <Image source={icon ? icon : images.ic_checked} />
        ) : (
          <View>
            <Image source={images.ic_uncheck} />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

export default CheckBox;

const styles = StyleSheet.create({
  container: {},
});
