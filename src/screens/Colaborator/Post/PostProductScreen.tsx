import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Image,
  Share,
  ScrollView,
} from 'react-native';
import Container from 'elements/Layout/Container';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import {alterChildren, htmltoText} from 'utils/other-utils';
import {width} from 'configs/Const';
import IframeRenderer from '@native-html/iframe-plugin';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import Routes from 'configs/Routes';
import ButtonText from 'elements/Buttons/ButtonText';
import colors from 'res/colors';
import {FacebookTemplate} from 'res/type/Home';
import keyExtractor from 'utils/keyExtractor';
import Text from 'elements/Text';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import images from 'res/images';
import CustomMenu from 'components/Menu/CustomMenu';
import Theme from 'res/style/Theme';
import Clipboard from '@react-native-community/clipboard';
import snackbarUtils from 'utils/snackbar-utils';
import {MenuOption} from 'react-native-popup-menu';
import {getBottomSpace} from 'react-native-iphone-x-helper';

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

interface PostProductScreenProps {}

interface ListTemplateProps {
  name: string;
  content: string;
  selected: boolean;
}

const PostProductScreen = (
  props: BaseNavigationProps<MainParamList, Routes.PostProductScreen>,
) => {
  const [content, setContent] = useState('');
  const [data, setData] = useState<ListTemplateProps[]>([]);
  useEffect(() => {
    let list = [...props.route.params?.facebookTemplates];
    list.splice(0, 1, {...list[0], selected: true});
    setContent(list?.[0]?.content || '');
    setData(list);
  }, []);
  const changeContent = (item: FacebookTemplate, index: number) => () => {
    let list = props.route.params?.facebookTemplates.map((e, i) => {
      if (i == index) {
        e = {
          ...e,
          selected: true,
        };
      } else {
        e = {
          ...e,
          selected: false,
        };
      }
      return e;
    });
    setContent(item.content);
    setData(list);
  };
  const renderItem: ListRenderItem<FacebookTemplate> = ({item, index}) => {
    return (
      <ButtonText
        title={item.name}
        backgroundColor={item?.selected ? colors.primary : colors.lightGray}
        titleColor={item?.selected ? colors.White : colors.text}
        height={'auto'}
        onPress={changeContent(item, index)}
        style={styles.buttonText}
      />
    );
  };
  const onCopyContent = () => {
    let text = htmltoText(content);
    Clipboard.setString(text);
    snackbarUtils.show('Sao chép thành công', 'success');
  };
  const onShareUrl = () => {
    let url = `https://staging.orderhanquoc.com/san-pham/${props.route.params?.slug}`;
    Share.share({
      message: url,
    });
  };
  return (
    <Container>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={{
            marginBottom: 20,
          }}
          horizontal={true}
        />
        {content ? (
          <HTML
            renderers={renderers}
            WebView={WebView}
            alterDOMChildren={alterChildren}
            source={{
              html: content,
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
        ) : null}
      </View>
      <View
        style={[
          Theme.flexRowSpace,
          {
            position: 'absolute',
            bottom: getBottomSpace(),
            paddingHorizontal: 15,
          },
        ]}>
        <ButtonIcon
          style={Theme.flex1}
          marginRight={10}
          borderColor={colors.primary}
          onPress={onShareUrl}
          icon={images.ic_share}
        />
        <ButtonIcon
          style={Theme.flex1}
          marginRight={10}
          borderColor={colors.primary}
          onPress={onCopyContent}
          icon={images.ic_copy}
        />
        <ButtonIcon
          style={Theme.flex1}
          borderColor={colors.primary}
          icon={images.ic_download}
        />
      </View>
    </Container>
  );
};

export default PostProductScreen;

const styles = StyleSheet.create({
  containerMore: {
    backgroundColor: colors.lightGray,
    height: 42,
    width: 42,
    borderRadius: 22,
  },
  container: {
    padding: 10,
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 5,
  },
});
