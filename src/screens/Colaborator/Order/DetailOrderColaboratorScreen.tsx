import {useMutation, useQuery} from '@apollo/client';
import {
  CANCEL_ORDER,
  GET_AD_ORDER,
  GET_DETAIL_ORDER,
} from 'apollo/query/ApiOrder';
import ModalComplain from 'components/Cart/ModalComplain';
import ModalInfoPayment from 'components/Cart/ModalInfoPayment';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ListCategoryOrder from 'components/Order/ListCategoryOrder';
import {Routes} from 'configs';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import useModalAnimation from 'hooks/useModalAnimation';
import moment from 'moment';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AllOrders} from 'res/type/Cart';
import {
  createCode,
  getColor,
  getNameStatus,
  getPriceProduct,
} from 'utils/other-utils';
import snackbarUtils from 'utils/snackbar-utils';

interface DetailOrderColaboratorScreenProps {}

const DetailOrderColaboratorScreen = (
  props: BaseNavigationProps<
    MainParamList,
    Routes.DetailOrderColaboratorScreen
  >,
) => {
  const [visible, open, close] = useModalAnimation();
  const [visibleComplain, openComplain, closeComplain] = useModalAnimation();
  const {data: res} = useQuery(GET_DETAIL_ORDER, {
    variables: {
      filters: {
        query: {
          orderId: props.route.params.id,
        },
      },
    },
  });
  const {data: resDetail} = useQuery(GET_AD_ORDER, {
    variables: {
      order: {
        id: props.route.params.id,
      },
    },
  });

  const dataDetail: AllOrders = React.useMemo(() => {
    return resDetail?.getAdOrder?.result;
  }, [resDetail]);
  console.log('-> dataDetail', dataDetail);

  const [onPress, {data: resCancel}] = useMutation(CANCEL_ORDER);
  const onCancel = () => {
    onPress({
      variables: {
        order: {
          id: props.route.params.id,
        },
      },
    });
  };
  const onComplain = () => {
    openComplain();
  };
  React.useEffect(() => {
    if (resCancel?.cancelAdOrder?.success) {
      snackbarUtils.show('Hủy đơn hàng thành công', 'success');
      props.navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resCancel]);
  const data = React.useMemo(
    () => res?.getAdOrderDetails?.result?.docs || [],
    [res],
  );
  const getAddress = (item: AllOrders) => {
    let address = item?.deliveryLocation || {};
    let addr =
      address?.street +
      ', ' +
      address?.wardName +
      ', ' +
      address?.districtName +
      ', ' +
      address?.cityName;
    return addr;
  };
  const renderInfoOrder = () => {
    if (dataDetail?.isCustomerBearShippingFee && !dataDetail?.isCustomerPaid) {
      return 'Khách hàng sẽ thanh toán mọi chi phí khi nhận hàng';
    }
    if (!dataDetail?.isCustomerBearShippingFee && !dataDetail?.isCustomerPaid) {
      return 'Khách hàng sẽ thanh toán giá bán ra khi nhận hàng, bạn chịu phí vận chuyển.';
    }
    if (!dataDetail?.isCustomerBearShippingFee && dataDetail?.isCustomerPaid) {
      return 'Khách đã thanh toán trước mọi chi phí cho bạn';
    }
  };
  return (
    <Container
      title={createCode(dataDetail?.id)}
      hideButtonRight
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Theme.flexRowSpace, {marginBottom: 15}]}>
          <View
            style={[
              styles.containerStatus,
              {
                backgroundColor: getColor(dataDetail?.status, true),
              },
            ]}>
            <Text
              size={12}
              color={getColor(dataDetail?.status)}
              lineHeight={18}>
              {getNameStatus(dataDetail?.status)}
            </Text>
          </View>
          <Text size={12} lineHeight={18} color={colors.gray}>
            {moment(dataDetail?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
          </Text>
        </View>
        <View style={[Theme.flexRow, styles.containerSelectLocation]}>
          <Image source={images.ic_location} />
          <View style={[Theme.flex1, {paddingHorizontal: 12}]}>
            <View style={Theme.flexRow}>
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                {dataDetail?.userCustomer?.name || dataDetail?.user?.fullName}
              </Text>
              <View style={styles.lineBettwen} />
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                {dataDetail?.userCustomer?.phone || dataDetail?.user?.phone}
              </Text>
            </View>
            <Text size={12} lineHeight={18} color={colors.gray} marginTop={5}>
              {getAddress(dataDetail)}
            </Text>
          </View>
          <Image
            source={images.ic_dropdown}
            style={{transform: [{rotate: '-90deg'}]}}
          />
        </View>
        <ListCategoryOrder data={data} orderId={dataDetail?.id} />
        <View style={styles.lineEnd} />
        <View
          style={[
            Theme.flexRow,
            {
              backgroundColor: colors.dotInActive,
              padding: 10,
              borderRadius: 5,
            },
          ]}>
          <Image
            source={images.ic_info}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text>{renderInfoOrder()}</Text>
        </View>
        <View style={styles.lineEnd} />
        <View style={[Theme.flexRowSpace]}>
          <Text size={16} lineHeight={26}>
            Giá sản phẩm:
          </Text>
          <Text size={16} lineHeight={26} semiBold>
            {dataDetail?.fee?.subTotal?.formatPrice()}đ
          </Text>
        </View>
        <View style={[Theme.flexRowSpace, {marginTop: 10}]}>
          <Text size={16} lineHeight={26}>
            Phí vận chuyển:
          </Text>
          <Text size={16} lineHeight={26} semiBold>
            {dataDetail?.fee?.shippingFee?.formatPrice()}đ
          </Text>
        </View>
        <View style={[Theme.flexRowSpace, {marginTop: 10}]}>
          <Text size={16} lineHeight={26}>
            Tổng giá trị đơn hàng:
          </Text>
          <Text size={16} lineHeight={26} semiBold>
            {((!dataDetail?.isCustomerBearShippingFee &&
              dataDetail?.userCustomerId) ||
            !dataDetail?.userCustomerId
              ? getPriceProduct(data, 'priceWholeSale') +
                (dataDetail?.fee?.shippingFee || 0)
              : getPriceProduct(data, 'priceWholeSale')
            )?.formatPrice()}
            đ
          </Text>
        </View>
        {!!dataDetail?.userCustomer && (
          <View style={[Theme.flexRowSpace, {marginTop: 10}]}>
            <Text size={16} lineHeight={26}>
              Giá bán cho khách:
            </Text>
            <Text size={16} lineHeight={26} semiBold>
              {dataDetail?.fee?.resaleTotal?.formatPrice()}đ
            </Text>
          </View>
        )}
        <View style={styles.lineEnd} />
        <View style={[Theme.flexRowSpace, {marginTop: 10}]}>
          <Text size={16} lineHeight={26}>
            Đã thanh toán:
          </Text>
          <Text size={16} lineHeight={26} semiBold>
            {dataDetail?.status == 'BOOKING'
              ? 0
              : dataDetail?.fee?.total?.formatPrice()}
            đ
          </Text>
        </View>
        {!!dataDetail?.userCustomer && (
          <View style={[Theme.flexRowSpace, {marginTop: 10, marginBottom: 20}]}>
            <Text size={16} lineHeight={26}>
              Lợi nhuận:
            </Text>
            <Text size={16} lineHeight={26} semiBold>
              {(
                getPriceProduct(data, 'feeResale') -
                getPriceProduct(data, 'priceWholeSale')
              ).formatPrice()}
              đ
            </Text>
          </View>
        )}

        {dataDetail?.status == 'BOOKING' && (
          <View>
            <ButtonText
              title="Tiến hành thanh toán"
              titleColor={colors.White}
              onPress={open}
              backgroundColor={colors.primary}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
            />
            <ButtonBorder
              title="Huỷ đơn hàng"
              backgroundColor={colors.White}
              borderColor={colors.primary}
              onPress={onCancel}
              style={{marginTop: 14, marginBottom: getBottomSpace()}}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
            />
          </View>
        )}
        {(dataDetail?.status == 'COMPLAIN' ||
          dataDetail?.status == 'RECEIVED') && (
          <View>
            <ButtonBorder
              title="Khiếu nại"
              backgroundColor={colors.White}
              borderColor={colors.primary}
              onPress={onComplain}
              style={{marginTop: 14, marginBottom: getBottomSpace()}}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
            />
          </View>
        )}
      </ScrollView>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalInfoPayment close={close} id={dataDetail?.paymentId} />
      </ModalBottom>
      <ModalBottom
        isVisibleModal={visibleComplain}
        isTransaction
        onCloseModal={closeComplain}>
        <ModalComplain
          close={closeComplain}
          id={dataDetail?.id}
          dataDetail={dataDetail}
        />
      </ModalBottom>
    </Container>
  );
};

export default DetailOrderColaboratorScreen;

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  containerStatus: {
    padding: 3,
    paddingHorizontal: 5,
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
});
