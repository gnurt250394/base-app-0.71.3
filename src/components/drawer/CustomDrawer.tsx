import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from 'res/colors';
import Animated from 'react-native-reanimated';
import ExpandableViewSeparate from './ExpandableViewSeparate';
import images from 'res/images';
import sizes from 'res/sizes';
import {useDispatch, useSelector} from 'react-redux';
import {onSelectPosition} from 'middlewares/actions/auth/actionLogin';
import {AuthReducer} from 'middlewares/reducers/auth/loginReducer';
import TextBase from 'components/text/TextBase';
import ButtonBase from 'components/button/ButtonBase';
import {ROLE, RoleType} from '../../common/Constants';
import {Routes} from 'configs';
// import DrawerItemList from './DrawerItemList';

const CustomDrawer = ({progress, ...props}: DrawerContentComponentProps) => {
  console.log('props: ', props);
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
  const userProfile: AuthReducer = useSelector(
    (state: any) => state.userProfile,
  );
  const dispatch = useDispatch();
  const onLogout = () => {
    // dispatch(logout());
    props.navigation.closeDrawer();
  };
  const onLogin = () => {
    // props.navigation.navigate(Routes.LoginScreen, {typeScreen: 'login'});
  };
  const switchPosition = async () => {
    // if (userProfile?.isLogin) await dispatch(logout());
    if (userProfile.position == ROLE.user) {
      dispatch(onSelectPosition(ROLE.partner));
    } else {
      dispatch(onSelectPosition(ROLE.user));
    }
    // CodePush.restartApp();
  };
  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{transform: [{translateX}]}}>
        <View style={styles.containerProfile}>
          <Image
            source={
              userProfile?.user?.avatar
                ? {uri: userProfile.user.avatar.absoluteUrl()}
                : images.ic_user
            }
            style={styles.imageAvatar}
          />
          {userProfile.isLogin ? (
            <TextBase
              text={userProfile?.user?.name || userProfile?.user?.phone}
              style={styles.txtName}
            />
          ) : (
            <ButtonBase
              onPress={onLogin}
              text={'Đăng nhập/ Đăng ký'}
              style={{paddingTop: sizes._15sdp}}
            />
          )}
        </View>
        <ExpandableViewSeparate {...props} />
        {/* <DrawerItem
          {...props}
          label={
            userProfile.position == ROLE.user ? 'Nhà tuyển dụng' : 'Ứng viên'
          }
          onPress={switchPosition}
          icon={({color, focused, size}) => (
            <Image
              source={images.ic_switch}
              style={[styles.icon, {tintColor: colors.default}]}
            />
          )}
        /> */}
        {/* {userProfile?.isLogin ? (
          <DrawerItem
            {...props}
            label="Đăng xuất"
            onPress={onLogout}
            icon={({color, focused, size}) => (
              <Image
                source={images.ic_logout}
                style={[styles.icon, {tintColor: colors.default}]}
              />
            )}
          />
        ) : null} */}
      </Animated.View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  imageAvatar: {
    height: sizes._50sdp,
    width: sizes._50sdp,
    borderRadius: sizes._25sdp,
  },
  containerProfile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtName: {
    color: colors.White,
    fontSize: sizes._16sdp,
    fontWeight: '600',
    paddingTop: sizes._15sdp,
  },
  icon: {
    height: sizes._20sdp,
    width: sizes._20sdp,
    resizeMode: 'contain',
  },
  container: {},
});
