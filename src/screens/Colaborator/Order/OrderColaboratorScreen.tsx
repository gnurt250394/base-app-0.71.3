import {useQuery} from '@apollo/client';
import {GETT_ALL_ORDER} from 'apollo/query/ApiOrder';
import HeaderSearch, {SearchProps} from 'components/Order/HeaderSearch';
import {Routes} from 'configs';
import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import moment from 'moment';
import {navigate} from 'navigation/service/RootNavigation';
import * as React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {AllOrders} from 'res/type/Cart';
import {Address} from 'res/type/Home';
import {formatData} from 'utils/array-utils';
import {createCode, getCode, getColor, getNameStatus} from 'utils/other-utils';
import scale from 'utils/scale';
interface ParamProps {
  'user.id'?: string;
  $and: any;
  id?: string;
  createdAt?: any;
  isWholeSale?: boolean;
}
interface OrderColaboratorScreenProps {
  isWholeSale: boolean;
}

const OrderColaboratorScreen = (props: OrderColaboratorScreenProps) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<AllOrders[]>([]);
  const [params, setParams] = useState<SearchProps>({
    code: '',
    status: '',
    dateStart: '',
    dateEnd: '',
  });
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const getParam = () => {
    let param: ParamProps = {
      'user.id': userProfile?.user?.id,
      $and: [
        {
          status: {
            $ne: 'IN_CART',
          },
        },
      ],
    };
    if (params.code) {
      param.id = getCode(params.code);
    }
    if (props.isWholeSale) {
      param.isWholeSale = props.isWholeSale;
    }
    if (params.status) {
      param.$and = [
        {
          status: {
            $in: [params.status],
          },
        },
      ];
    }
    if (params.dateStart) {
      param.createdAt = {$gte: new Date(params.dateStart)};
    }
    if (params.dateEnd) {
      param.createdAt = {$lte: new Date(params.dateEnd)};
    }

    return {
      page: page,
      query: param,
      sort: {
        createdAt: -1,
      },
      populate:
        'complains staff.customerCare staff.warehouse staff.order orderDetails productRatings payment',
    };
  };
  const {
    data: res,
    loading,
    refetch,
  } = useQuery(GETT_ALL_ORDER, {
    variables: {
      filters: getParam(),
    },
    onCompleted: data => {
      setRefreshing(false);
      setData(formatData(data?.getAllOrders?.result?.docs || [], page));
    },
  });

  const onLoadMore = () => {
    if (
      res?.getAllOrders?.result?.totalDocs >=
      res?.getAllOrders?.result?.page * res?.getAllOrders?.result?.limit
    ) {
      setPage(page => page + 1);
    }
  };
  const getAddress = (item: Address) => {
    let address = item || {};
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

  const goToDetail = (item: AllOrders) => () => {
    navigate(Routes.DetailOrderColaboratorScreen, {id: item.id});
  };
  const _renderItem = (item: AllOrders, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={goToDetail(item)}
        style={[styles.containerItem]}>
        <View style={[Theme.flexRowSpace, {marginBottom: 8}]}>
          <View
            style={[
              styles.containerStatus,
              {
                backgroundColor: getColor(
                  item?.orderStatus || item?.adOrderStatus,
                  true,
                ),
              },
            ]}>
            <Text
              size={12}
              lineHeight={18}
              color={getColor(item?.orderStatus || item?.adOrderStatus)}>
              {getNameStatus(item?.orderStatus || item?.adOrderStatus)}
            </Text>
          </View>
          <Text size={12} lineHeight={18} color={colors.gray}>
            {moment(item?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
          </Text>
        </View>
        {!!item?.id && (
          <View style={[Theme.flexRowSpace, {marginBottom: 8}]}>
            <Text>Mã đơn:</Text>
            <Text>{createCode(item?.id || '')}</Text>
          </View>
        )}
        {!!item?.userCustomer && (
          <View style={[Theme.flexRowSpace, {marginBottom: 8}]}>
            <Text>Khách mua hàng:</Text>
            <Text>{item?.userCustomer?.name}</Text>
          </View>
        )}
        {!!item?.userCustomer && (
          <View style={[Theme.flexRowSpace, {marginBottom: 8}]}>
            <Text>Số điện thoại:</Text>
            <Text>{item?.userCustomer?.phone?.formatPhoneNumber()}</Text>
          </View>
        )}
        <View
          style={[Theme.flexRowSpace, Theme.flex1, {alignItems: 'flex-start'}]}>
          <Text style={{flex: 1}}>Giao đến</Text>
          <Text size={14} lineHeight={24} right style={Theme.flex2}>
            {getAddress(
              item?.userCustomer?.address
                ? item?.userCustomer?.address.find(e => e.isDefault)
                : item.deliveryLocation,
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = (data: SearchProps) => {
    console.log('data: ', data);
    setParams(data);
    setPage(1);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    refetch();
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <ScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onMomentumScrollEnd={({nativeEvent}) => {
        console.log('nativeEvent: ', nativeEvent);
        if (isCloseToBottom(nativeEvent)) {
          onLoadMore();
        }
      }}>
      <View style={{flex: 1}}>
        <HeaderSearch onSearch={onSearch} isLoading={loading} />
        <Text
          semiBold
          size={18}
          lineHeight={28}
          marginTop={16}
          color={colors.text}
          marginBottom={14}>
          Danh sách đơn hàng
        </Text>
        {!!data?.length && data.map((item, index) => _renderItem(item, index))}
      </View>
      {!!loading && (
        <View style={{flex: 1}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </ScrollView>
  );
};

export default OrderColaboratorScreen;

const styles = StyleSheet.create({
  containerStatus: {
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  containerItem: {
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    borderRadius: 16,
  },
  container: {
    padding: scale(16),
  },
});
