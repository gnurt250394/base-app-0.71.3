import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import HomeScreen from 'screens/home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default HomeStack;
