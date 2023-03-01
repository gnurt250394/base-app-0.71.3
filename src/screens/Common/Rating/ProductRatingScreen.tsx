import useRating from 'apollo/logic/rating/useRating';
import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import colors from 'res/colors';
import {RatingType} from 'res/type/Rating';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';
import {Rating, AirbnbRating} from 'react-native-ratings';
import ButtonText from 'elements/Buttons/ButtonText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import {MainParamList} from 'navigation/service/NavigationParams';
import ItemRating from './ItemRating';
interface ProductRatingScreenProps {
  productId: string;
}

const ProductRatingScreen = (props: ProductRatingScreenProps) => {
  const {data} = useRating(props.productId);
  const navigation = useNavigation<NavigationProp<MainParamList>>();
  const _renderProductRating: ListRenderItem<RatingType> = ({item, index}) => {
    return <ItemRating item={item} index={index} />;
  };
  const onDetailRating = () => {
    navigation.navigate(Routes.ListRatingScreen, {
      productId: props.productId,
    });
  };
  if (!data?.productRatings?.result?.docs?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text
        size={18}
        semiBold
        lineHeight={28}
        color={colors.text}
        marginLeft={15}
        marginTop={16}>
        Đánh giá
      </Text>
      <FlatList
        data={data?.productRatings.result.docs}
        keyExtractor={keyExtractor}
        contentContainerStyle={{paddingLeft: 15}}
        ItemSeparatorComponent={() => <View style={{width: 8}} />}
        renderItem={_renderProductRating}
      />
      <ButtonText title="Xem tất cả" onPress={onDetailRating} />
    </View>
  );
};

export default ProductRatingScreen;

const styles = StyleSheet.create({
  containerItem: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 15,
    marginTop: 10,
  },
  container: {},
});
