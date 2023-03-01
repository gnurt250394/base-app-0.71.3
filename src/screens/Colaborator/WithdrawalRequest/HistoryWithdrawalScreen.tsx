import {useQuery} from '@apollo/client';
import {GET_REQUEST_WALLET} from 'apollo/query/ApiWallet';
import Text from 'elements/Text';
import {RootReducer} from 'middlewares/reducers';
import moment from 'moment';
import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {WithdrawalRequest} from 'res/type/Wallet';
import {formatData} from 'utils/array-utils';
import keyExtractor from 'utils/keyExtractor';
import {getColor} from 'utils/other-utils';
import ItemHistoryWithDrawal from './ItemHistoryWithDrawal';

interface HistoryWithdrawalScreenProps {}

const HistoryWithdrawalScreen = (props: HistoryWithdrawalScreenProps) => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<WithdrawalRequest[]>([]);
  const {data: listWallet, refetch} = useQuery(GET_REQUEST_WALLET, {
    variables: {
      filters: {
        page: page,
        limit: 10,
        query: {
          userId: userProfile?.user?.id,
        },
        sort: {
          createdAt: 'desc',
        },
      },
    },
    onCompleted: data => {
      setRefreshing(false);
      setData(
        formatData(data?.getWithdrawalRequests?.result?.docs || [], page),
      );
    },
  });
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    refetch();
  };
  const _renderItem: ListRenderItem<WithdrawalRequest> = ({item, index}) => {
    return <ItemHistoryWithDrawal item={item} />;
  };
  const onLoadMore = () => {
    if (
      listWallet?.getWithdrawalRequests?.result?.totalDocs >=
      listWallet?.getWithdrawalRequests?.result?.page *
        listWallet?.getWithdrawalRequests?.result?.limit
    ) {
      setPage(page => page + 1);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HistoryWithdrawalScreen;

const styles = StyleSheet.create({
  container: {},
});
