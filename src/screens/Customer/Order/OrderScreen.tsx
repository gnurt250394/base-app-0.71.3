import {useLazyQuery, useQuery} from '@apollo/client';
import {GETT_ALL_ORDER} from 'apollo/query/ApiOrder';
import CustomMenu from 'components/Menu/CustomMenu';
import HeaderSearch, {SearchProps} from 'components/Order/HeaderSearch';
import {Routes} from 'configs';
import {width} from 'configs/Const';
import {DataStatus} from 'configs/Data';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Switch from 'elements/Switch';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import useModalAnimation from 'hooks/useModalAnimation';
import {RootReducer} from 'middlewares/reducers';
import moment from 'moment';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ScrollView,
  NativeScrollEvent,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AllOrders} from 'res/type/Cart';
import {formatData} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import {createCode, getCode, getColor, getNameStatus} from 'utils/other-utils';
import scale from 'utils/scale';
import useEnums from 'apollo/logic/useEnums';
interface ParamProps {
  'user.id'?: string;
  $and: any;
  id?: string;
  createdAt?: any;
}
interface OrderScreenProps {}

const OrderScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [visible, open, close] = useModalAnimation();
  const [page, setPage] = useState(1);
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
      setData(formatData(data?.getAllOrders?.result?.docs || [], page));
    },
  });
  const enums = useEnums();

  React.useEffect(() => {
    const unsubcri = props.navigation.addListener('focus', () => {
      setPage(1);
    });
    return unsubcri;
  }, [props.navigation]);
  const onLoadMore = () => {
    if (
      res?.getAllOrders?.result?.totalDocs >=
      res?.getAllOrders?.result?.page * res?.getAllOrders?.result?.limit
    ) {
      setPage(page => page + 1);
    }
  };
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

  const goToDetail = (item: AllOrders) => () => {
    props.navigation.navigate(Routes.DetailOrderScreen, {
      id: item.id,
    });
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
              {
                enums?.getEnums?.result?.ORDER_STATUS_TRANSLATE[
                  item?.orderStatus || item?.adOrderStatus
                ]
              }
            </Text>
          </View>
          <Text size={12} lineHeight={18} color={colors.gray}>
            {moment(item?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
          </Text>
        </View>
        {!!item?.id && (
          <View style={[Theme.flexRowSpace, {marginBottom: 8}]}>
            <Text>Mã đơn</Text>
            <Text>{createCode(item?.id || '')}</Text>
          </View>
        )}
        <View
          style={[Theme.flexRowSpace, Theme.flex1, {alignItems: 'flex-start'}]}>
          <Text style={{flex: 1}}>Giao đến</Text>
          <Text size={14} lineHeight={24} right style={Theme.flex2}>
            {getAddress(item)}
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
    <Container title={'Đơn hàng'} hideButtonRight style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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
          {!!data?.length &&
            data.map((item, index) => _renderItem(item, index))}
        </View>
        {!!loading && (
          <View style={{flex: 1}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default OrderScreen;

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
