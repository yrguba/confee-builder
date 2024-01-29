import { useQueryClient, UseInfiniteQueryResult, onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import useDatabase from './useDatabase';
import { appService } from '../../entities/app';

import { useEasyState } from './index';

export type CallbackProps<T> = {
    save: (data: any, entity: T) => void;
};

function useQueryWithLocalDb<T extends string[]>(cacheId: T, callback: (props: CallbackProps<T>) => UseInfiniteQueryResult) {
    const { save, get, check } = useDatabase();
    const offlineData = useEasyState(null);
    const queryClient = useQueryClient();
    const networkState = appService.getNetworkState();

    useEffect(() => {
        if (!networkState.online) {
            get(cacheId.join('')).then((e) => {
                offlineData.set(e);
            });
        }
        onlineManager.setEventListener((setOnline: any) => {
            return setOnline(networkState.online);
        });
    }, [networkState.online, cacheId]);

    useUpdateEffect(() => {
        check(cacheId.join('')).then((found) => {
            if (found) {
                queryClient.prefetchQuery(cacheId, () => get(cacheId.join('')));
            }
        });
    }, [cacheId]);

    const saveInDb = (data: JSON, cacheId: T) => save(data, cacheId.join(''));

    return offlineData.value ? { ...callback({ save: saveInDb }), data: offlineData.value } : callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
