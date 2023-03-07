import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import {RootReducer} from 'middlewares/reducers';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import SplashScreen from 'screens/SplashScreen/SplashScreen';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.SplashScreen}>
      <Stack.Screen component={MainTab} name={Routes.MainTab} />
      <Stack.Screen component={SplashScreen} name={Routes.SplashScreen} />
    </Stack.Navigator>
  );
});

export default RootStack;
