import { useQueryClient, UseInfiniteQueryResult, onlineManager, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import useDatabase from './useDatabase';
import { appService } from '../../entities/app';

import { useEasyState } from './index';

export type CallbackProps<T> = {
    save: (data: any, cacheId: T) => void;
};

function useQueryWithLocalDb<D, T extends string[] = any>(cacheId: T, callback: (props: CallbackProps<T>) => D) {
    const { save, get, check } = useDatabase();
    const offlineData = useEasyState(null);
    const queryClient = useQueryClient();
    const networkState = appService.getNetworkState();

    const updCacheId = cacheId.join('');

    useUpdateEffect(() => {
        onlineManager.setEventListener((setOnline: any) => {
            return setOnline(networkState.online);
        });
    }, [networkState.online]);

    useEffect(() => {
        if (!networkState.online) {
            get(cacheId.join('')).then((e) => {
                offlineData.set(e);
            });
        } else {
            check(cacheId.join('')).then((found) => {
                if (found) {
                    queryClient.prefetchQuery(cacheId, () => get(updCacheId));
                }
            });
        }
    }, [updCacheId]);

    const saveInDb = (data: JSON, cacheId: T) => save(data, updCacheId);

    return offlineData.value ? { ...callback({ save: saveInDb }), data: offlineData.value } : callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
