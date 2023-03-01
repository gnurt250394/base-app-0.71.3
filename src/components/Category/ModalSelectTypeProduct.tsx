import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ADD_INFO_CUSTOMER_CATEGORY} from 'apollo/query/ApiCategory';
import ItemCartCategory from 'components/Cart/ItemCartCategory';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import {RootReducer} from 'middlewares/reducers';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {
  Address,
  AdvertisementProductAttribute,
  HotDealsItemProp,
} from 'res/type/Home';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import ItemCategory from './ItemCategory';
import {SCHEMA_ERROR_ADD_INFO_CUSTOMER} from './ValidateCategory';
interface ModalSelectTypeProductProps {
  close: () => void;
  product: HotDealsItemProp;
  type: 'buy' | 'cart';
  onSubmit: (attribute: any[], amount: number, type: 'buy' | 'cart') => void;
}

const ModalSelectTypeProduct = (props: ModalSelectTypeProductProps) => {
  const [attribute, setAttribute] = useState<any>({});
  const [amount, setAmount] = useState<number>(1);

  const onSubmit = () => {
    onClose();
    let data = Object.keys(attribute).map(key => ({
      name: key,
      value: attribute[key],
    }));
    props.onSubmit && props.onSubmit(data, amount, props.type);
  };
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const onClose = () => {
    props.close && props.close();
  };
  const onSelected = (item: AdvertisementProductAttribute, e: string) => () => {
    let obj = Object.assign({}, attribute);
    obj[item.name] = e;

    setAttribute(obj);
  };
  const onUpdateCart = (count: number) => () => {
    if (amount == 1 && count == -1) return;
    setAmount(amount => amount + count);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          Theme.flexRowSpace,
          {
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 15,
          },
        ]}>
        <View style={{width: 20}} />
        <Text size={16} lineHeight={26} semiBold color={colors.text} center>
          Chọn thuộc tính sản phẩm
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingHorizontal: scale(14),
        }}>
        <ItemCategory item={props.product} />
        {props.product.attributes?.length &&
          props.product.attributes.map((item, index) => {
            return (
              <View key={index}>
                <Text
                  size={16}
                  lineHeight={26}
                  marginBottom={10}
                  semiBold
                  marginTop={20}>
                  {item.name}
                </Text>
                <View style={Theme.flexRow}>
                  {item.value?.length &&
                    item?.value.map((e, i) => (
                      <TouchableOpacity
                        onPress={onSelected(item, e)}
                        key={i}
                        style={[
                          {
                            backgroundColor:
                              e == attribute[item.name]
                                ? colors.primary
                                : colors.lightGray,
                          },
                          styles.containerText,
                        ]}>
                        <Text
                          size={14}
                          color={
                            e == attribute[item.name]
                              ? colors.White
                              : colors.text
                          }
                          lineHeight={24}>
                          {e}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            );
          })}
        <View style={[Theme.flexRowSpace, {marginTop: 20, marginBottom: 10}]}>
          <Text size={16} lineHeight={26} semiBold>
            Số lượng:
          </Text>
          <View style={[Theme.flexRow]}>
            <ButtonIcon icon={images.ic_minus} onPress={onUpdateCart(-1)} />
            <Text medium size={16} lineHeight={16} marginHorizontal={10}>
              {amount}
            </Text>
            <ButtonIcon icon={images.ic_add} onPress={onUpdateCart(1)} />
          </View>
        </View>
        <ButtonText
          title={props.type == 'buy' ? 'Mua ngay' : 'Thêm vào giỏ hàng'}
          backgroundColor={
            Object.keys(attribute).length == props.product.attributes?.length
              ? colors.primary
              : colors.primary + '50'
          }
          disabled={
            Object.keys(attribute).length != props.product.attributes?.length
          }
          style={{marginTop: 20}}
          titleColor={colors.White}
          height={58}
          onPress={onSubmit}
          textProps={{semiBold: true, size: 16, lineHeight: 26}}
        />
      </View>
    </View>
  );
};

export default ModalSelectTypeProduct;

const styles = StyleSheet.create({
  containerText: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  containerGuide: {
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: 17,
  },
  container: {
    backgroundColor: colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
