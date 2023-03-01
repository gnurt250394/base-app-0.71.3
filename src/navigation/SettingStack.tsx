import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import AccountScreen from 'screens/Common/Account/AccountScreen';

const Stack = createStackNavigator();

const SettingStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.AccountStack}
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default SettingStack;
