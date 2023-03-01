import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_LIST_CUSTOMER } from 'apollo/query/ApiCustomer';
import { useSelector } from 'hooks/useSelector';
import { useEffect, useState } from 'react';
import { AdOrder, Order } from 'res/type/Cart';
import { UserCustomerPaginate } from 'res/type/Customer';
import { ParamsBase, Result, SortEnum } from 'res/type/Home';

interface Props {
    categoryId: string
}
interface Response {
    getUserCustomers: {
        result: {
            docs: UserCustomerPaginate[]
            adOrder: AdOrder
            order: Order
            page?: number
            totalPage?: number
            hasNextPage?: boolean
        }
    }
}

const useGetListCustomer = (userId: string): Result<Response> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);
    const userProfile = useSelector((state) => state.userProfile);

    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        ParamsBase<any>
    >(GET_LIST_CUSTOMER, {
        variables: {
            filters: {
                query: {
                    userId: userId,
                },
            }
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
                        }
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
            currentPage * 10 === data?.getUserCustomers?.result?.docs?.length &&
            data?.getUserCustomers?.result?.hasNextPage
        ) {
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    const refresh = async ({
        price,
        name,
    }: { price?: SortEnum; name?: SortEnum } = {}) => {
        setRefreshing(true);
        if (refetch) {
            await refetch({ filters: { page: 1 } });
            setCurrentPage(1)
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
export default useGetListCustomer