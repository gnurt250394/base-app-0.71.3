import {useMutation, useQuery} from '@apollo/client';
import {ADD_ORDER_CUSTOMER, GET_LIST_CUSTOMER} from 'apollo/query/ApiCustomer';
import ModalBottom from 'components/ModalBase/ModalBottom';
import {Routes} from 'configs';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import TextInput from 'elements/TextInput';
import useModalAnimation from 'hooks/useModalAnimation';
import {RootReducer} from 'middlewares/reducers';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import {UserCustomerPaginate} from 'res/type/Customer';
import {Address} from 'res/type/Home';
import {formatData} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';
import ItemCustomer from './ItemCustomer';
import ModalDeleteCustomer from './ModalDeleteCustomer';
import ModalEditCustomer from './ModalEditCustomer';
export interface ItemCustomer {
  name: string;
  phone: string;
  address: Address;
}
interface ListCustomerScreenProps {}

const ListCustomerScreen = (
  props: BaseNavigationProps<MainParamList, Routes.ListCustomerScreen>,
) => {
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState<UserCustomerPaginate>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<UserCustomerPaginate[]>([]);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  React.useEffect(() => {
    let timeout = setTimeout(() => {
      setText(keyword);
    }, 500);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [keyword]);
  const getParam = () => {
    let param = {
      page: page,
      limit: 10,
      sort: {
        createdAt: 'desc',
      },
      query: {
        userId: userProfile?.user?.id,
      },
    };
    if (text) {
      param.query = {
        name: {
          $regex: '.*' + text + '*.',
          $options: 'i',
        },
      };
    }
    return param;
  };
  const {data: res, refetch} = useQuery(GET_LIST_CUSTOMER, {
    variables: {
      filters: getParam(),
    },
    onCompleted: data => {
      setData(formatData(data?.getUserCustomers?.result?.docs || [], page));
    },
  });
  const onLoadMore = () => {
    if (
      res?.getUserCustomers?.result?.totalDocs >=
      res?.getUserCustomers?.result?.page * res?.getUserCustomers?.result?.limit
    ) {
      setPage(page => page + 1);
    }
  };
  const [visible, open, close] = useModalAnimation();
  const [visibleView, openView, closeView] = useModalAnimation();
  const [visibleDelete, openDelete, closeDelete] = useModalAnimation();
  const onDeleteCustomer = (customer: UserCustomerPaginate) => () => {
    openDelete();
    setCustomer(customer);
  };
  const onOpenAddCustomer =
    (isEdit: boolean, customer?: UserCustomerPaginate) => () => {
      open();
      if (isEdit) {
        setCustomer(customer);
      } else {
        setCustomer(undefined);
      }
      setIsEdit(isEdit);
    };
  // const [onPress, {}] = useMutation(ADD_ORDER_CUSTOMER);
  const onAddCustomer = (customer?: UserCustomerPaginate | null) => {
    // onPress({
    //   variables: {
    //     order: {
    //       userCustomerId: customer?.id || '',
    //       id: props.route.params.idCart || '',
    //     },
    //   },
    // });
  };
  const onSelectCustomer = (customer: UserCustomerPaginate) => () => {
    let onSelected = props.route?.params?.onSelected;
    onSelected && onSelected(customer);
    onAddCustomer(
      customer?.id == props?.route?.params?.customer?.id ? null : customer,
    );
    props.navigation.pop();
  };
  const _renderItem: ListRenderItem<UserCustomerPaginate> = ({item, index}) => {
    return (
      <ItemCustomer
        onSelectCustomer={onSelectCustomer(item)}
        onPressEdit={onOpenAddCustomer(true, item)}
        onPressDelete={onDeleteCustomer(item)}
        onPressView={openView}
        item={item}
        index={index}
        isEdit={props.route.params.isEdit}
        isSelected={item.id == props?.route?.params?.customer?.id}
      />
    );
  };
  const onRefresh = () => {
    if (page != 1) {
      setPage(1);
    } else {
      refetch();
    }
  };
  // if (!data.length) {
  //   return <Loading />;
  // }
  return (
    <Container
      hideButtonRight
      title={props?.route?.params?.isEdit ? 'Khách hàng' : 'Thêm khách hàng'}
      style={styles.container}>
      <TextInput
        editable
        placeholder="Tìm kiếm"
        iconLeft={<Image source={images.ic_search_category} />}
        isShowIconLeft
        onChangeText={setKeyword}
        value={keyword}
      />
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={_renderItem}
          data={data}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.6}
        />
      </View>
      <ButtonIconText
        icon={images.ic_guest}
        title="Thêm khách hàng"
        borderColor={colors.primary}
        onPress={onOpenAddCustomer(false)}
        style={{marginBottom: scale(15)}}
      />
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <KeyboardAwareScrollView bounces={false}>
          <ModalEditCustomer
            close={() => {
              close();
              onRefresh();
            }}
            isEdit={isEdit}
            customer={customer}
          />
        </KeyboardAwareScrollView>
      </ModalBottom>
      <ModalBottom isVisibleModal={visibleDelete} onCloseModal={closeDelete}>
        <ModalDeleteCustomer
          close={() => {
            closeDelete();

            onRefresh();
          }}
          customer={customer}
        />
      </ModalBottom>
    </Container>
  );
};

export default ListCustomerScreen;

const styles = StyleSheet.create({
  containerAddress: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  container: {
    padding: 14,
  },
});
