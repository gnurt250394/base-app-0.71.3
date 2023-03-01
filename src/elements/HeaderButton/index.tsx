import {useNavigation} from '@react-navigation/native';
import Image from 'elements/Image';
import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface HeaderButtonProps {}

const HeaderButton = memo((props: HeaderButtonProps) => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Image source={images.ic_back} />
      </TouchableOpacity>
    </View>
  );
});

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRowSpace,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Platinum,
    ...Theme.center,
  },
});
