import { useEffect, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { CategoryItemProp, HotDealsItemProp, ParamsBase, Result, SortEnum } from 'res/type/Home';
import { SECTIONS_QUERY } from 'apollo/query/ApiGetAdvertisementProducts';
import { useSelector } from 'hooks/useSelector';
import { RootReducer } from 'middlewares/reducers';
import { BANNERS_QUERY } from 'apollo/query/ApiBanner';
import { CategoryType } from 'common/Constants';

interface Props {
    categoryId: string
}
interface Response {
    getBanners: {
        result: {
            docs: { url: string, image: string }[]
            page?: number
            totalPage?: number
            hasNextPage?: boolean
        }
    }
}

const useSwiper = (): Result<Response> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);
    const userProfile = useSelector((state) => state.userProfile);

    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        ParamsBase<any>
    >(BANNERS_QUERY, {
        variables: {
            filters: {
                query: {
                },
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
            currentPage * 10 === data?.getBanners?.result?.docs?.length &&
            data?.getBanners?.result?.hasNextPage
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
export default useSwiper