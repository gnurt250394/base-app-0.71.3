import Layout from 'elements/Layout/Layout';
import Text from 'elements/Text';
import React, {memo, useCallback} from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Theme from 'res/style/Theme';

interface Props {
  tabs?: string[];
  style?: StyleProp<ViewStyle>;
  activeTintColor?: ColorValue | string;
  inactiveTintColor?: ColorValue | string;
  activeBackgroundColor?: ColorValue | string;
  inactiveBackgroundColor?: ColorValue | string;
  tabStyle?: ViewProps;
  onChangeTab?: (index: number) => void;
}

export default memo(
  ({
    tabs,
    onChangeTab,
    style,
    tabStyle,
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
  }: Props) => {
    const [tabActive, setTabActive] = React.useState<number>(0);

    const _onChangeTab = useCallback(
      (number: number) => {
        setTabActive(number);
        onChangeTab && onChangeTab(number);
      },
      [onChangeTab],
    );

    return (
      <Layout style={[styles.container, style]}>
        {tabs?.map((item, index) => {
          const backgroundColor = {
            backgroundColor:
              tabActive === index
                ? activeBackgroundColor
                : inactiveBackgroundColor,
          };

          const tintColor =
            tabActive === index ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              onPress={() => _onChangeTab(index)}
              key={index}
              style={[styles.tabStyle, tabStyle, backgroundColor]}>
              <Text
                white={tabActive === index}
                color={tintColor}
                size={13}
                lineHeight={16}
                semiBold>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Layout>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.Isabelline,
    flex: 1,
    ...Theme.flexDirection,
    justifyContent: 'space-around',
  },
  tabStyle: {
    height: 40,
    flex: 1,
    marginRight: 1,
    borderRadius: 8,
    ...Theme.center,
  },
});
