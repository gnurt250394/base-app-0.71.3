import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface ItemAccountProps {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
  count?: number;
}

const ItemAccount = (props: ItemAccountProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, Theme.flexRow]}>
      <View style={[Theme.flexRow, Theme.flex1]}>
        <Image source={props.icon} />
        <Text
          size={14}
          lineHeight={24}
          color={colors.text}
          marginLeft={12}
          semiBold>
          {props.label} {props?.count ? `(${props.count})` : ''}
        </Text>
      </View>
      <Image
        source={images.ic_dropdown}
        style={{transform: [{rotate: '-90deg'}]}}
      />
    </TouchableOpacity>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.White,
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
});
