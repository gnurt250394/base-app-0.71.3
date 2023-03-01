import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import ListPostScreen from 'screens/Common/Post/ListPostScreen';
import DetailPostScreen from 'screens/Common/Post/DetailPostScreen';
interface PostStackProps {}

const Stack = createStackNavigator();
const PostStack = (props: PostStackProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ListPostScreen}
        component={ListPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.DetailPostScreen}
        component={DetailPostScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PostStack;

const styles = StyleSheet.create({
  container: {},
});
