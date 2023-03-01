import {useMutation} from '@apollo/client';
import {DELETE_CART_QUERY, UPDATE_CART_QUERY} from 'apollo/query/ApiCart';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Image from 'elements/Image';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {CartCategoryProps} from 'res/type/Cart';
import {HotDealsItemProp} from 'res/type/Home';
import {getPriceVoucher, getPriceVoucherColaborator} from 'utils/other-utils';
import scale from 'utils/scale';
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ButtonBorder from 'elements/Buttons/ButtonBorder';

interface ItemOrderCategoryColaboratorProps {
  item: CartCategoryProps;
  onDeleteItem: (item: CartCategoryProps) => void;
  onDetail: () => void;
  isRating?: boolean;
}

const ItemOrderCategoryColaborator = ({
  item,
  onDeleteItem,
  onDetail,
  isRating,
}: ItemOrderCategoryColaboratorProps) => {
  const navigation = useNavigation();
  const onRating = () => {
    navigation.navigate(Routes.RatingScreen, {
      item: item,
    });
  };
  return (
    <TouchableOpacity onPress={onDetail} style={[Theme.flex1]}>
      <View style={[Theme.flexRow, styles.container]}>
        <View
          style={[
            Theme.flexDirection,
            Theme.flex1,
            {alignItems: 'flex-start', paddingLeft: 10},
          ]}>
          <Image
            source={{uri: item?.product?.images?.[0]}}
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
                {item?.product?.name}
              </Text>
              <View style={[Theme.flexRow]}>
                <Text size={16} lineHeight={26} semiBold color={colors.primary}>
                  CTV:{' '}
                  <Text
                    size={16}
                    lineHeight={26}
                    semiBold
                    color={colors.primary}>
                    {(
                      getPriceVoucherColaborator(item) ||
                      item?.product?.priceWholeSale
                    )?.formatPrice()}
                    đ
                  </Text>
                </Text>
              </View>
              <View style={[Theme.flexRow]}>
                <Text size={12} lineHeight={18} color={colors.gray}>
                  Giá lẻ:{' '}
                </Text>
                <Text size={12} lineHeight={18} color={colors.gray}>
                  {(
                    getPriceVoucherColaborator(item) || item?.product?.price
                  )?.formatPrice()}
                  đ
                </Text>
                {!!getPriceVoucherColaborator(item) && (
                  <Text
                    size={12}
                    lineHeight={18}
                    color={colors.gray}
                    textDecorationLine={'line-through'}>
                    {' '}
                    {item?.product?.price?.formatPrice()}đ
                  </Text>
                )}
              </View>
            </View>
            <View style={[Theme.flexRowSpace]}>
              <View style={[Theme.flexRow, Theme.flex1, {flexWrap: 'wrap'}]}>
                <Text
                  size={14}
                  lineHeight={24}
                  color={colors.gray}
                  marginHorizontal={10}>
                  {item.amount}x
                </Text>
                {!!item.attributes?.length &&
                  item.attributes.map((e, i) => {
                    return (
                      <View style={[Theme.flexRow]}>
                        <View
                          style={{
                            backgroundColor: colors.inactive,
                            height: 5,
                            width: 5,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                        />
                        <Text
                          size={14}
                          key={i}
                          lineHeight={24}
                          marginRight={10}
                          color={colors.gray}>
                          {e.value}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </View>
      {!!item.customerNote && (
        <TextInput
          value={item.customerNote}
          multiline
          editable={false}
          style={{marginTop: 8}}
          inputStyle={{maxHeight: 110}}
        />
      )}
      {!isRating &&
      (item?.status == 'COMPLAIN' || item?.status == 'RECEIVED') ? (
        <ButtonBorder
          title="Đánh giá"
          backgroundColor={colors.White}
          borderColor={colors.primary}
          onPress={onRating}
          height={42}
          style={Theme.flex1}
          textProps={{semiBold: true, size: 14, lineHeight: 26}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ItemOrderCategoryColaborator;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(20),
  },
});
