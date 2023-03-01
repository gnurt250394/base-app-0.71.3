import {width} from 'configs/Const';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import TextAnimated from 'elements/Text/TextAnimated';
import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarItem,
  TabBarIndicator,
} from 'react-native-tab-view';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import OrderColaboratorScreen from './OrderColaboratorScreen';
interface TabOrderColaboratorProps {}

const TabOrderColaborator = (props: TabOrderColaboratorProps) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Cộng tác viên'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <OrderColaboratorScreen isWholeSale={false} />;
      case 'second':
        return <OrderColaboratorScreen isWholeSale={true} />;
      default:
        return null;
    }
  };
  return (
    <Container title={'Đơn hàng'} hideButtonRight style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        sceneContainerStyle={{
          paddingTop: 20,
        }}
        renderTabBar={props => {
          let currentIndex = props.navigationState.index;
          return (
            <View
              style={[
                Theme.flexRow,
                {
                  backgroundColor: colors.lightGray,
                  padding: 7,
                  borderRadius: 16,
                },
              ]}>
              {props.navigationState.routes.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.jumpTo(item.key)}
                    style={[{flex: 1}]}
                    key={index}>
                    <Animated.View
                      style={[
                        Theme.center,
                        currentIndex == index && {
                          backgroundColor: colors.primary,
                          borderRadius: 11,
                          // opacity,
                        },
                        {paddingVertical: 8},
                      ]}>
                      <Text
                        size={14}
                        lineHeight={24}
                        semiBold
                        color={
                          currentIndex == index ? colors.White : colors.text
                        }>
                        {item.title}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        initialLayout={{width: width}}
      />
    </Container>
  );
};

export default TabOrderColaborator;

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
});
