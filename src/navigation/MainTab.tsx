import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from 'configs';
import Image from 'elements/Image';
import Layout from 'elements/Layout/Layout';
import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import ListPostScreen from 'screens/Common/Post/ListPostScreen';
import scale from 'utils/scale';
import CategoryStack from './CategoryStack';
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
import PostStack from './PostStack';
import {navigate} from './service/RootNavigation';
import SettingStack from './SettingStack';
const Tab = createBottomTabNavigator();
const MainTab = memo(() => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const renderLabel = (routeName: string) => {
    switch (routeName) {
      case Routes.HomeStack:
        return 'Trang chủ';
      case Routes.PostStack:
        return 'Bài viết';
      case Routes.CategoryStack:
        return 'Danh mục';
      case Routes.NotificationStack:
        return 'Thông báo';
      case Routes.AccountStack:
        return 'Cá nhân';

      default:
        return 'Trang chủ';
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.White}}>
      <Tab.Navigator
        // tabBar={(
        //   props: JSX.IntrinsicAttributes & {
        //     state: any;
        //     descriptors: any;
        //     navigation: any;
        //   },
        // ) => <MyTabBar {...props} />}
        screenOptions={({route}) => ({
          title: renderLabel(route.name),
          tabBarIcon: ({focused}) => {
            let iconName;

            switch (route.name) {
              case Routes.HomeStack:
                iconName = focused
                  ? images.ic_home_active
                  : images.ic_home_normal;
                break;
              case Routes.CategoryStack:
                iconName = focused
                  ? images.ic_category_active
                  : images.ic_category_normal;
                break;
              case Routes.NotificationStack:
                iconName = focused
                  ? images.ic_notification_normal
                  : images.ic_notification_normal;
                break;
              case Routes.PostStack:
                iconName = focused ? images.ic_post_active : images.ic_post;
                break;
              case Routes.AccountStack:
                iconName = focused
                  ? images.ic_account_active
                  : images.ic_account_normal;
                break;

              default:
                break;
            }

            // You can return any component that you like here!
            return <Image source={iconName} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          allowFontScaling: false,
          keyboardHidesTabBar: true,
          labelStyle: {fontSize: scale(12), fontFamily: 'Inter-Regular'},
          style: {
            // borderTopColor: colors.transparent,
            borderTopWidth: 0,
            borderTopLeftRadius: scale(16),
            borderTopRightRadius: scale(16),
          },
        }}
        lazy={true}>
        <Tab.Screen name={Routes.HomeStack} component={HomeStack} />
        <Tab.Screen
          name={Routes.CategoryStack}
          component={CategoryStack}
          options={{unmountOnBlur: true}}
        />

        <Tab.Screen
          name={Routes.PostStack}
          component={PostStack}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen
          name={Routes.NotificationStack}
          component={NotificationStack}
          options={{
            tabBarButton: props => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    if (userProfile?.isLogin) {
                      props.onPress();
                    } else {
                      navigate(Routes.LoginScreen);
                    }
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Routes.AccountStack}
          options={{
            tabBarButton: props => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    if (userProfile?.isLogin) {
                      props.onPress();
                    } else {
                      navigate(Routes.LoginScreen);
                    }
                  }}
                />
              );
            },
          }}
          component={SettingStack}
        />
      </Tab.Navigator>
    </View>
  );
});

const MyTabBar = memo(
  ({
    state,
    descriptors,
    navigation,
  }: {
    state: any;
    descriptors: any;
    navigation: any;
  }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    return useMemo(
      () => (
        <Layout style={styles.container}>
          {state.routes.map((route: any, index: number) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const getNameIcon = () => {
              switch (index) {
                case 0:
                  return isFocused
                    ? images.ic_home_active
                    : images.ic_home_normal;
                case 1:
                  return isFocused
                    ? images.ic_category_active
                    : images.ic_category_normal;
                case 2:
                  return isFocused
                    ? images.ic_notification_normal
                    : images.ic_notification_normal;
                case 3:
                  return isFocused
                    ? images.ic_account_active
                    : images.ic_account_normal;
                default:
                  return images.ic_home_normal;
              }
            };
            const getTabName = () => {
              switch (index) {
                case 0:
                  return 'Trang chủ';
                case 1:
                  return 'Danh mục';
                case 2:
                  return 'Thông báo';
                case 3:
                  return 'Cá nhân';
                default:
                  return 'Trang chủ';
              }
            };
            const onPress = () => {
              // const event = navigation.emit({
              //   type: 'tabPress',
              //   target: route.key,
              //   canPreventDefault: true,
              // });

              //

              if (!isFocused) {
                return navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.btn}
                key={index}
                activeOpacity={1}>
                <View style={[styles.borderButton]}>
                  <Image source={getNameIcon()} />
                  <Text color={isFocused ? colors.primary : ''} type="Label">
                    {getTabName()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Layout>
      ),
      [navigation, state, descriptors],
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 6 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    paddingTop: scale(14),
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
  },
  borderButton: {
    borderRadius: 12,
    ...Theme.center,
  },
  borderActive: {
    backgroundColor: colors.TealBlue20,
  },
});

export default MainTab;
