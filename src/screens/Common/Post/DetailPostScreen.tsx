import {useQuery} from '@apollo/client';
import {GET_DETAIL_POST_QUERY} from 'apollo/query/ApiPost';
import {Routes} from 'configs';
import {width} from 'configs/Const';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Blog} from 'res/type/Post';
import IframeRenderer from '@native-html/iframe-plugin';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import Theme from 'res/style/Theme';
import moment from 'moment';
import colors from 'res/colors';
const renderers = {
  iframe: IframeRenderer,
};
const tagsStyles = {
  iframe: {
    opacity: 0.99,
  },
  // If you are using @native-html/table-plugin
  table: {
    opacity: 0.99,
  },
};
interface DetailPostScreenProps {}

const DetailPostScreen = (
  props: BaseNavigationProps<MainParamList, Routes.DetailPostScreen>,
) => {
  const [detailBlog, setDetailBlog] = useState<Blog>({});
  const {data} = useQuery(GET_DETAIL_POST_QUERY, {
    variables: {
      blog: {
        slug: props.route.params?.item?.slug,
      },
    },
  });
  React.useEffect(() => {
    if (data?.getBlog?.result) {
      setDetailBlog(data?.getBlog?.result);
    }
  }, [data]);
  console.log('data: ', data);
  function hasOnlyBrChildren(node: any) {
    return node.children.every(
      (child: any) => child.type === 'text' && child.data === 'Froala Editor',
    );
  }
  function alterChildren(node: any) {
    return node.children.filter(
      (child: any) =>
        !(child.type == 'text' && child.data == 'Powered by ') &&
        !(child.name === 'a' && hasOnlyBrChildren(child)),
    );
  }
  return (
    <Container hideButtonRight style={styles.container}>
      {!!Object.keys(detailBlog).length && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: detailBlog.image}}
            style={{width: '100%', height: 200}}
          />
          <Text
            size={18}
            bold
            lineHeight={28}
            marginTop={10}
            color={colors.text}>
            {detailBlog?.name}
          </Text>
          <Text size={12} color={colors.gray} marginTop={12} marginBottom={16}>
            {new Date(detailBlog?.updatedAt || '').format('dd/MM/yyyy')}
          </Text>
          <View style={Theme.flex1}>
            {detailBlog?.content && (
              <HTML
                renderers={renderers}
                WebView={WebView}
                alterDOMChildren={alterChildren}
                source={{
                  html: detailBlog?.content,
                }}
                ignoredStyles={['width']}
                contentWidth={width - 20}
                defaultWebViewProps={{}}
                renderersProps={{
                  iframe: {
                    scalesPageToFit: false,
                    webViewProps: {
                      allowsFullScreen: true,
                    },
                  },
                }}
                tagsStyles={tagsStyles}
              />
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
