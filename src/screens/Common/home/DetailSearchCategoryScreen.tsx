import ItemCategory from 'components/Home/ItemCategory';
import {Routes} from 'configs';
import {DataCategory} from 'configs/Data';
import Image from 'elements/Image';
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
  ListRenderItem,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import {HotDealsItemProp} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';

interface DetailSearchCategoryScreenProps {}

const DetailSearchCategoryScreen = ({
  route,
}: BaseNavigationProps<MainParamList, Routes.DetailSearchCategoryScreen>) => {
  const [keyword, setKeyword] = useState<string>(route.params?.keyword || '');
  const [data, setData] = useState<HotDealsItemProp[]>(DataCategory);
  const renderItem: ListRenderItem<HotDealsItemProp> = ({item, index}) => {
    return <ItemCategory item={item} />;
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
          style={{flex: 1000, height: 56}}
          borderColor={colors.primary}
          placeholder={'Tìm kiếm'}
          value={keyword}
        />
      }
      style={styles.container}>
      <View style={{}}>
        {!!keyword && (
          <Text
            size={14}
            marginLeft={15}
            marginBottom={24}
            lineHeight={24}
            marginTop={10}>
            Có {data.length} kết quả{' '}
            <Text color={colors.primary}>“{keyword}”</Text>
          </Text>
        )}
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

export default DetailSearchCategoryScreen;

const styles = StyleSheet.create({
  container: {},
});
