import {useEffect, useRef, useState} from 'react';
import {NetworkStatus, useQuery} from '@apollo/client';
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
import {GET_RATING} from 'apollo/query/ApiRating';
import {RatingType} from 'res/type/Rating';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  categoryId: string;
}

interface Response {
  productRatings: {
    result: {
      docs: RatingType[];
      page?: number;
      totalPage?: number;
      hasNextPage?: boolean;
    };
  };
}

const useRating = (productId?: string, orderId?: string): Result<Response> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const userProfile = useSelector(state => state.userProfile);

  const {refetch, loading, data, error, fetchMore, networkStatus} = useQuery<
    Response,
    ParamsBase<any>
  >(GET_RATING, {
    variables: {
      filters: {
        query: {
          productId: productId,
          orderId: orderId,
          isDel: false,
        },
        limit: 4,
        page: currentPage,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('-> isFocused', isFocused);
    if (isFocused) {
      refresh();
    }
    // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
  }, [isFocused]);
  useEffect(() => {
    async function f() {
      if (!loading && currentPage !== 1) {
        setLoadMore(true);
        await fetchMore({
          variables: {
            filters: {
              page: currentPage,
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
      currentPage * 10 === data?.productRatings?.result?.docs?.length &&
      data?.productRatings?.result?.hasNextPage
    ) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const refresh = async ({
    price,
    name,
  }: {price?: SortEnum; name?: SortEnum} = {}) => {
    setRefreshing(true);
    if (refetch) {
      await refetch({
        filters: {
          query: {
            productId: productId,
            orderId: orderId,
            isDel: false,
          },
          limit: 4,
          page: 1,
        },
      });
      setCurrentPage(1);
      if (networkStatus === NetworkStatus.ready) {
        setRefreshing(false);
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
export default useRating;
