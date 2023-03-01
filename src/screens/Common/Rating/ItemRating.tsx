import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Rating} from 'react-native-ratings';
import colors from 'res/colors';
import {RatingType} from 'res/type/Rating';
import scale from 'utils/scale';

interface ItemRatingProps {
  item: RatingType;
  index: number;
}

const ItemRating = ({item, index}: ItemRatingProps) => {
  return (
    <View style={styles.containerItem}>
      <Text color={colors.text} semiBold>
        {item.displayName}
      </Text>
      <View
        style={{
          alignItems: 'flex-start',
          marginTop: 10,
        }}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          readonly={true}
          startingValue={item.rating}
          style={{paddingLeft: 0, marginLeft: 0}}
        />
      </View>
      <Text color={colors.text} marginTop={5} marginBottom={5}>
        {item.message}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.images?.map((e, i) => {
          return (
            <Image
              key={i}
              source={{uri: e}}
              isPreview
              data={item.images?.map(e => ({uri: e}))}
              index={index}
              style={{height: scale(100), width: scale(100), borderRadius: 6}}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ItemRating;

const styles = StyleSheet.create({
  containerItem: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 15,
    marginTop: 10,
  },
  container: {},
});
