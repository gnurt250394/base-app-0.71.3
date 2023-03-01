import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_CONTENT_MISSIONS, GET_DETAIL_MISSIONS } from 'apollo/query/ApiCampain';
import { useEffect, useState } from 'react';
import { ContentMissionCampain, MissionCampain } from 'res/type/Campain';
import { ParamsBase, Result, SortEnum } from 'res/type/Home';

interface Response {
    getMission: {
        result: ContentMissionCampain
    }
}

interface QueryParam {
    missionClaim?: { id: string }
}
const useDetailCampain = (id: string): Result<Response> => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);

    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        QueryParam
    >(GET_DETAIL_MISSIONS, {
        variables: {
            missionClaim: {
                id
            }
        },
        notifyOnNetworkStatusChange: true,
    });




    const refresh = async () => { };
    const loadMore = () => { }
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
export default useDetailCampain