import {useMutation, useQuery} from '@apollo/client';
import {
  CANCEL_ORDER,
  GETT_ALL_ORDER,
  GET_AD_ORDER,
  GET_DETAIL_ORDER,
} from 'apollo/query/ApiOrder';
import ListCategory from 'components/Cart/ListCategory';
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
import AddressApi from 'network/apis/address/AddressApi';
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AllOrders} from 'res/type/Cart';
import {createCode, getColor, getNameStatus} from 'utils/other-utils';
import snackbarUtils from 'utils/snackbar-utils';
import RatingScreen from 'screens/Common/Rating/RatingScreen';
import useEnums from 'apollo/logic/useEnums';

interface DetailOrderScreenProps {}

const DetailOrderScreen = (
  props: BaseNavigationProps<MainParamList, Routes.DetailOrderScreen>,
) => {
  const [visibleComplain, openComplain, closeComplain] = useModalAnimation();
  const [visible, open, close] = useModalAnimation();

  const {
    data: res,
    error,
    refetch,
  } = useQuery(GET_DETAIL_ORDER, {
    variables: {
      filters: {
        query: {
          orderId: props.route.params.id,
        },
        populate:
          'complains staff.customerCare staff.warehouse staff.order orderDetails productRatings payment',
      },
    },
    // fetchPolicy: 'cache-and-network',
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
  const [onPress, {data: resCancel, loading}] = useMutation(CANCEL_ORDER);
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
  }, [resCancel]);
  const data = React.useMemo(
    () => res?.getAdOrderDetails?.result?.docs || [],
    [res],
  );
  const enums = useEnums();
  console.log('-> data', data);
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
              {
                enums?.getEnums?.result?.ORDER_STATUS_TRANSLATE[
                  dataDetail?.status
                ]
              }
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
                {dataDetail?.user?.fullName}
              </Text>
              <View style={styles.lineBettwen} />
              <Text size={14} lineHeight={24} semiBold color={colors.text}>
                {dataDetail?.user?.phone}
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
        <View style={[Theme.flexRowSpace]}>
          <Text size={16} lineHeight={26}>
            Giá sản phẩm:
          </Text>
          <Text size={16} lineHeight={26} semiBold>
            {dataDetail?.fee?.total?.formatPrice()}đ
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
            {(
              dataDetail?.fee?.total + dataDetail?.fee?.shippingFee
            )?.formatPrice()}
            đ
          </Text>
        </View>
        {dataDetail?.status == 'BOOKING' && (
          <View>
            <View style={styles.lineEnd} />
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
        {(dataDetail?.status == 'RECEIVED' ||
          dataDetail?.status == 'COMPLAIN') && (
          <View
            style={[
              Theme.flexRowCenter,
              {
                marginTop: 14,
                marginBottom: getBottomSpace(),
              },
            ]}>
            <ButtonText
              title="Khiếu nại"
              backgroundColor={colors.primary}
              titleColor={colors.White}
              onPress={onComplain}
              style={{...Theme.flex1, marginLeft: 10}}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
            />
          </View>
        )}
      </ScrollView>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalInfoPayment close={close} id={dataDetail?.payment?.id} />
      </ModalBottom>
      <ModalBottom
        isTransaction
        isVisibleModal={visibleComplain}
        onCloseModal={closeComplain}>
        <ModalComplain
          close={closeComplain}
          id={props.route.params.item?.id}
          dataDetail={dataDetail}
        />
      </ModalBottom>
    </Container>
  );
};

export default DetailOrderScreen;

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
