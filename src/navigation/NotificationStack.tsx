import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import AccountScreen from 'screens/Common/Account/AccountScreen';
import NotificationScreen from 'screens/Common/notification/NotificationScreen';

const Stack = createStackNavigator();

const NotificationStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.NotificationStack}
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default NotificationStack;
