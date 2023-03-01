import useRating from 'apollo/logic/rating/useRating';
import {Routes} from 'configs';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import colors from 'res/colors';
import {RatingType} from 'res/type/Rating';
import keyExtractor from 'utils/keyExtractor';
import ItemRating from './ItemRating';
import Image from 'elements/Image';
import scale from 'utils/scale';

interface ListRatingScreenProps {}

const ListRatingScreen = (
  props: BaseNavigationProps<MainParamList, Routes.ListRatingScreen>,
) => {
  const {data, loadMore, isLoadMore, refresh, refreshing} = useRating(
    props.route.params.productId,
  );
  console.log('isLoadMore: ', isLoadMore);
  const _renderProductRating: ListRenderItem<RatingType> = ({item, index}) => {
    return <ItemRating item={item} index={index} />;
  };
  const renderItemImageReview: ListRenderItem<string> = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        isPreview
        data={props?.route?.params?.dataReviews?.map(e => ({uri: e}))}
        index={index}
        style={{height: scale(100), width: scale(100), borderRadius: 6}}
      />
    );
  };
  return (
    <Container title="Đánh giá">
      <View style={styles.container}>
        <FlatList
          data={props?.route?.params?.dataReviews}
          keyExtractor={keyExtractor}
          horizontal
          contentContainerStyle={{paddingLeft: 15}}
          ItemSeparatorComponent={() => <View style={{width: 8}} />}
          renderItem={renderItemImageReview}
        />
        <FlatList
          data={data?.productRatings.result.docs}
          keyExtractor={keyExtractor}
          refreshing={refreshing}
          onRefresh={refresh}
          contentContainerStyle={{paddingLeft: 15}}
          ItemSeparatorComponent={() => <View style={{width: 8}} />}
          renderItem={_renderProductRating}
          onEndReached={loadMore}
        />
      </View>
    </Container>
  );
};

export default ListRatingScreen;

const styles = StyleSheet.create({
  container: {},
});
