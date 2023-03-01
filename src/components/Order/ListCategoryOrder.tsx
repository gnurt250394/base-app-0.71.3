import {useNavigation} from '@react-navigation/native';
import {DataCategory} from 'configs/Data';
import Routes from 'configs/Routes';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Image from 'elements/Image';
import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {CartCategoryProps} from 'res/type/Cart';
import {HotDealsItemProp} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import {getSlug} from 'utils/other-utils';
import ItemOrderCategory from './ItemOrderCategory';
import ItemOrderCategoryColaborator from './ItemOrderCategoryColaborator';
import useRating from 'apollo/logic/rating/useRating';

interface ListCategoryOrderProps {
  data: CartCategoryProps[];
  orderId?: string;
}

const ListCategoryOrder = (props: ListCategoryOrderProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [data, setData] = useState<CartCategoryProps[]>(props?.data || []);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  React.useEffect(() => {
    setData(props?.data || []);
  }, [props.data]);
  const onDelete = (item: CartCategoryProps) => {
    // let arr = data.filter(e => e.id != item.id);
    // setData(arr);
  };
  const {data: dataRating} = useRating(undefined, props?.orderId);
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
        <ItemOrderCategoryColaborator
          key={index}
          item={item}
          onDetail={onDetail(item)}
          onDeleteItem={onDelete}
          isRating={dataRating?.productRatings?.result?.docs?.some(
            e => e.productId == item.product.id,
          )}
        />
      );
    }
    return (
      <ItemOrderCategory
        key={index}
        item={item}
        onDetail={onDetail(item)}
        onDeleteItem={onDelete}
        isRating={dataRating?.productRatings?.result?.docs?.some(
          e => e.productId == item.product.id,
        )}
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
    </View>
  );
};

export default ListCategoryOrder;

const styles = StyleSheet.create({
  containerSelectAll: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  container: {},
});
