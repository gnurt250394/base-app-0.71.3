import {useQuery} from '@apollo/client';
import {GET_LIST_POST_QUERY} from 'apollo/query/ApiPost';
import {Routes} from 'configs';
import {width} from 'configs/Const';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {Blog} from 'res/type/Post';
import {formatData} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';

interface ListPotsScreenProps {}
const ListPostScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [listPost, setListPost] = useState<Blog[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const getParam = () => {
    let param = {
      page: page,
      sort: {
        createdAt: 'desc',
      },
    };
    if (text) {
      param.query = {
        name: {
          $regex: '.' + text + '.',
          $options: 'i',
        },
      };
    }

    return param;
  };
  const {data} = useQuery(GET_LIST_POST_QUERY, {
    variables: {
      filters: getParam(),
    },
  });
  useEffect(() => {
    let timeout = setTimeout(() => {
      setText(keyword);
    }, 500);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [keyword]);
  useEffect(() => {
    if (data?.getBlogs?.success) {
      setListPost(formatData(data?.getBlogs?.result?.docs || [], page));
    }
  }, [data]);
  console.log('data: ', data);
  const goToDetail = (item: Blog) => () => {
    props.navigation.navigate(Routes.DetailPostScreen, {item});
  };
  const onLoadMore = () => {
    if (
      data?.getBlogs?.result?.totalDocs >=
      data?.getBlogs?.result?.page * data?.getBlogs?.result?.limit
    ) {
      setPage(page => page + 1);
    }
  };
  const _renderItem: ListRenderItem<Blog> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={goToDetail(item)}
        style={[
          Theme.flexRow,
          {alignItems: 'flex-start', marginBottom: scale(12)},
        ]}>
        <Image
          source={{uri: item.image}}
          style={{height: scale(111), width: scale(164), borderRadius: 2}}
        />
        <View
          style={{
            paddingLeft: scale(14),
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <Text size={14} numberOfLines={4} semiBold lineHeight={24}>
              {item?.name}
            </Text>
          </View>
          <Text color={colors.gray} size={12} lineHeight={18}>
            {new Date(item.updatedAt).format('dd/MM/yyyy')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onnSearch = (text: string) => {
    setPage(1);
    setKeyword(text);
  };
  return (
    <Container translucent={false} hideHeader style={styles.container}>
      <Text semiBold size={18} lineHeight={28} marginBottom={10}>
        Bài viết
      </Text>
      <View style={{flex: 1}}>
        <TextInput
          isShowIconLeft={true}
          onChangeText={onnSearch}
          value={keyword}
          editable
          iconLeft={<Image source={images.ic_search_category} />}
          placeholder="Tìm kiếm..."
        />
      </View>
      <View style={{flex: 10}}>
        <FlatList
          data={listPost}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.6}
        />
      </View>
    </Container>
  );
};

export default ListPostScreen;

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    flex: 1,
  },
});
