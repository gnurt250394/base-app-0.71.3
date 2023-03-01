import { ParamListBase, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainParamList } from './service/NavigationParams';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface BaseNavigationProps<
  P extends ParamListBase,
  R extends keyof ParamListBase = string
  > {
  navigation: StackNavigationProp<P, R>;
  route: RouteProp<P, R>;
}

export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
  ? { screen: K; params?: ParamList[K] }
  : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type BaseRouteProps<RouteName extends keyof MainParamList> = RouteProp<
  MainParamList,
  RouteName
>;

export type BaseUseNavigationProps<P extends ParamListBase,
  R extends keyof ParamListBase = string> = CompositeNavigationProp<
    BottomTabNavigationProp<P, R>,
    StackNavigationProp<P, R>
  >;