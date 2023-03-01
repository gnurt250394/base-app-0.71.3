import useNotification from 'apollo/logic/notification/useNotification';
import Text from 'elements/Text';
import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {Notification} from 'res/type/Notification';
import keyExtractor from 'utils/keyExtractor';
import colors from 'res/colors';
import Container from 'elements/Layout/Container';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {Routes} from 'configs';
import {useSelector} from 'hooks/useSelector';

interface NotificationScreenProps {}

const NotificationScreen = (props: BaseNavigationProps<MainParamList>) => {
  const {data, loadMore, refresh, refreshing} = useNotification();
  const userProfile = useSelector(state => state.userProfile);
  console.log('-> data', data);
  const goToOrder = (id: string) => () => {
    console.log('-> id', id);
    if (userProfile.user?.isWholeSale) {
      props.navigation.navigate(Routes.DetailOrderColaboratorScreen, {
        id,
      });
    } else {
      props.navigation.navigate(Routes.DetailOrderScreen, {
        id,
      });
    }
  };
  console.log('-> props', props);
  const renderItem: ListRenderItem<Notification> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={goToOrder(item?.payload?.data?.adOrderId)}
        style={styles.containerItem}>
        <Text bold={true}>{item?.payload?.notification?.title}</Text>
        <Text mulish={true}>{item?.payload?.notification?.body}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Container title={'Thông báo'}>
      <View style={styles.container}>
        <FlatList
          data={data?.getNotifications?.result?.docs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.3}
          onEndReached={loadMore}
          onRefresh={refresh}
          refreshing={refreshing}
        />
      </View>
    </Container>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: colors.White,
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: colors.bDazzledBlue,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    elevation: 1,
  },
  container: {},
});
