// In App.js in a new project

import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LinkingConfiguration from 'navigation/service/LinkingConfiguration';
import * as React from 'react';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {AuthReducer} from 'middlewares/reducers/auth/loginReducer';
import RootStack from './RootStack';
import {isReadyRef, navigationRef} from './service/RootNavigation';

const Stack = createStackNavigator();

// Define multiple groups of screens in objects like this

function RootApp() {
  const userProfile: AuthReducer = useSelector(
    (state: any) => state.userProfile,
  );
  // const result = React.useMemo(
  //   () => (userProfile.position == 'user' ? UserData : PartnerData),
  //   [userProfile.position],
  // );
  // console.log('result: ', result);

  useReduxDevToolsExtension(navigationRef);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      onReady={() => {
        isReadyRef.current = true;
      }}
      // onStateChange={(state) => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = getActiveRouteName(state);

      //   if (previousRouteName !== currentRouteName) {
      //     analytics().setCurrentScreen(currentRouteName, currentRouteName);
      //   }
      // }}
      ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}

export default RootApp;
