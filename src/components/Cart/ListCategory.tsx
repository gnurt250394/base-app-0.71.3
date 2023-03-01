import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {CartCategoryProps} from 'res/type/Cart';
import ItemCartCategoryColaborator from 'components/Cart/ItemCartCategoryColaborator';
import ItemCartCategory from './ItemCartCategory';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalChangePrice from './ModalChangePrice';
import useModalAnimation from 'hooks/useModalAnimation';
import {UserCustomerPaginate} from 'res/type/Customer';
import {useNavigation} from '@react-navigation/native';
import {MainParamList} from 'navigation/service/NavigationParams';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import Routes from 'configs/Routes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface ListCategoryProps {
  data: CartCategoryProps[];
  isCheck?: boolean;
  customer?: UserCustomerPaginate;
}

const ListCategory = (props: ListCategoryProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [visible, open, close] = useModalAnimation();
  const [data, setData] = useState<CartCategoryProps[]>(props?.data || []);
  const [product, setProduct] = useState<CartCategoryProps>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  React.useEffect(() => {
    setData(props?.data || []);
  }, [props.data]);
  const onDelete = (_item: CartCategoryProps) => {
    // let arr = data.filter(e => e.id != item.id);
    // setData(arr);
  };
  const onChangePrice = (item: CartCategoryProps) => () => {
    setProduct(item);
    open();
  };
  const onDetail = (item: CartCategoryProps) => () => {
    if (userProfile?.user?.isWholeSale) {
      navigation.navigate(Routes.DetailCategoryColaboratorScreen, {
        slug: item?.product?.slug,
      });
    } else {
      navigation.navigate(Routes.DetailCategoryScreen, {
        slug: item?.product?.slug,
      });
    }
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: CartCategoryProps;
    index: number;
  }) => {
    if (userProfile?.user?.isWholeSale) {
      return (
        <ItemCartCategoryColaborator
          key={index}
          item={item}
          onDetail={onDetail(item)}
          isCheck={props?.isCheck}
          onDeleteItem={onDelete}
          customer={props.customer}
          onChangePrice={onChangePrice(item)}
        />
      );
    }
    return (
      <ItemCartCategory
        key={index}
        onDetail={onDetail(item)}
        item={item}
        onDeleteItem={onDelete}
      />
    );
  };
  const _renderHeader = () => {
    return (
      <View style={[Theme.flex1]}>
        <View style={[Theme.flexRow, Theme.flex1, styles.containerSelectAll]}>
          <View style={[Theme.flexRow, Theme.flex1]}>
            <View style={[Theme.flexRow]}>
              <Text
                semiBold
                size={14}
                lineHeight={24}
                marginLeft={11}
                color={colors.text}
                marginRight={10}>
                Tất cả
              </Text>
            </View>
            <Text semiBold size={14} lineHeight={24} color={colors.gray}>
              {data?.length} (sản phẩm)
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {_renderHeader()}
      {!!data?.length && data.map((item, index) => renderItem({item, index}))}
      <ModalBottom isVisibleModal={visible} isTransaction onCloseModal={close}>
        <ModalChangePrice close={close} product={product} />
      </ModalBottom>
    </View>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  containerSelectAll: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  container: {},
});
