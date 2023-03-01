import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AdvertisementProductScheduler, HotDealsItemProp} from 'res/type/Home';
import {getPriceVoucher, isVoucher} from 'utils/other-utils';
import scale from 'utils/scale';

interface ItemCategoryColaboratorProps {
  item: HotDealsItemProp;
  onPress: () => void;
}

const ItemCategoryColaborator = ({
  item,
  onPress,
}: ItemCategoryColaboratorProps) => {
  const voucher: AdvertisementProductScheduler | null = React.useMemo(
    () =>
      (!!item?.schedulers?.length &&
        item?.schedulers?.find(e => e.discountValue)) ||
      null,
    [item.schedulers],
  );
  const renderVoucher = (item: AdvertisementProductScheduler) => {
    let voucher = '';
    if (isVoucher(item)) {
      if (item?.discountType.toLowerCase() == 'percent') {
        voucher = `-${item.discountValue}%`;
      } else if (item?.discountType.toLowerCase() == 'unit') {
        voucher = `-${item?.discountValue?.formatPrice()}đ`;
      }
    }
    return voucher;
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerItem1}>
      <View style={[styles.containerItem]}>
        <Image source={{uri: item?.images?.[0]}} style={styles.imgItem} />
        <View style={Theme.flex1}>
          <View style={Theme.flex1}>
            <Text
              marginTop={8}
              semiBold
              size={12}
              lineHeight={24}
              marginRight={12}
              marginLeft={8}
              numberOfLines={2}>
              {item.name}
            </Text>
          </View>
          {item.type == 'ADVERTISEMENT' ? (
            <Text
              size={16}
              lineHeight={26}
              color={colors.primary}
              marginBottom={7}
              marginLeft={8}>
              Liên hệ
            </Text>
          ) : (
            <View
              style={[
                Theme.flexRow,
                {paddingLeft: 8, flexWrap: 'wrap', paddingVertical: 4},
              ]}>
              <Text size={12} lineHeight={18}>
                Giá lẻ:{' '}
                {!!getPriceVoucher(item) && (
                  <Text
                    size={12}
                    lineHeight={18}
                    marginRight={7}
                    textDecorationLine={'line-through'}
                    color={colors.text2}>
                    {item?.price.formatPrice() + 'đ'}{' '}
                  </Text>
                )}
                <Text size={12} lineHeight={18} marginBottom={7} marginTop={6}>
                  {(getPriceVoucher(item) || item.price).formatPrice() + 'đ'}
                </Text>
              </Text>
            </View>
          )}
          <Text
            marginLeft={8}
            marginBottom={10}
            color={colors.primary}
            size={16}
            lineHeight={26}>
            CTV:{' '}
            {item?.priceWholeSale
              ? item?.priceWholeSale.formatPrice() + 'đ'
              : 'Đang cập nhật'}
          </Text>
        </View>
      </View>
      {!!renderVoucher(voucher) && (
        <View
          style={{
            position: 'absolute',
            top: scale(15),
          }}>
          <ImageBackground
            source={images.rectangle}
            style={{
              width: '100%',
              paddingVertical: 2,
              marginRight: 10,
            }}>
            <Text
              color={colors.White}
              medium
              size={12}
              lineHeight={18}
              marginLeft={3}
              marginRight={4}>
              {renderVoucher(voucher)}
            </Text>
          </ImageBackground>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCategoryColaborator;

const styles = StyleSheet.create({
  imgItem: {
    height: scale(153),
    width: '100%',
    borderTopLeftRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  containerItem1: {
    flex: 1 / 2,
  },
  containerItem: {
    borderRadius: 8,
    marginRight: scale(9),
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
  },
  containerHeader: {
    paddingHorizontal: scale(15),
    paddingBottom: scale(8),
    paddingTop: scale(15),
  },
  container: {
    marginTop: scale(13),
  },
});
