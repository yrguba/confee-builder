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

    const queryClient = useQueryClient();

    const updCacheId = cacheId.join('');

    // useEffect(() => {
    //     check(updCacheId).then((found) => {
    //         if (found) {
    //             queryClient.prefetchQuery(cacheId, () => get(updCacheId));
    //         }
    //     });
    // }, [updCacheId]);

    // const saveInDb = (data: JSON, cacheId: T) => save(data, updCacheId);
    const saveInDb = () => '';

    return callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
