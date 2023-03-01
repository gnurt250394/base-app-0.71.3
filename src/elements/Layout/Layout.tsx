import React from 'react';
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
  StyleProp,
} from 'react-native';
import {useTheme} from 'configs/ChangeTheme';
import Theme from 'res/style/Theme';

interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: StyleProp<ViewStyle>;
}

const Layout = ({children, style}: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultView
      style={[
        {backgroundColor: theme.backgroundItem},
        style,
        {...Theme.shadow},
      ]}>
      {children}
    </DefaultView>
  );
};
export default Layout;
