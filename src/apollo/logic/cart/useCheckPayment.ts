import {NetworkStatus, useQuery} from '@apollo/client';
import {CheckPaymentQuery, GET_ALL_CART_QUERY} from 'apollo/query/ApiCart';
import {useSelector} from 'hooks/useSelector';
import {useEffect, useState} from 'react';
import {AdOrder, CartCategoryProps, Order, Payment} from 'res/type/Cart';
import {ParamsBase, Result, SortEnum} from 'res/type/Home';

interface Props {
  categoryId: string;
}
interface Response {
  checkPayment: {
    result: Payment;
    success: boolean;
  };
}
interface QueryParam {
  payment?: {id: string};
}
const useCheckPayment = (id: string): Result<Response> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);

  const {refetch, loading, data, error, fetchMore, networkStatus} = useQuery<
    Response,
    QueryParam
  >(CheckPaymentQuery, {
    variables: {
      payment: {
        id,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = () => {};

  const refresh = async ({
    price,
    name,
  }: {price?: SortEnum; name?: SortEnum} = {}) => {};

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
export default useCheckPayment;
