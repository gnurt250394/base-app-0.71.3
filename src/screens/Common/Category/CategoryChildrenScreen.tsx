import {useQuery} from '@apollo/client';
import {PRODUCT_CATTEGORIES_QUERY} from 'apollo/query/ApiCategory';
import {SECTIONS_QUERY} from 'apollo/query/ApiGetAdvertisementProducts';
import {CategoryType} from 'common/Constants';
import ItemCategory from 'components/Home/ItemCategory';
import {Routes} from 'configs';
import {DataCategory, DataCategory2} from 'configs/Data';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import _ from 'lodash';
require('deepdash')(_);
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {CategoryItemProp, HotDealsItemProp} from 'res/type/Home';
import {flattenArray, generateCategories} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';

interface CategoryChildrenScreenProps {}

const CategoryChildrenScreen = (
  props: BaseNavigationProps<MainParamList, Routes.CategoryChildrenScreen>,
) => {
  let idString = flattenArray(props.route.params?.listParent, 'id');

  function filter(array: CategoryItemProp[], id: string) {
    return array.reduce((r: any, {children = [], ...o}) => {
      if (o.id === id) {
        r.push(o);
        return r;
      }
      children = filter(children || [], id);
      if (children.length) {
        r.push(Object.assign(o, {children}));
      }
      return r;
    }, []);
  }
  let listParent = useMemo(
    () =>
      flattenArray(
        filter(props.route.params.parent, props.route.params.item.id),
        'name',
      ),
    [props.route.params],
  );

  const {data: res} = useQuery(SECTIONS_QUERY, {
    variables: {
      filters: {
        page: 1,
        query: {
          categoryIds: {
            $in: idString,
          },
          availableForShopping: true,
          isDel: false,
        },
        limit: 20,
        sort: {
          createdAt: 'desc',
        },
        populate: ['schedulers'],
      },
    },
  });
  const data = useMemo(() => {
    return res?.getAdvertisementProducts?.result?.docs || [];
  }, [res]);
  const [listCategory, setListCategory] = useState<CategoryItemProp[]>(
    props?.route?.params?.data,
  );
  const goDetail = (item: HotDealsItemProp) => () => {
    props.navigation.navigate(Routes.DetailCategoryScreen, {
      item,
      slug: item.slug,
    });
  };
  const renderItem: ListRenderItem<HotDealsItemProp> = ({item, index}) => {
    return <ItemCategory item={item} onPress={goDetail(item)} />;
  };
  const goToChildren = (item: CategoryItemProp) => () => {
    props.navigation.push(Routes.CategoryChildrenScreen, {
      title: item.name,
      data: item.children,
      parent: props.route.params.parent,
      listParent: props.route.params.data.filter(e => e.id == item.id),
      item,
    });
  };
  return (
    <Container title={props.route.params?.title} style={styles.container}>
      <View style={{}}>
        <View
          style={[
            Theme.flexRow,
            {
              paddingHorizontal: scale(15),
              paddingBottom: 10,
            },
          ]}>
          {!!listParent?.length &&
            listParent.map((item, index) => (
              <View key={index} style={[Theme.flexRow]}>
                {index != 0 && (
                  <Image source={images.ic_dropdown} style={styles.imgNext} />
                )}
                <Text size={12} medium color={colors.Black} lineHeight={18}>
                  {item}
                </Text>
              </View>
            ))}
        </View>
        <View style={[Theme.flexRow, styles.containerHeader]}>
          {!!listCategory?.length &&
            listCategory.map((item, index) => (
              <ButtonText
                title={item.name}
                onPress={goToChildren(item)}
                backgroundColor={colors.lightGray}
                style={styles.buttonCategory}
                textProps={{size: 14, lineHeight: 24}}
              />
            ))}
        </View>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={data}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            paddingBottom: scale(15),
          }}
          contentContainerStyle={{
            paddingLeft: scale(15),
          }}
        />
      </View>
    </Container>
  );
};

export default CategoryChildrenScreen;

const styles = StyleSheet.create({
  imgNext: {
    height: 18,
    width: 18,
    transform: [{rotate: '-90deg'}],
    marginHorizontal: 5,
  },
  buttonCategory: {
    borderRadius: scale(35),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    marginTop: scale(6),
    marginRight: scale(4),
    height: undefined,
  },
  containerHeader: {
    flexWrap: 'wrap',
    paddingHorizontal: scale(15),
    paddingBottom: scale(24),
  },
  container: {},
});
