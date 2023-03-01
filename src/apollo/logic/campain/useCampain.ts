import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_MISSIONS } from 'apollo/query/ApiCampain';
import { useSelector } from 'hooks/useSelector';
import { useEffect, useState } from 'react';
import { MissionCampain } from 'res/type/Campain';
import { HotDealsItemProp, ParamsBase, Result, SortEnum } from 'res/type/Home';

interface Props {
    categoryId: string
}
interface Response {
    missions: {
        result: {
            docs: MissionCampain[]
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
const useCampain = (): Result<Response> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);

    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        ParamsBase<any>
    >(GET_MISSIONS, {
        variables: {
            filters: {
                page: currentPage,
                limit: 10,
                sort: {
                    createdAt: SortEnum.DESC,
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
            currentPage * 10 === data?.missions?.result?.docs?.length &&
            data?.missions?.result?.hasNextPage
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
export default useCampain