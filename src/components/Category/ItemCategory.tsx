import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {HotDealsItemProp} from 'res/type/Home';
import {getPriceVoucher} from 'utils/other-utils';
import scale from 'utils/scale';

interface ItemCategoryProps {
  item: HotDealsItemProp;
}

const ItemCategory = ({item}: ItemCategoryProps) => {
  return (
    <View style={[Theme.flex1]}>
      <View style={[Theme.flexRow, styles.container]}>
        <View
          style={[
            Theme.flexDirection,
            Theme.flex1,
            {alignItems: 'flex-start', paddingLeft: 10},
          ]}>
          <Image
            source={{uri: item?.images?.[0]}}
            style={{height: scale(110), width: scale(110), borderRadius: 6}}
          />
          <View style={[Theme.flex1, {paddingLeft: 10}]}>
            <View style={[Theme.flex1, {paddingBottom: 8}]}>
              <Text
                size={14}
                lineHeight={24}
                semiBold
                color={colors.text}
                marginBottom={5}
                numberOfLines={2}>
                {item?.name}
              </Text>
              <View style={[Theme.flexRow]}>
                <Text
                  size={16}
                  lineHeight={26}
                  marginRight={10}
                  semiBold
                  color={colors.primary}>
                  {(getPriceVoucher(item) || item?.price)?.formatPrice()}đ
                </Text>
                {!!getPriceVoucher(item) && (
                  <Text
                    size={12}
                    lineHeight={18}
                    color={colors.gray}
                    textDecorationLine={'line-through'}>
                    {item?.price?.formatPrice()}đ
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(16),
  },
});
