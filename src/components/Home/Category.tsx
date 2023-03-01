import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_CATTEGORIES_QUERY} from 'apollo/query/ApiCategory';
import {CategoryType} from 'common/Constants';
import {Routes} from 'configs';
import {DataCategory2} from 'configs/Data';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Text from 'elements/Text';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {CategoryItemProp} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';
import _ from 'lodash';
import {generateCategories, groupBy} from 'utils/array-utils';

interface CategoryProps {}

const Category = (props: CategoryProps) => {
  const {
    data: data2,
    error,
    loading,
  } = useQuery(PRODUCT_CATTEGORIES_QUERY, {
    variables: {
      filters: {
        pagination: false,
        query: {
          isDel: false,
          orderKind: 'AD_ORDER',
        },
      },
    },
  });

  const data = React.useMemo(() => {
    let list = data2?.getProductCategories?.result?.docs || [];
    let ar = generateCategories(list);
    return ar;
  }, [data2]);
  const {navigate} = useNavigation<BaseUseNavigationProps<MainParamList>>();
  // const [data, setData] = useState<CategoryItemProp[]>(DataCategory2);
  const onDetail = (item: CategoryItemProp) => () => {
    let list = data.categoryList.filter(e => e.id == item.id);
    navigate(Routes.CategoryChildrenScreen, {
      title: item.name,
      data: item.children,
      parent: list,
      listParent: list,
      item,
    });
  };
  const _renderItem: ListRenderItem<CategoryItemProp> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={onDetail(item)}
        style={[Theme.center, {marginRight: 5}]}>
        <Image source={{uri: item.image}} style={styles.imgItem} />
        <Text color={colors.text} size={12} lineHeight={18} marginTop={6}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const goToCategory = () => navigate(Routes.CategoryStack);
  const renderHeader = () => (
    <View style={[Theme.flexRowSpace, styles.containerHeader]}>
      <Text semiBold type="H5">
        Danh mục
      </Text>
      <ButtonText
        title="Xem thêm"
        onPress={goToCategory}
        textProps={{semiBold: true, type: 'Body', color: colors.text2}}
      />
    </View>
  );
  const ItemSeparatorComponent = () => <View style={{width: scale(16)}} />;
  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data.categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={_renderItem}
        contentContainerStyle={{paddingLeft: scale(15)}}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  containerHeader: {
    paddingHorizontal: scale(15),
    paddingBottom: scale(8),
    paddingTop: scale(15),
  },
  imgItem: {
    height: scale(48),
    width: scale(48),
    borderRadius: scale(4),
  },
  container: {},
});
