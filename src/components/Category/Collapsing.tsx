import Image from 'elements/Image';
import Text from 'elements/Text';
import {useCollapsible} from 'hooks/useCollapsible';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface CollapsingProps {
  title: string;
  children: React.ReactNode;
  onPress: () => void;
}

const Collapsing = (props: CollapsingProps) => {
  const {isShow} = useCollapsible(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[Theme.flexRowSpace, Theme.flex1, {paddingVertical: 5}]}>
        <Text size={14} semiBold lineHeight={24} color={colors.text}>
          {props?.title}
        </Text>
        <Image source={!isShow ? images.ic_dropdown : images.ic_arrow_up} />
      </TouchableOpacity>
      {!!isShow && <View>{props.children}</View>}
    </View>
  );
};

export default Collapsing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 17,
  },
});
