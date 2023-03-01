import {Constants} from 'configs';
import Image from 'elements/Image';
import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from 'res/colors';
import scale from 'utils/scale';

interface SwiperItemProps {
  image: string;
  isFirstItem?: boolean;
  isLastItem?: boolean;
  onPress: () => void;
}

const SwiperItem = memo(
  ({image, onPress, isFirstItem, isLastItem}: SwiperItemProps) => {
    return (
      <TouchableWithoutFeedback onPress={onPress} style={[styles.container]}>
        <Image
          source={{uri: image}}
          style={[styles.image]}
          resizeMode="stretch"
        />
      </TouchableWithoutFeedback>
    );
  },
);

export default SwiperItem;

const styles = StyleSheet.create({
  page: {
    width: Constants.width,
  },
  container: {
    overflow: 'hidden',
    borderRadius: scale(8),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(8),
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
