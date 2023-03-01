import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import Image from 'elements/Image';
import Text from 'elements/Text';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {CategoryItemProp} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import Collapsing from './Collapsing';

interface PCategoryRight {
  data: CategoryItemProp[];
  item?: CategoryItemProp;
  parent: CategoryItemProp[];
}

const CategoryRight = (props: PCategoryRight) => {
  const [data, setData] = useState<CategoryItemProp[]>(props?.data || []);
  React.useEffect(() => {
    setData(props?.data || []);
  }, [props?.data]);
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const goToDetail = (item: CategoryItemProp) => () => {
    navigation.navigate(Routes.CategoryChildrenScreen, {
      item,
      data: item.children,
      title: item.name,
      parent: props.parent.filter(e => e.id == props?.item?.id),
      listParent: [item],
    });
  };
  const renderItem: ListRenderItem<CategoryItemProp> = ({item}) => {
    return (
      <Collapsing onPress={goToDetail(item)} title={item.name}>
        <View style={styles.containerItem}>
          {!!item?.children?.length &&
            item.children.map((e, i) => {
              return (
                <TouchableOpacity
                  onPress={goToDetail(e)}
                  key={i}
                  style={[Theme.center, {width: '33%'}]}>
                  <Image
                    defaultImage={images.ic_bag_active}
                    source={{uri: e.image}}
                    style={{height: 25, width: 25}}
                  />
                  <Text
                    size={12}
                    lineHeight={18}
                    semiBold
                    ucfirst
                    color={colors.gray}
                    marginTop={3}>
                    {e.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </Collapsing>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default CategoryRight;

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
});
