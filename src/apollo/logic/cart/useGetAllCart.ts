import {NetworkStatus, useQuery} from '@apollo/client';
import {GET_ALL_CART_QUERY} from 'apollo/query/ApiCart';
import {useSelector} from 'hooks/useSelector';
import {useEffect, useState} from 'react';
import {AdOrder, CartCategoryProps, Order} from 'res/type/Cart';
import {ParamsBase, Result, SortEnum} from 'res/type/Home';

interface Props {
  categoryId: string;
}
interface Response {
  getAllCart: {
    result: {
      docs: CartCategoryProps[];
      adOrder: AdOrder;
      order: Order;
      page?: number;
      totalPage?: number;
      hasNextPage?: boolean;
    };
  };
}

const useGetAllCart = (): Result<Response> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const userProfile = useSelector(state => state.userProfile);

  const {refetch, loading, data, error, fetchMore, networkStatus} = useQuery<
    Response,
    ParamsBase<any>
  >(GET_ALL_CART_QUERY, {
    variables: {
      filters: {
        pagination: false,
        sort: {
          createdAt: SortEnum.DESC,
        },

        populate: ['product', 'schedulers'],
      },
    },
    notifyOnNetworkStatusChange: true,
  });

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
      currentPage * 10 === data?.getAllCart?.result?.docs?.length &&
      data?.getAllCart?.result?.hasNextPage
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
      await refetch({filters: {page: 1}});
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
export default useGetAllCart;
