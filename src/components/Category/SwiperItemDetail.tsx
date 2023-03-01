import {Constants} from 'configs';
import Image from 'elements/Image';
import Text from 'elements/Text';
import React, {memo} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import scale from 'utils/scale';
interface SwiperItemDetailProps {
  image: string;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

const SwiperItemDetail = memo(({image, isFirstItem, isLastItem}: SwiperItemDetailProps) => {
  return (
    <View style={[styles.container]}>
      <Image
        source={{uri: image}}
        style={[styles.image]}
        resizeMode="stretch"
      />
    </View>
  );
});

export default SwiperItemDetail;

const styles = StyleSheet.create({
  page: {
    width: Constants.width,
  },
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  desc: {
    position: 'absolute',
    bottom: 30,
    left: 32,
    right: 32,
    color: colors.Black,
  },
  isFirstItem: {
    borderBottomLeftRadius: 40,
  },
  isLastItem: {
    borderBottomRightRadius: 40,
  },
});
