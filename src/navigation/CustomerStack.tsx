import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import React, {memo} from 'react';
import ListCustomerScreen from 'screens/Colaborator/Customer/ListCustomerScreen';
import CategoryChildrenScreen from 'screens/Common/Category/CategoryChildrenScreen';
import DetailSearchCategoryScreen from 'screens/Common/home/DetailSearchCategoryScreen';
import SearchCategoryScreen from 'screens/Common/home/SearchCategoryScreen';
import InfoAccountCustomerScreen from 'screens/Customer/Account/InfoAccountCustomerScreen';
import CartScreen from 'screens/Customer/Cart/CartScreen';
import DetailCategoryScreen from 'screens/Customer/Category/DetailCategoryScreen';
import DetailOrderScreen from 'screens/Customer/Order/DetailOrderScreen';
import OrderScreen from 'screens/Customer/Order/OrderScreen';

const Stack = createStackNavigator();

const CustomerStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={CartScreen} name={Routes.CartScreen} />
      <Stack.Screen component={OrderScreen} name={Routes.OrderScreen} />
      <Stack.Screen
        component={DetailOrderScreen}
        name={Routes.DetailOrderScreen}
      />
      <Stack.Screen
        component={InfoAccountCustomerScreen}
        name={Routes.InfoAccountCustomerScreen}
      />
      <Stack.Screen
        component={DetailCategoryScreen}
        name={Routes.DetailCategoryScreen}
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

export default CustomerStack;
