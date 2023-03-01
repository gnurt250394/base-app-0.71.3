import {useEffect, useState} from 'react';
import {InMemoryCache, NetworkStatus, useQuery} from '@apollo/client';
import {
  CategoryItemProp,
  HotDealsItemProp,
  ParamsBase,
  Result,
  SortEnum,
} from 'res/type/Home';
import {SECTIONS_QUERY} from 'apollo/query/ApiGetAdvertisementProducts';
import {useSelector} from 'hooks/useSelector';
import {RootReducer} from 'middlewares/reducers';
import {BANNERS_QUERY} from 'apollo/query/ApiBanner';
import {CategoryType} from 'common/Constants';
import {GET_LIST_NOTIFICATION} from 'apollo/query/ApiNotification';
import {Notification} from 'res/type/Notification';
import {offsetLimitPagination} from '@apollo/client/utilities';
import {ENVIRONMENT} from 'components/NotificationConfig';
import {getFirebaseTopics} from 'utils/other-utils';

interface Props {
  categoryId: string;
}

interface Response {
  getNotifications: {
    result: {
      docs: Notification[];
      page?: number;
      totalPages?: number;
      hasNextPage?: boolean;
    };
  };
}

const useNotification = (): Result<Response> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const userProfile = useSelector(state => state.userProfile);
  const enums = useSelector(state => state?.enums?.enums);

  const DEFAULT_VARS = {
    page: 1,
    limit: 10,
    sort: {createdAt: 'desc'},
    query: {
      target: enums?.NOTIFICATION_TARGET?.USER,
      userId: userProfile?.user?.id,
      topic: getFirebaseTopics({
        /**
         * forSale: true nếu user là khách lẻ,
         *
         */
        forSale: !userProfile.user?.isWholeSale,
        /**
         * forWholeSale: true nếu user là ctv,
         *
         */
        forWholeSale: userProfile.user?.isWholeSale,
      }),
    },
  };
  const {refetch, loading, data, error, fetchMore, networkStatus} = useQuery<
    Response,
    ParamsBase<any>
  >(GET_LIST_NOTIFICATION, {
    variables: {
      filters: DEFAULT_VARS,
    },
    notifyOnNetworkStatusChange: true,
  });
  console.log('-> data', data);

  useEffect(() => {
    async function f() {
      if (currentPage != 1) {
        setLoadMore(true);
        await fetchMore({
          variables: {
            filters: {
              query: {
                type: 'USER',
                userId: userProfile?.user?.id,
              },
              page: currentPage,
              limit: 10,
            },
          },
        });
        setLoadMore(false);
      }
    }

    f().then();
  }, [currentPage]);

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (
      currentPage <= data?.getNotifications?.result?.totalPages &&
      data?.getNotifications?.result?.hasNextPage
    ) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    if (refetch) {
      await refetch();
      if (networkStatus === NetworkStatus.ready) {
        setRefreshing(false);
        setCurrentPage(1);
      }
    }
  };

  return {
    data,
    networkStatus,
    loading,
    refreshing,
    isLoadMore,
    error,
    refresh,
    loadMore,
  };
};
export default useNotification;
