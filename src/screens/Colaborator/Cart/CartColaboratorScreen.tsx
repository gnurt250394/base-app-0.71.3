import {useMutation} from '@apollo/client';
import useGetAllCart from 'apollo/logic/cart/useGetAllCart';
import useGetListCustomer from 'apollo/logic/cart/useGetListCustomer';
import useGetShipping from 'apollo/logic/cart/useGetShipping';
import {SEND_PAYMENT_QUERY} from 'apollo/query/ApiCart';
import ListCategory from 'components/Cart/ListCategory';
import ModalChangeAddress from 'components/Cart/ModalChangeAddress';
import ModalInfoPayment from 'components/Cart/ModalInfoPayment';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';
import CustomMenu from 'components/Menu/CustomMenu';
import ModalBottom from 'components/ModalBase/ModalBottom';
import SelectOptions, {ChoiceProps} from 'components/SelectOptions';
import {Routes} from 'configs';
import {height, width} from 'configs/Const';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import ButtonText from 'elements/Buttons/ButtonText';
import CheckBox from 'elements/CheckBox';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import useModalAnimation from 'hooks/useModalAnimation';
import {RootReducer} from 'middlewares/reducers';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AdOrder, CartCategoryProps} from 'res/type/Cart';
import {UserCustomerPaginate} from 'res/type/Customer';
import {Address} from 'res/type/Home';
import {getPriceProduct} from 'utils/other-utils';
import snackbarUtils from 'utils/snackbar-utils';
import ModalSelect from 'components/ModalSelect';
import useMomo from 'hooks/useMomo';
import ItemPrice from 'components/Cart/ItemPrice';
import PaymentMethodSuggest from 'screens/Colaborator/Cart/PaymentMethodSuggest';
import ModalSelectPayment from 'components/Cart/ModalSelectPayment';

interface CartColaboratorScreenProps {}

interface ResultProps {
  docs: CartCategoryProps[];
  adOrder: AdOrder;
}

const listChoice = [
  {
    id: 1,
    name: '0đ - Đã thanh toán trước cho bạn',
    isCustomerBearShippingFee: false,
    isCustomerPaid: true,
  },
  {
    id: 2,
    name: 'Giá bán ra - Miễn phí vận chuyển',
    isCustomerBearShippingFee: false,
    isCustomerPaid: false,
  },
  {
    id: 3,
    name: 'Giá bán ra và phí vận chuyển',
    isCustomerBearShippingFee: true,
    isCustomerPaid: false,
  },
];

const CartColaboratorScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [visible, open, close] = useModalAnimation();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [visibleAddress, openAddress, closeAddress] = useModalAnimation();
  const [isCheck, setIsCheck] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<ChoiceProps>();
  const [customer, setCustomer] = useState<UserCustomerPaginate>();

  const {data} = useGetAllCart();
  const {data: dataShipping} = useGetShipping(
    data?.getAllCart?.result?.adOrder as AdOrder,
    customer as UserCustomerPaginate,
    isCheck,
    data?.getAllCart?.result?.docs?.reduce((a, b) => a + b?.amount, 0),
  );
  const {data: dataCustomer} = useGetListCustomer(
    data?.getAllCart?.result?.adOrder?.userId || '',
  );
  React.useEffect(() => {
    if (dataCustomer?.getUserCustomers?.result?.docs?.length) {
      setCustomer(dataCustomer?.getUserCustomers?.result?.docs?.[0]);
    }
  }, [dataCustomer]);
  const [addressChange, setAddressChange] = useState<Address>();
  const [onPress, {data: res2, error}] = useMutation(SEND_PAYMENT_QUERY);

  const address = useMemo(() => {
    let add = customer?.address?.find(e => e.isDefault);
    if (add) {
      return (
        (add?.street ? add?.street + ', ' : '') +
        (add?.wardName + ', ') +
        (add?.districtName + ', ') +
        add?.cityName
      );
    }
  }, [customer]);
  const onPayment = () => {
    // let addr;

    if (isCheck) {
      if (!addressChange && !userProfile.user?.address?.length) {
        snackbarUtils.show('Vui lòng chọn địa chỉ.', 'danger');
        return;
      }

      // addr = addressChange
      //   ? addressChange
      //   : userProfile.user?.address.find(e => e.isDefault);
    } else {
      if (!customer) {
        snackbarUtils.show('Vui lòng chọn khách hàng.', 'danger');

        return;
      }
      // addr = customer?.address.find(e => e.isDefault);
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

  const addCustomer = () => {
    props.navigation.navigate(Routes.ListCustomerScreen, {
      onSelected: (cust: UserCustomerPaginate) => {
        if (cust.id == customer?.id) {
          setCustomer(undefined);
        } else {
          setPaymentMethod(listChoice.find(e => e.id == 3));
          setCustomer(cust);
        }
      },
      isEdit: false,
      idCart: data?.getAllCart?.result?.adOrder?.id || '',
      customer: customer,
    });
  };
  const onChange = () => {
    setIsCheck(isCheck => !isCheck);
  };
  const onChangePaymentMethod = (item: ChoiceProps) => {
    console.log('-> item', item);
    setPaymentMethod(item);
  };

  const renderPrice = () => {
    let price =
      getPriceProduct(data?.getAllCart?.result.docs, 'feeResale') -
      getPriceProduct(data?.getAllCart?.result.docs, 'priceWholeSale');
    return Math.abs(price);
  };

  return (
    <Container title="Giỏ hàng" hideButtonRight style={styles.container}>
      <View style={{padding: 15, flex: 1}}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {!customer ? (
            <ButtonIconText
              style={{marginLeft: 10}}
              onPress={addCustomer}
              titleColor={colors.text}
              disabled={isCheck}
              borderColor={colors.primary}
              textProps={{
                marginLeft: 11,
                size: 16,
                lineHeight: 26,
                semiBold: true,
              }}
              icon={images.ic_guest}
              title="Thêm khách hàng"
            />
          ) : (
            <TouchableOpacity
              onPress={addCustomer}
              disabled={isCheck}
              style={[
                Theme.flexRow,
                styles.containerSelectLocation,
                isCheck ? {opacity: 0.3} : {},
              ]}>
              <Image source={images.ic_location} />
              <View style={[Theme.flex1, {paddingHorizontal: 12}]}>
                <View style={Theme.flexRow}>
                  <Text size={14} lineHeight={24} semiBold color={colors.text}>
                    {customer?.name}
                  </Text>
                  <View style={styles.lineBettwen} />
                  <Text size={14} lineHeight={24} semiBold color={colors.text}>
                    {customer?.phone}
                  </Text>
                </View>
                <Text
                  size={12}
                  lineHeight={18}
                  color={colors.gray}
                  marginTop={5}>
                  {address ? address : 'Chọn địa chỉ'}
                </Text>
              </View>
              <Image
                source={images.ic_dropdown}
                style={{transform: [{rotate: '-90deg'}]}}
              />
            </TouchableOpacity>
          )}
          <View style={[Theme.flexRow, {marginTop: 20, marginLeft: 10}]}>
            <CheckBox isCheck={isCheck} onPress={onChange} />
            <Text
              size={14}
              lineHeight={24}
              color={colors.text}
              semiBold
              marginLeft={8}>
              Chuyển đến địa chỉ của bạn
            </Text>
          </View>

          {!!customer && !isCheck && (
            <>
              <View style={styles.lineEnd} />

              <View
                style={[
                  Theme.flexRow,
                  {alignItems: 'center', marginBottom: 10},
                ]}>
                <Text
                  bold
                  color={colors.dark}
                  size={16}
                  lineHeight={26}
                  marginRight={5}
                  marginLeft={10}>
                  Khi nhận hàng, khách sẽ thanh toán
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                }}>
                <SelectOptions
                  choices={listChoice}
                  onPressItem={onChangePaymentMethod}
                  choice={paymentMethod}
                  fee={data?.getAllCart?.result?.adOrder?.fee}
                  shippingFee={
                    dataShipping?.response?.result?.fee?.shippingFee || 0
                  }
                />
              </View>
            </>
          )}
          <ListCategory
            data={data?.getAllCart?.result?.docs}
            isCheck={isCheck}
            customer={customer && !isCheck ? customer : undefined}
          />
          <View style={styles.lineEnd} />

          <View>
            <View style={styles.lineEnd} />
            {!isCheck && !!customer && (
              <ItemPrice
                label={'Giá mua vào(vốn):'}
                type={'money'}
                sufix={'đ'}
                value={getPriceProduct(
                  data?.getAllCart?.result?.docs,
                  'priceWholeSale',
                )}
              />
            )}
            {!isCheck && !!customer && (
              <ItemPrice
                label={'Giá bán ra(vốn + lời):'}
                type={'money'}
                sufix={'đ'}
                value={getPriceProduct(
                  data?.getAllCart?.result?.docs,
                  'feeResale',
                )}
              />
            )}

            {(!!dataShipping?.response?.result?.fee?.shippingFee ||
              dataShipping?.response?.result?.fee?.shippingFee == 0) && (
              <ItemPrice
                label={'Phí vận chuyển'}
                type={'money'}
                sufix={'đ'}
                value={dataShipping?.response?.result?.fee?.shippingFee}
              />
            )}
            {isCheck && !customer && (
              <ItemPrice
                label={'Giá tạm tính'}
                type={'money'}
                sufix={'đ'}
                value={data?.getAllCart.result?.adOrder?.fee?.subTotal}
              />
            )}
            <ItemPrice
              label={'Giảm giá'}
              type={'money'}
              sufix={'đ'}
              value={data?.getAllCart?.result?.adOrder?.fee?.discount}
            />

            {!isCheck && !!customer && (
              <ItemPrice
                label={'Thành tiền'}
                type={'money'}
                sufix={'đ'}
                value={
                  !paymentMethod?.isCustomerPaid &&
                  paymentMethod?.isCustomerBearShippingFee
                    ? getPriceProduct(
                        data?.getAllCart?.result.docs,
                        'priceWholeSale',
                      )
                    : getPriceProduct(
                        data?.getAllCart?.result.docs,
                        'priceWholeSale',
                      ) +
                      (dataShipping?.response?.result?.fee?.shippingFee || 0)
                }
              />
            )}
            {/*{!isCheck && !!customer ? (*/}
            {/*  <ItemPrice*/}
            {/*    label={'Giá bán cho khách'}*/}
            {/*    type={'money'}*/}
            {/*    sufix={'đ'}*/}
            {/*    value={*/}
            {/*      getPriceProduct(data?.getAllCart?.result.docs, 'price') +*/}
            {/*      (paymentMethod?.type == 'isCustomerBearShippingFee'*/}
            {/*        ? data?.getAllCart?.result?.adOrder?.fee?.shippingFee*/}
            {/*        : 0)*/}
            {/*    }*/}
            {/*  />*/}
            {/*) : null}*/}
          </View>
        </KeyboardAwareScrollView>
        <View style={[Theme.flexRowSpace, {paddingBottom: 20, paddingTop: 10}]}>
          {isCheck || !customer ? (
            <View>
              <Text size={14} lineHeight={24} color={colors.gray}>
                Tổng cộng:
              </Text>
              <Text size={18} lineHeight={28} semiBold color={colors.primary}>
                {(
                  getPriceProduct(
                    data?.getAllCart?.result?.docs,
                    'priceWholeSale',
                  ) + (dataShipping?.response?.result?.fee?.shippingFee || 0)
                ).formatPrice()}
                đ
              </Text>
            </View>
          ) : (
            <View>
              <Text size={14} lineHeight={24} color={colors.gray}>
                Lợi nhuận:
              </Text>
              <Text size={18} lineHeight={28} semiBold color={colors.primary}>
                {renderPrice().formatPrice()}đ
              </Text>
            </View>
          )}
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
        <ModalSelectPayment
          close={close}
          paymentMethod={paymentMethod}
          id={data?.getAllCart?.result?.adOrder?.id}
        />
      </ModalBottom>
      <ModalBottom
        isVisibleModal={visibleAddress}
        scrollEnabled
        onCloseModal={closeAddress}>
        <KeyboardAwareScrollView bounces={false}>
          <ModalChangeAddress
            close={closeAddress}
            addressChange={addressChange}
            onSubmit={item => {
              setAddressChange(item);
            }}
          />
        </KeyboardAwareScrollView>
      </ModalBottom>
    </Container>
  );
};

export default CartColaboratorScreen;

const styles = StyleSheet.create({
  containerTextHelp: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 4,
  },
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
