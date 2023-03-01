import {useMutation, useQuery} from '@apollo/client';
import IframeRenderer from '@native-html/iframe-plugin';
import {ADD_CART_QUERY} from 'apollo/query/ApiCart';
import {
  GET_DETAIL_PRODUCT_QUERY,
  SECTIONS_QUERY,
} from 'apollo/query/ApiGetAdvertisementProducts';
import ModalAddContact from 'components/Category/ModalAddContact';
import ModalSelectTypeProduct from 'components/Category/ModalSelectTypeProduct';
import SwiperDetailCategory from 'components/Category/SwiperDetailCategory';
import ItemCategory from 'components/Home/ItemCategory';
import ItemCategoryColaborator from 'components/Home/ItemCategoryColaborator';
import Loading from 'components/Loading/Loading';
import ModalBottom from 'components/ModalBase/ModalBottom';
import {width} from 'configs/Const';
import {DataCategory} from 'configs/Data';
import Routes from 'configs/Routes';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import useModalAnimation from 'hooks/useModalAnimation';
import {onAddCartLocal} from 'middlewares/actions/cart/actionCart';
import {RootReducer} from 'middlewares/reducers';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {navigate} from 'navigation/service/RootNavigation';
import * as React from 'react';
import {useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {HotDealsItemProp} from 'res/type/Home';
import ProductRatingScreen from 'screens/Common/Rating/ProductRatingScreen';
import keyExtractor from 'utils/keyExtractor';
import {alterChildren, getPriceVoucher} from 'utils/other-utils';
import scale from 'utils/scale';

interface DetailCategoryColaboratorScreenProps {}

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
const DetailCategoryColaboratorScreen = ({
  navigation,
  route,
}: BaseNavigationProps<
  MainParamList,
  Routes.DetailCategoryColaboratorScreen
>) => {
  const [visible, open, close] = useModalAnimation();
  const [type, setType] = useState<'buy' | 'cart'>('cart');
  const [visibleSelect, openSelect, closeSelect] = useModalAnimation();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const {data: res} = useQuery(GET_DETAIL_PRODUCT_QUERY, {
    variables: {
      product: {
        slug: route.params.slug,
        populate: 'schedulers',
      },
    },
  });
  const data: HotDealsItemProp = React.useMemo(
    () => res?.getProduct?.result || {},
    [res],
  );
  const {data: relatedProducts} = useQuery(SECTIONS_QUERY, {
    variables: {
      filters: {
        query: {
          id: {$ne: data.id},
          categoryIds: data.categoryIds,
          isDel: false,
        },
        limit: 4,
        // sort: {
        //   createdAt: 'desc',
        // },
        // populate: ['schedulers'],
      },
    },
  });
  const dataRelatedProducts: HotDealsItemProp = React.useMemo(
    () => relatedProducts?.getProducts?.result.docs || [],
    [relatedProducts],
  );
  const dispatch = useDispatch();
  const [onPress, {error}] = useMutation(ADD_CART_QUERY);

  React.useEffect(() => {
    if (error?.graphQLErrors.every(e => e.code == 'UNAUTHENTICATED')) {
      navigate(Routes.LoginScreen);
    }
  }, [error]);

  const onAddCart = (attribute?: any[], amount?: number) => {
    if (userProfile?.isLogin) {
      dispatch(onAddCartLocal());
      onPress({
        variables: {
          cart: [
            {
              productId: route?.params?.item?.id,
              amount: amount || 1,
              attributes: attribute || [],
            },
          ],
        },
      });
    } else {
      navigate(Routes.LoginScreen);
    }
  };
  const onBuy = (attribute?: any[], amount?: number) => {
    console.log('-> data', data);
    if (userProfile?.isLogin) {
      // onAddCart(attribute, amount);
      navigation.navigate(Routes.PostProductScreen, {
        facebookTemplates: data?.facebookTemplates || [],
        slug: data?.slug || '',
      });
    } else {
      navigate(Routes.LoginScreen);
    }
  };
  const renderItemImageReview: ListRenderItem<string> = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        isPreview
        data={data.reviewImages?.map(e => ({uri: e}))}
        index={index}
        style={{height: scale(100), width: scale(100), borderRadius: 6}}
      />
    );
  };
  const goDetail = (item: HotDealsItemProp) => () => {
    if (userProfile?.user?.isWholeSale) {
      navigation.navigate(Routes.DetailCategoryColaboratorScreen, {
        item,
        slug: item.slug,
      });
    } else {
      navigation.navigate(Routes.DetailCategoryScreen, {item, slug: item.slug});
    }
  };
  const renderItemProduct: ListRenderItem<HotDealsItemProp> = ({item}) => {
    if (userProfile?.user?.isWholeSale) {
      return <ItemCategoryColaborator item={item} onPress={goDetail(item)} />;
    } else {
      return <ItemCategory item={item} onPress={goDetail(item)} />;
    }
  };
  if (!Object.keys(data).length) {
    return <Loading />;
  }
  const renderHeader = () => {
    return (
      <View>
        <SwiperDetailCategory data={data.images} />
        <View style={{paddingHorizontal: 15}}>
          <Text size={18} semiBold lineHeight={28} marginBottom={10}>
            {data?.name}
          </Text>
          <View style={[Theme.flexRowSpace, styles.borderEnd]}>
            {data.type == 'ADVERTISEMENT' ? (
              <ButtonText
                title={'Liên hệ đặt hàng'}
                textProps={{
                  size: 14,
                  lineHeight: 24,
                  hilight: true,
                  textDecorationLine: 'underline',
                }}
              />
            ) : (
              <View>
                <Text lineHeight={28} size={14}>
                  Giá lẻ:{' '}
                  <Text lineHeight={28} size={14}>
                    {(getPriceVoucher(data) || data.price)?.formatPrice()}đ{' '}
                  </Text>
                  {!!getPriceVoucher(data) && (
                    <Text
                      size={14}
                      textDecorationLine={'line-through'}
                      lineHeight={24}>
                      {data?.price?.formatPrice()}đ
                    </Text>
                  )}
                </Text>
                <Text semiBold color={colors.primary} size={16} lineHeight={26}>
                  Giá CTV:{' '}
                  {data?.priceWholeSale
                    ? data?.priceWholeSale?.formatPrice()
                    : 'Đang cập nhật'}
                </Text>
              </View>
            )}
            <ButtonIconHeader icon={images.ic_bookmark} />
          </View>

          <View style={styles.borderEnd}>
            <Text
              size={16}
              lineHeight={26}
              semiBold
              color={colors.text}
              marginBottom={10}>
              Giới thiệu chung
            </Text>
            <Text size={14} numberOfLines={4} lineHeight={24}>
              {data.description}
            </Text>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text semiBold size={18} lineHeight={28}>
                Mô tả sản phẩm
              </Text>
              <ButtonText
                title={'Xem đánh giá'}
                textProps={{
                  semiBold: true,
                  color: colors.text,
                  textDecorationLine: 'underline',
                  size: 13,
                  lineHeight: 20,
                }}
                onPress={() => {
                  navigation.navigate(Routes.ListRatingScreen, {
                    productId: data.id,
                  });
                }}
              />
            </View>
            {data?.moreInformation ? (
              <HTML
                renderers={renderers}
                WebView={WebView}
                alterDOMChildren={alterChildren}
                source={{
                  html: data.moreInformation,
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
        </View>
        <View>
          <Text
            size={18}
            semiBold
            lineHeight={28}
            color={colors.text}
            marginLeft={15}
            marginBottom={9}
            marginTop={16}>
            Ảnh review
          </Text>
          <FlatList
            data={data?.reviewImages}
            keyExtractor={keyExtractor}
            horizontal
            contentContainerStyle={{paddingLeft: 15}}
            ItemSeparatorComponent={() => <View style={{width: 8}} />}
            renderItem={renderItemImageReview}
          />
        </View>
        <ProductRatingScreen productId={data.id} />
        <View style={[styles.borderEnd, {marginHorizontal: 15}]} />
        <Text
          size={18}
          semiBold
          lineHeight={28}
          color={colors.text}
          marginLeft={15}
          marginBottom={9}>
          Sản phẩm liên quan
        </Text>
      </View>
    );
  };
  return (
    <Container style={styles.container}>
      <FlatList
        data={dataRelatedProducts}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{width: 8}} />}
        renderItem={renderItemProduct}
        numColumns={2}
        columnWrapperStyle={{
          paddingBottom: scale(15),
          paddingLeft: scale(15),
        }}
      />
      <View style={{paddingTop: 12}}>
        {data?.type == 'TRADING' ? (
          <View
            style={[
              Theme.flexRow,
              {
                marginBottom: getBottomSpace() + (isIphoneX() ? 0 : 10),
                paddingHorizontal: 20,
              },
            ]}>
            {!!data?.facebookTemplates?.length && (
              <ButtonIconText
                icon={images.ic_share}
                borderColor={colors.primary}
                title={'Đăng bán'}
                onPress={() => {
                  onBuy();
                }}
                textProps={{
                  marginLeft: 11,
                  size: 13,
                  lineHeight: 26,
                  semiBold: true,
                }}
              />
            )}
            <ButtonIconText
              icon={images.ic_add_cart}
              backgroundColor={colors.primary}
              title={'Thêm vào giỏ hàng'}
              onPress={() => {
                if (data.attributes?.length) {
                  openSelect();
                  setType('cart');
                } else {
                  onAddCart();
                }
              }}
              style={{marginLeft: 10, flex: 1}}
              titleColor={colors.White}
              textProps={{
                marginLeft: 11,
                size: 13,
                lineHeight: 26,
                semiBold: true,
              }}
            />
          </View>
        ) : data?.type == 'ADVERTISEMENT' ? (
          <ButtonIconText
            style={{marginBottom: getBottomSpace(), marginHorizontal: 20}}
            backgroundColor={colors.primary}
            title={'Liên hệ'}
            onPress={open}
            titleColor={colors.White}
            textProps={{
              marginLeft: 11,
              size: 16,
              lineHeight: 26,
              semiBold: true,
            }}
          />
        ) : null}
      </View>
      <ModalBottom isVisibleModal={visible} scrollEnabled onCloseModal={close}>
        <ModalAddContact close={close} product={data} />
      </ModalBottom>
      <ModalBottom
        isVisibleModal={visibleSelect}
        scrollEnabled
        onCloseModal={closeSelect}>
        <ModalSelectTypeProduct
          close={closeSelect}
          product={data}
          type={type}
          onSubmit={(arr, amount, type) => {
            if (type == 'buy') {
              onBuy(arr, amount);
            } else {
              onAddCart(arr, amount);
            }
          }}
        />
      </ModalBottom>
    </Container>
  );
};

export default DetailCategoryColaboratorScreen;

const styles = StyleSheet.create({
  rowDetail: {alignItems: 'flex-start', paddingBottom: 6},
  borderEnd: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 22,
    marginBottom: 20,
  },
  container: {},
});
