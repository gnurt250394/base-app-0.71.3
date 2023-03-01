import {useNavigation} from '@react-navigation/native';
import useHotDeals from 'apollo/logic/home/useHotDeals';
import {useAdvertisementProducts} from 'apollo/query/ApiGetAdvertisementProducts';
import {Routes} from 'configs';
import {DataCategory} from 'configs/Data';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {HotDealsItemProp} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';
import ItemCategory from './ItemCategory';
import ItemCategoryColaborator from './ItemCategoryColaborator';

interface HotDealsProps {
  renderHeader: () => React.ReactNode;
}

const HotDeals = (props: HotDealsProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const {data} = useHotDeals();
  const goDetail = (item: HotDealsItemProp) => () => {
    if (userProfile?.user?.isWholeSale) {
      navigation.navigate(Routes.DetailCategoryColaboratorScreen, {
        item,
        slug: item.slug,
      });
    } else {
      navigation.navigate(Routes.DetailCategoryScreen, {item, slug: item.slug});
    }
  };
  const _renderItem: ListRenderItem<HotDealsItemProp> = ({item, index}) => {
    if (userProfile?.user?.isWholeSale) {
      return <ItemCategoryColaborator item={item} onPress={goDetail(item)} />;
    } else {
      return <ItemCategory item={item} onPress={goDetail(item)} />;
    }
  };
  const _renderHeader = () => (
    <View>
      {props?.renderHeader()}
      <View style={[Theme.flexRowSpace, styles.containerHeader]}>
        <Text semiBold type="H5">
          Tất cả sản phẩm
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* {renderHeader()} */}
      <FlatList
        data={data?.getProducts?.result?.docs}
        numColumns={2}
        ListHeaderComponent={_renderHeader}
        showsHorizontalScrollIndicator={false}
        renderItem={_renderItem}
        columnWrapperStyle={{
          paddingBottom: scale(9),
          paddingLeft: scale(15),
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default HotDeals;

const styles = StyleSheet.create({
  imgItem: {
    height: scale(105),
    width: '100%',
    borderTopLeftRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  containerItem1: {
    flex: 1 / 2,
  },
  containerItem: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: scale(15),
  },
  containerHeader: {
    paddingHorizontal: scale(15),
    paddingBottom: scale(8),
    marginTop: scale(13),
    paddingTop: scale(15),
  },
  container: {},
});
