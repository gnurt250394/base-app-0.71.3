import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_CONTENT_MISSIONS, GET_STATUS_MISSIONS } from 'apollo/query/ApiCampain';
import { useSelector } from 'hooks/useSelector';
import { useEffect, useState } from 'react';
import { ContentMissionCampain, MissionCampain, MissionClaims } from 'res/type/Campain';
import { ParamsBase, Result, SortEnum } from 'res/type/Home';

interface Response {
    getMissionClaims: {
        result: { docs: MissionClaims[] }
    }
}

interface QueryParam {
    mission?: { id: string }
}
const useContentCampain = (id: string[]): Result<Response> => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);

    const userProfile = useSelector(e => e.userProfile)
    const { refetch, loading, data, error, fetchMore, networkStatus } = useQuery<
        Response,
        ParamsBase<any>
    >(GET_STATUS_MISSIONS, {
        variables: {
            filters: {
                query: {
                    missionId: {
                        $in: id
                    },
                    userId: userProfile?.user?.id
                },
                pagination: false
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
export default useContentCampain