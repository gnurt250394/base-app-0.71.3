import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Text from 'elements/Text';
import {onAddCountCart} from 'middlewares/actions/cart/actionCart';
import {RootReducer} from 'middlewares/reducers';
import {navigate} from 'navigation/service/RootNavigation';
import React, {useEffect} from 'react';
import {ImageSourcePropType, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';

export interface HeaderBaseProps {
  title?: string;
  hideBackButton?: boolean;
  onBack?: () => void;
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
  iconLeft?: ImageSourcePropType;
  hideButtonRight?: boolean;
  titleStyle?: StyleProp<ViewStyle>;
}
const HeaderBase = ({
  title,
  hideBackButton,
  onBack,
  buttonRight,
  buttonLeft,
  iconLeft,
  hideButtonRight,
  titleStyle,
}: HeaderBaseProps) => {
  const router = useNavigation();
  const cart = useSelector((state: RootReducer) => state.cart);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = router.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [router]);

  const onPressBack = () => (onBack ? onBack() : router.goBack());
  const onSearchCategory = () => router.navigate(Routes.SearchCategoryScreen);
  const onCart = () => {
    if (userProfile?.isLogin) {
      router.navigate(Routes.CartScreen);
    } else {
      navigate(Routes.LoginScreen);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          {hideBackButton ? null : buttonLeft ? (
            buttonLeft
          ) : (
            <ButtonIconHeader
              onPress={onPressBack}
              icon={iconLeft ? iconLeft : images.ic_back}
              isLeft
            />
          )}
        </View>
        <View style={[styles.containerTitle, titleStyle]}>
          <Text semiBold size={17} lineHeight={28}>
            {title}
          </Text>
        </View>
        {buttonRight ? (
          buttonRight
        ) : hideButtonRight ? null : (
          <View style={[Theme.flexRowSpaceAround]}>
            <ButtonIconHeader
              icon={images.ic_search}
              onPress={onSearchCategory}
            />
            <ButtonIconHeader
              icon={images.ic_cart}
              count={cart?.adOrderCount}
              marginLeft={10}
              marginRight={10}
              onPress={onCart}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HeaderBase;

const styles = StyleSheet.create({
  buttonHeader: {},
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {flex: 1},
  txtTitle: {
    fontSize: sizes._14sdp,
    color: colors.White,
    fontWeight: 'bold',
  },
  containerTitle: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  iconBack: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(10),
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
    paddingHorizontal: scale(16),
  },
  container: {
    backgroundColor: colors.White,
    paddingTop: sizes._statusbar_height + 15,
  },
});
