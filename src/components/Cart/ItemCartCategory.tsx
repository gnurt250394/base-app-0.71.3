import {useMutation} from '@apollo/client';
import {DELETE_CART_QUERY, UPDATE_CART_QUERY} from 'apollo/query/ApiCart';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Image from 'elements/Image';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {CartCategoryProps} from 'res/type/Cart';
import {HotDealsItemProp} from 'res/type/Home';
import {getPriceVoucher} from 'utils/other-utils';
import scale from 'utils/scale';

interface ItemCartCategoryProps {
  item: CartCategoryProps;
  onDeleteItem: (item: CartCategoryProps) => void;
  onDetail: () => void;
}

const ItemCartCategory = ({
  item,
  onDeleteItem,
  onDetail,
}: ItemCartCategoryProps) => {
  const [note, setNote] = useState(item.customerNote);
  const [isShowNote, setIsShowNote] = useState(false);
  const [onPress] = useMutation(UPDATE_CART_QUERY);
  const [onDelete] = useMutation(DELETE_CART_QUERY);
  const onUpdateCart = (amount: number) => () => {
    if (item.amount == 1 && amount == -1) {
      return;
    }
    onPress({
      variables: {
        input: {
          id: item.id,
          amount: item.amount + amount,
          feeResale: getPriceVoucher(item?.product),
        },
      },
    });
  };
  useEffect(() => {
    onPress({
      variables: {
        input: {
          id: item.id,
          amount: item?.amount,
          feeResale: getPriceVoucher(item?.product),
        },
      },
    });
  }, []);
  const onBlur = () => {
    onPress({
      variables: {
        input: {
          id: item.id,
          customerNote: note,
        },
      },
    });
    if (!note) {
      setIsShowNote(false);
    }
  };
  const onDeleteCart = () => {
    onDelete({
      variables: {
        cart: {
          id: item.id,
        },
      },
    });
    onDeleteItem && onDeleteItem(item);
  };
  return (
    <TouchableOpacity onPress={onDetail} style={[Theme.flex1]}>
      <View style={[Theme.flexRow, styles.container]}>
        {/* <ButtonIcon icon={images.ic_uncheck} /> */}
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
                <Text
                  size={16}
                  lineHeight={26}
                  marginRight={10}
                  semiBold
                  color={colors.primary}>
                  {(
                    getPriceVoucher(item?.product as HotDealsItemProp) ||
                    item?.product?.price
                  )?.formatPrice()}
                  đ
                </Text>
                {!!getPriceVoucher(item?.product as HotDealsItemProp) && (
                  <Text
                    size={12}
                    lineHeight={18}
                    color={colors.gray}
                    textDecorationLine={'line-through'}>
                    {item?.product?.price?.formatPrice()}đ
                  </Text>
                )}
              </View>
              <View style={[Theme.flexRow, {flexWrap: 'wrap'}]}>
                <Text
                  size={14}
                  lineHeight={24}
                  marginRight={10}
                  color={colors.gray}>
                  SL: {item.amount}
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
                          {e.name}: {e.value}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            {(item?.customerNote || !!isShowNote) && (
              <View style={[Theme.flexRowSpace]}>
                <View style={[Theme.flexRow, Theme.flex1]}>
                  <ButtonIcon
                    icon={images.ic_minus}
                    onPress={onUpdateCart(-1)}
                  />
                  <Text marginHorizontal={10}>{item.amount}</Text>
                  <ButtonIcon icon={images.ic_add} onPress={onUpdateCart(1)} />
                </View>
                <ButtonIcon icon={images.ic_trash} onPress={onDeleteCart} />
              </View>
            )}
          </View>
        </View>
      </View>
      {item?.customerNote || !!isShowNote ? (
        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          editable={true}
          autoFocus={!item?.customerNote}
          onBlur={onBlur}
          placeholder="Ghi chú"
          style={{marginTop: 8, marginLeft: scale(10)}}
          inputStyle={{maxHeight: 110}}
        />
      ) : (
        <View style={[Theme.flexRow, {paddingTop: 8, flex: 1}]}>
          <TouchableOpacity
            onPress={() => setIsShowNote(true)}
            style={[Theme.flexRow, {marginLeft: scale(10)}]}>
            <Image source={images.ic_note} />
            <Text
              size={12}
              lineHeight={18}
              semiBold
              color={colors.text}
              marginLeft={8}>
              Thêm ghi chú
            </Text>
          </TouchableOpacity>
          <View style={[Theme.flexRowSpace, {flex: 1, marginLeft: 15}]}>
            <View style={[Theme.flexRow, Theme.flex1]}>
              <ButtonIcon icon={images.ic_minus} onPress={onUpdateCart(-1)} />
              <Text marginHorizontal={10}>{item.amount}</Text>
              <ButtonIcon icon={images.ic_add} onPress={onUpdateCart(1)} />
            </View>
            <ButtonIcon icon={images.ic_trash} onPress={onDeleteCart} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCartCategory;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(16),
  },
});
