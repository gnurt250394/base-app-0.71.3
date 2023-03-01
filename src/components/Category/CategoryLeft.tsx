import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {useEffect, useState} from 'react';
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

interface CategoryLeftProps {
  data: CategoryItemProp[];
  onSelected: (item: CategoryItemProp) => void;
}

const CategoryLeft = (props: CategoryLeftProps) => {
  const [data, setData] = useState<CategoryItemProp[]>(props?.data || []);
  const onSelect = (item: CategoryItemProp, _index: number) => () => {
    let list = [...data];
    list.forEach(e => {
      if (e.id == item.id) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    props?.onSelected && props?.onSelected(item);
    setData(list);
  };
  useEffect(() => {
    if (props?.data?.length) {
      let list = [...props.data];
      list = JSON.parse(JSON.stringify(list));
      list[0].isSelected = true;
      setData(list);
      props.onSelected(list[0]);
    }
  }, [props?.data]);
  const renderItem: ListRenderItem<CategoryItemProp> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={onSelect(item, index)}
        style={[
          {
            paddingHorizontal: 15,
            paddingTop: 15,
          },
        ]}>
        <View style={[Theme.center, styles.bottomLine]}>
          <Image
            source={
              item.image
                ? {uri: item.image}
                : item?.isSelected
                ? images.ic_bag_active
                : images.ic_bag_normal
            }
            style={{height: 25, width: 25}}
          />
          <Text
            size={12}
            lineHeight={18}
            medium
            marginTop={10}
            color={item?.isSelected ? colors.text : colors.gray}>
            {item.name}
          </Text>
        </View>
        {!!item?.isSelected && <View style={styles.triangle} />}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{backgroundColor: colors.lightGray}}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default CategoryLeft;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  bottomLine: {
    borderBottomColor: colors.White,
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: 15,
  },
  container: {},
});
