import {useMutation, useQuery} from '@apollo/client';
import {
  GET_ALL_CART_QUERY,
  GET_SHIPPING,
  MAKE_PAYMENT,
  SEND_PAYMENT_QUERY,
} from 'apollo/query/ApiCart';
import ListCategory from 'components/Cart/ListCategory';
import ModalChangeAddress from 'components/Cart/ModalChangeAddress';
import ModalInfoPayment from 'components/Cart/ModalInfoPayment';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';
import ModalBottom from 'components/ModalBase/ModalBottom';
import {Routes} from 'configs';
import {height, width} from 'configs/Const';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import useModalAnimation from 'hooks/useModalAnimation';
import {RootReducer} from 'middlewares/reducers';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import AddressApi from 'network/apis/address/AddressApi';
import * as React from 'react';
import {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AdOrder, CartCategoryProps} from 'res/type/Cart';
import {Address} from 'res/type/Home';
import snackbarUtils from 'utils/snackbar-utils';
import useMomo from 'hooks/useMomo';
import ModalSelect from 'components/ModalSelect';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import ModalSelectPayment from 'components/Cart/ModalSelectPayment';

interface CartScreenProps {}

interface ResultProps {
  docs: CartCategoryProps[];
  adOrder: AdOrder;
}

const menuOptions = [
  {
    id: 0,
    name: 'Thanh toán chuyển khoản',
  },
  {
    id: 1,
    name: 'Thanh toán momo',
  },
];
const CartScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [visible, open, close] = useModalAnimation();
  const [visibleAddress, openAddress, closeAddress] = useModalAnimation();
  const [addressChange, setAddressChange] = useState<Address>();
  const [voucher, setVoucher] = useState('');
  const [feeShipping, setFeeShipping] = React.useState('');
  const {data} = useQuery(GET_ALL_CART_QUERY, {
    variables: {
      filters: {
        pagination: false,
        sort: {
          createdAt: -1,
        },
      },
    },
    // fetchPolicy: 'cache-and-network',
  });

  const [onPress, {data: res2, error}] = useMutation(MAKE_PAYMENT);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);

  const res: ResultProps = useMemo(() => {
    return data?.getAllCart?.result || {};
  }, [data]);
  const [getShipping, {data: dataShipping}] = useMutation(GET_SHIPPING);

  React.useEffect(() => {
    if (res?.adOrder?.id) {
      let param: any;

      let addr = addressChange
        ? addressChange
        : userProfile.user?.address.find(e => e.isDefault);
      if (addr) {
        param = {
          isDefault: true,
          cityId: addr.cityId,
          districtId: addr.districtId,
          wardId: addr.wardId,
          street: addr.street,
          wardName: addr.wardName,
          cityName: addr.cityName,
          districtName: addr?.districtName,
        };
      }

      getShipping({
        variables: {
          order: {
            id: res.adOrder.id,
            deliveryLocation: param,
          },
        },
      });
    }
  }, [addressChange, userProfile, res?.adOrder?.id]);
  React.useEffect(() => {
    if (res2?.cartPaymentAllVA?.success) {
      hideLoading();
      open();
    }
  }, [res2]);
  React.useEffect(() => {
    if (error) {
      hideLoading();
    }
  }, [error]);
  const address = useMemo(() => {
    if (addressChange) {
      return (
        (addressChange?.street ? addressChange?.street + ', ' : '') +
        (addressChange?.wardName + ', ') +
        (addressChange?.districtName + ', ') +
        addressChange?.cityName
      );
    } else {
      return userProfile?.user?.address?.reduce(
        (total, curr) =>
          !!curr &&
          (total +=
            (curr?.street ? curr?.street + ', ' : '') +
            (curr?.wardName + ', ') +
            (curr?.districtName + ', ') +
            curr?.cityName),
        '',
      );
    }
  }, [userProfile, addressChange]);
  const onPayment = () => {
    if (!addressChange && !userProfile.user?.address?.length) {
      snackbarUtils.show('Vui lòng chọn địa chỉ.', 'danger');
      return;
    }
    open();
  };
  if (!data?.getAllCart?.result?.docs?.length) {
    return (
      <Container title="Giỏ hàng" hideButtonRight style={styles.container}>
        <View style={[Theme.center, Theme.flex1, {paddingBottom: 30}]}>
          <Image
            source={images.none_data}
            style={{
              width: width - 50,
              height: height / 3,
              resizeMode: 'contain',
            }}
          />
          <ButtonText
            title="Tiếp tục mua hàng"
            backgroundColor={colors.primary}
            titleColor={colors.White}
            onPress={() =>
              props.navigation.navigate(Routes.MainTab, {
                screen: Routes.HomeStack,
              })
            }
            style={{marginTop: 40, paddingHorizontal: 15}}
            textProps={{
              semiBold: true,
              lineHeight: 24,
            }}
          />
        </View>
      </Container>
    );
  }
  const onSelect = async (item: any) => {
    switch (item.id) {
      case 0:
        onPress({
          variables: {
            order: {
              isCustomerBearShippingFee: false,
              isCustomerPaid: false,
            },
            method: 'VA',
            redirectUrl: '',
          },
        });
        break;
      case 1:
        onPress({
          variables: {
            order: {
              isCustomerBearShippingFee: false,
              isCustomerPaid: false,
            },
            method: 'MOMO',
            redirectUrl: '',
          },
        });
        break;

      default:
        break;
    }
  };
  return (
    <Container title="Giỏ hàng" hideButtonRight style={styles.container}>
      <View style={{padding: 15, flex: 1}}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={openAddress}
            style={[Theme.flexRow, styles.containerSelectLocation]}>
            <Image source={images.ic_location} />
            <View style={[Theme.flex1, {paddingHorizontal: 12}]}>
              <View style={Theme.flexRow}>
                <Text size={14} lineHeight={24} semiBold color={colors.text}>
                  {userProfile?.user?.fullName}
                </Text>
                <View style={styles.lineBettwen} />
                <Text size={14} lineHeight={24} semiBold color={colors.text}>
                  {userProfile?.user?.phone}
                </Text>
              </View>
              <Text size={12} lineHeight={18} color={colors.gray} marginTop={5}>
                {address ? address : 'Chọn địa chỉ'}
              </Text>
            </View>
            <Image
              source={images.ic_dropdown}
              style={{transform: [{rotate: '-90deg'}]}}
            />
          </TouchableOpacity>
          <ListCategory data={res?.docs} />
          <View>
            <View
              style={[
                Theme.flexRow,
                {
                  marginVertical: 17,
                },
              ]}>
              <TextInput
                placeholder={'Mã khuyến mãi'}
                borderColor={colors.border}
                iconLeft={<Image source={images.ic_voucher} />}
                isShowIconLeft={true}
                value={voucher}
                editable={true}
                onChangeText={setVoucher}
                containerStyle={{flex: 1}}
                style={{flex: 1, width: '100%'}}
              />
              <ButtonText
                title={'Áp dụng'}
                backgroundColor={colors.primary}
                titleColor={colors.White}
                marginLeft={10}
                textProps={{semiBold: true, size: 16, lineHeight: 26}}
                style={{height: 48, paddingHorizontal: 15}}
              />
            </View>
            <View style={styles.lineEnd} />
            <View style={[Theme.flexRowSpace, {paddingBottom: 10}]}>
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                Tạm tính
              </Text>
              <Text size={16} lineHeight={26} semiBold color={colors.text}>
                {res?.adOrder?.fee?.total?.formatPrice()}đ
              </Text>
            </View>
            <View style={[Theme.flexRowSpace, {paddingBottom: 10}]}>
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                Phí vận chuyển
              </Text>
              <Text size={16} lineHeight={26} semiBold color={colors.text}>
                {dataShipping?.response?.result?.fee?.shippingFee?.formatPrice()}
                đ
              </Text>
            </View>
            <View style={[Theme.flexRowSpace, {paddingBottom: 10}]}>
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                Giảm giá
              </Text>
              <Text size={16} lineHeight={26} semiBold color={colors.text}>
                {res?.adOrder?.fee?.discount.formatPrice()}đ
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={[Theme.flexRowSpace, {paddingBottom: 20, paddingTop: 10}]}>
          <View>
            <Text size={14} lineHeight={24} color={colors.gray}>
              Tổng cộng:
            </Text>
            <Text size={18} lineHeight={28} semiBold color={colors.primary}>
              {(
                res?.adOrder?.fee?.total +
                (dataShipping?.response?.result?.fee?.shippingFee || 0)
              ).formatPrice()}
              đ
            </Text>
          </View>
          <ButtonText
            title="Tiến hành thanh toán"
            backgroundColor={colors.primary}
            titleColor={colors.White}
            style={{padding: 16, height: 58}}
            onPress={onPayment}
            textProps={{semiBold: true, size: 16, lineHeight: 26}}
          />
        </View>
      </View>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalSelectPayment close={close} id={res?.adOrder?.id} />
      </ModalBottom>
      <ModalBottom
        isVisibleModal={visibleAddress}
        scrollEnabled
        onCloseModal={closeAddress}>
        <ModalChangeAddress
          close={closeAddress}
          addressChange={addressChange}
          onSubmit={item => {
            setAddressChange(item);
          }}
        />
      </ModalBottom>
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  lineEnd: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  containerSelectLocation: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
  },
  lineBettwen: {
    backgroundColor: colors.border,
    width: 1,
    height: '60%',
    marginHorizontal: 10,
  },
  container: {},
});
