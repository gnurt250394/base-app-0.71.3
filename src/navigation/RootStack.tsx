import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import {RootReducer} from 'middlewares/reducers';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import InfoAccountColaboratorScreen from 'screens/Colaborator/Account/InfoAccountColaboratorScreen';
import DetailCampainScreen from 'screens/Colaborator/Campaign/DetailCampainScreen';
import ListCampaignScreen from 'screens/Colaborator/Campaign/ListCampaignScreen';
import CartColaboratorScreen from 'screens/Colaborator/Cart/CartColaboratorScreen';
import DetailCategoryColaboratorScreen from 'screens/Colaborator/Category/DetailCategoryColaboratorScreen';
import ListCustomerScreen from 'screens/Colaborator/Customer/ListCustomerScreen';
import DetailOrderColaboratorScreen from 'screens/Colaborator/Order/DetailOrderColaboratorScreen';
import OrderColaboratorScreen from 'screens/Colaborator/Order/OrderColaboratorScreen';
import TabOrderColaborator from 'screens/Colaborator/Order/TabOrderColaborator';
import WithDrawalRequestScreen from 'screens/Colaborator/WithdrawalRequest/WithDrawalRequestScreen';
import ChangePasswordOldScreen from 'screens/Common/auth/ChangePasswordOldScreen';
import ChangePasswordScreen from 'screens/Common/auth/ChangePasswordScreen';
import ForgotPasswordScreen from 'screens/Common/auth/ForgotPasswordScreen';
import LoginScreen from 'screens/Common/auth/LoginScreen';
import RegisterScreen from 'screens/Common/auth/RegisterScreen';
import VerifyCodeScreen from 'screens/Common/auth/VerifyCodeScreen';
import CategoryChildrenScreen from 'screens/Common/Category/CategoryChildrenScreen';
import DetailSearchCategoryScreen from 'screens/Common/home/DetailSearchCategoryScreen';
import HomeScreen from 'screens/Common/home/HomeScreen';
import SearchCategoryScreen from 'screens/Common/home/SearchCategoryScreen';
import ImageViewerScreen from 'screens/Common/Image/ImageViewerScreen';
import ListRatingScreen from 'screens/Common/Rating/ListRatingScreen';
import InfoAccountCustomerScreen from 'screens/Customer/Account/InfoAccountCustomerScreen';
import CartScreen from 'screens/Customer/Cart/CartScreen';
import DetailCategoryScreen from 'screens/Customer/Category/DetailCategoryScreen';
import DetailOrderScreen from 'screens/Customer/Order/DetailOrderScreen';
import OrderScreen from 'screens/Customer/Order/OrderScreen';
import SplashScreen from 'screens/SplashScreen/SplashScreen';
import MainTab from './MainTab';
import PostProductScreen from 'screens/Colaborator/Post/PostProductScreen';
import PaymentSuccessScreen from 'screens/Common/payment/PaymentSuccessScreen';
import RatingScreen from 'screens/Common/Rating/RatingScreen';

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.SplashScreen}>
      {!userProfile?.user?.isWholeSale ? (
        <>
          <Stack.Screen component={CartScreen} name={Routes.CartScreen} />
          <Stack.Screen component={OrderScreen} name={Routes.OrderScreen} />
          <Stack.Screen
            component={DetailOrderScreen}
            name={Routes.DetailOrderScreen}
          />
          <Stack.Screen
            component={InfoAccountCustomerScreen}
            name={Routes.InfoAccountScreen}
          />
          <Stack.Screen
            component={DetailCategoryScreen}
            name={Routes.DetailCategoryScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            component={TabOrderColaborator}
            name={Routes.OrderScreen}
          />
          <Stack.Screen
            component={PostProductScreen}
            name={Routes.PostProductScreen}
          />
          <Stack.Screen
            component={WithDrawalRequestScreen}
            name={Routes.WithDrawalRequestScreen}
          />
          <Stack.Screen
            component={CartColaboratorScreen}
            name={Routes.CartScreen}
          />
          <Stack.Screen
            component={OrderColaboratorScreen}
            name={Routes.OrderColaboratorScreen}
          />
          <Stack.Screen
            component={DetailOrderColaboratorScreen}
            name={Routes.DetailOrderColaboratorScreen}
          />

          <Stack.Screen
            component={InfoAccountColaboratorScreen}
            name={Routes.InfoAccountScreen}
          />
          <Stack.Screen
            component={ListCampaignScreen}
            name={Routes.ListCampaignScreen}
          />
          <Stack.Screen
            component={DetailCampainScreen}
            name={Routes.DetailCampainScreen}
          />

          <Stack.Screen
            component={DetailCategoryColaboratorScreen}
            name={Routes.DetailCategoryColaboratorScreen}
          />
        </>
      )}
      <Stack.Screen component={MainTab} name={Routes.MainTab} />
      <Stack.Screen component={RatingScreen} name={Routes.RatingScreen} />
      <Stack.Screen
        component={PaymentSuccessScreen}
        name={Routes.PaymentSuccessScreen}
      />
      <Stack.Screen component={HomeScreen} name={Routes.HomeScreen} />
      <Stack.Screen
        component={ListRatingScreen}
        name={Routes.ListRatingScreen}
      />
      <Stack.Screen component={SplashScreen} name={Routes.SplashScreen} />
      <Stack.Screen component={LoginScreen} name={Routes.LoginScreen} />
      <Stack.Screen component={RegisterScreen} name={Routes.RegisterScreen} />
      <Stack.Screen
        component={ChangePasswordOldScreen}
        name={Routes.ChangePasswordOldScreen}
      />
      <Stack.Screen
        component={ChangePasswordScreen}
        name={Routes.ChangePasswordScreen}
      />
      <Stack.Screen
        component={VerifyCodeScreen}
        name={Routes.VerifyCodeScreen}
      />
      <Stack.Screen
        component={ForgotPasswordScreen}
        name={Routes.ForgotPasswordScreen}
      />
      <Stack.Screen
        component={ImageViewerScreen}
        name={Routes.ImageViewerScreen}
      />

      <Stack.Screen
        component={CategoryChildrenScreen}
        name={Routes.CategoryChildrenScreen}
      />
      <Stack.Screen
        component={DetailSearchCategoryScreen}
        name={Routes.DetailSearchCategoryScreen}
      />
      <Stack.Screen
        component={SearchCategoryScreen}
        name={Routes.SearchCategoryScreen}
      />
      <Stack.Screen
        component={ListCustomerScreen}
        name={Routes.ListCustomerScreen}
      />
    </Stack.Navigator>
  );
});

export default RootStack;
