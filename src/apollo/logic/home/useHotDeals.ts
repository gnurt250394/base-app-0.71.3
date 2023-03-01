import { useEffect, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { HotDealsItemProp, ParamsBase, Result, SortEnum } from 'res/type/Home';
import { SECTIONS_QUERY } from 'apollo/query/ApiGetAdvertisementProducts';
import { useSelector } from 'hooks/useSelector';
import { RootReducer } from 'middlewares/reducers';

interface Props {
    categoryId: string
}
interface Response {
    getProducts: {
        result: {
            docs: HotDealsItemProp[]
            page?: number
            totalPage?: number
            hasNextPage?: boolean
        }
    }
}

interface QueryParam {
    forWholeSale?: boolean
    forSale?: boolean
    availableForShopping: boolean
    isDel: boolean
}
const useHotDeals = (): Result<Response> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);
    const userProfile = useSelector((state) => state.userProfile);
    let query: QueryParam = {
        availableForShopping: true,
        isDel: false,
    };

    if (userProfile?.user?.isWholeSale || false) {
        query.forWholeSale = userProfile?.user?.isWholeSale;
    } else {
        query.forSale = !userProfile?.user?.isWholeSale;
    }
    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        ParamsBase<any>
    >(SECTIONS_QUERY, {

        variables: {
            filters: {
                page: currentPage,
                query: query,
                limit: 10,
                sort: {
                    createdAt: SortEnum.DESC,
                },
                populate: ['schedulers'],
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
                        currentPage: currentPage,
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
            currentPage * 10 === data?.getProducts?.result?.docs?.length &&
            data?.getProducts?.result?.hasNextPage
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
            await refetch();
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
export default useHotDeals