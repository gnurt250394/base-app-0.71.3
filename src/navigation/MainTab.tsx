import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from 'configs';
import {RootReducer} from 'middlewares/reducers';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import scale from 'utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome'
import CategoriesScreen from "screens/categories/CategoriesScreen";
import AccountScreen from "screens/account/AccountScreen";
import HomeScreen from "screens/home/HomeScreen";
import EmployeeScreen from "screens/employee/EmployeeScreen";

const Tab = createBottomTabNavigator();
const MainTab = memo(() => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const renderLabel = (routeName: string) => {
    switch (routeName) {
      case Routes.HomeScreen:
        return 'Trang chủ';
      case Routes.CategoryScreen:
        return 'Danh mục';
      case Routes.NotificationScreen:
        return 'Thông báo';
      case Routes.AccountScreen:
        return 'Cá nhân';
      case Routes.EmployeeScreen:
        return 'Nhân viên';

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
            let iconName='';

            switch (route.name) {
              case Routes.HomeScreen:
                iconName =  'home'
                break;
              case Routes.CategoryScreen:
                iconName = 'legal';
                break;
              case Routes.EmployeeScreen:
                iconName = 'users';
                break;
              case Routes.AccountScreen:
                iconName = 'user';
                break;

              default:
                break;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={20} color={focused? colors.primary:colors.gray}/>;
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
        <Tab.Screen name={Routes.HomeScreen} component={HomeScreen} />
        <Tab.Screen name={Routes.CategoryScreen} component={CategoriesScreen} />
        <Tab.Screen name={Routes.EmployeeScreen} component={EmployeeScreen} />
        <Tab.Screen name={Routes.AccountScreen} component={AccountScreen} />
      </Tab.Navigator>
    </View>
  );
});

export default MainTab;
