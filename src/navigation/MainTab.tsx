import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from 'configs';
import Image from 'elements/Image';
import {RootReducer} from 'middlewares/reducers';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import scale from 'utils/scale';
import HomeStack from './HomeStack';

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
      </Tab.Navigator>
    </View>
  );
});

export default MainTab;
