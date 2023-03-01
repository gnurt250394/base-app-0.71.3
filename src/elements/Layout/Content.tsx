import React from 'react';
import {
  ScrollView as DefaultScrollView,
  ViewStyle,
  PressableStateCallbackType,
  ScrollViewProps,
  ColorValue,
  StyleProp,
} from 'react-native';
import {useTheme} from 'configs/ChangeTheme';

interface Props extends ScrollViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: StyleProp<ViewStyle>;
  contentStyle?: ViewStyle;
  backgroundColor?: ColorValue | string;
}

const Content = (props: Props) => {
  console.log('props: ', props);
  const {theme} = useTheme();
  return (
    <DefaultScrollView
      bounces
      style={[
        {backgroundColor: props.backgroundColor || theme.background},
        props.style,
      ]}
      {...props}>
      {props.children}
    </DefaultScrollView>
  );
};
export default Content;
