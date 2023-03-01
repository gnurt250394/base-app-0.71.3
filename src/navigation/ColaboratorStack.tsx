import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import React, {memo} from 'react';
import InfoAccountColaboratorScreen from 'screens/Colaborator/Account/InfoAccountColaboratorScreen';
import CartColaboratorScreen from 'screens/Colaborator/Cart/CartColaboratorScreen';
import DetailCategoryColaboratorScreen from 'screens/Colaborator/Category/DetailCategoryColaboratorScreen';
import ListCustomerScreen from 'screens/Colaborator/Customer/ListCustomerScreen';
import DetailOrderColaboratorScreen from 'screens/Colaborator/Order/DetailOrderColaboratorScreen';
import OrderColaboratorScreen from 'screens/Colaborator/Order/OrderColaboratorScreen';
import TabOrderColaborator from 'screens/Colaborator/Order/TabOrderColaborator';
import CategoryChildrenScreen from 'screens/Common/Category/CategoryChildrenScreen';
import DetailSearchCategoryScreen from 'screens/Common/home/DetailSearchCategoryScreen';
import SearchCategoryScreen from 'screens/Common/home/SearchCategoryScreen';

const Stack = createStackNavigator();

const ColaboratorStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={TabOrderColaborator} name={Routes.OrderScreen} />
      <Stack.Screen
        component={CartColaboratorScreen}
        name={Routes.CartColaboratorScreen}
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
        name={Routes.InfoAccountColaboratorScreen}
      />

      <Stack.Screen
        component={DetailCategoryColaboratorScreen}
        name={Routes.DetailCategoryColaboratorScreen}
      />
      <Stack.Screen
        component={ListCustomerScreen}
        name={Routes.ListCustomerScreen}
      />
    </Stack.Navigator>
  );
});

export default ColaboratorStack;
