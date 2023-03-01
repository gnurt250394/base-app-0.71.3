import {useLazyQuery, useQuery} from '@apollo/client';
import {PRODUCT_CATTEGORIES_QUERY} from 'apollo/query/ApiCategory';
import {SECTIONS_QUERY} from 'apollo/query/ApiGetAdvertisementProducts';
import {CategoryType} from 'common/Constants';
import ItemCategory from 'components/Home/ItemCategory';
import {Routes} from 'configs';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
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
import images from 'res/images';
import {CategoryItemProp, HotDealsItemProp} from 'res/type/Home';
import {generateCategories} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';

interface SearchCategoryScreenProps {}

const SearchCategoryScreen = ({
  navigation,
}: BaseNavigationProps<MainParamList>) => {
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<CategoryItemProp[]>();
  const [getData, {data: data2, error, loading, refetch}] =
    useLazyQuery(SECTIONS_QUERY);
  React.useEffect(() => {
    let timeout = setTimeout(() => {
      let params = {
        isDel: false,
        availableForShopping: true,
      };
      if (keyword) {
        params.name = {
          $regex: keyword.regexSearchText(),
          $options: 'i',
        };
      }
      getData({
        variables: {
          filters: {
            pagination: false,
            query: params,
          },
        },
      });
    }, 500);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [keyword]);
  let res = React.useMemo(() => {
    return generateCategories(data2?.getProducts?.result?.docs || []);
  }, [data2]);
  const onDetailSearch = () => {
    navigation.navigate(Routes.DetailSearchCategoryScreen, {keyword});
  };
  const goDetail = (item: HotDealsItemProp) => () => {
    navigation.navigate(Routes.DetailCategoryScreen, {item, slug: item.slug});
  };
  const renderItem: ListRenderItem<HotDealsItemProp> = ({item, index}) => {
    return <ItemCategory item={item} onPress={goDetail(item)} />;
    return (
      <TouchableOpacity onPress={onDetailSearch} style={styles.containerItem}>
        <Text size={16} color={colors.text} lineHeight={26}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Container
      titleStyle={{flex: 0}}
      buttonRight={
        <TextInput
          iconLeft={<Image source={images.ic_search_category} />}
          isShowIconLeft={true}
          icon={<Image source={images.ic_close} />}
          isShowIcon={!!keyword}
          iconPress={() => setKeyword('')}
          editable
          onChangeText={setKeyword}
          style={{flex: 1000, width: '100%', height: 56}}
          containerStyle={{flex: 1}}
          borderColor={colors.primary}
          placeholder={'Tìm kiếm'}
          value={keyword}
        />
      }
      style={styles.container}>
      <View style={{flex: 1}}>
        {!!keyword && (
          <Text
            size={14}
            marginLeft={15}
            marginBottom={10}
            lineHeight={24}
            marginTop={10}>
            Có {res?.categoryList?.length} kết quả{' '}
            <Text color={colors.primary}>“{keyword}”</Text>
          </Text>
        )}
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={res.categoryList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            paddingBottom: scale(9),
          }}
          contentContainerStyle={{
            paddingLeft: scale(15),
            paddingBottom: 10,
          }}
        />
      </View>
    </Container>
  );
};

export default SearchCategoryScreen;

const styles = StyleSheet.create({
  containerItem: {
    paddingBottom: scale(16),
    paddingTop: scale(12),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  container: {},
});
