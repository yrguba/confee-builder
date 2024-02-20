import { useQueryClient, UseInfiniteQueryResult, onlineManager, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { appService } from '../../entities/app';

import { useEasyState, useFs } from './index';

export type CallbackProps<T> = {
    save: (data: any, cacheId: T) => void;
};

function useQueryWithLocalDb<D, T extends string[] = any>(cacheId: T, enabled: boolean, callback: (props: CallbackProps<T>) => D) {
    const fs = useFs();
    const prefetchKeys = useRef(false);
    const queryClient = useQueryClient();
    console.log(prefetchKeys.current);
    useUpdateEffect(() => {
        const path = { baseDir: 'document', folder: 'cache', fileType: 'json', fileName: cacheId.join('-') } as any;
        fs.checkPath(path).then((exist) => {
            if (exist && !prefetchKeys.current && enabled) {
                prefetchKeys.current = true;
                console.log(cacheId);
                queryClient.prefetchInfiniteQuery(cacheId, () => fs.getJson(path), { networkMode: 'always' });
            }
        });
        // check(updCacheId).then((found) => {
        //     if (found) {
        //
        //     }
        // });
    }, [enabled]);

    // const saveInDb = (data: JSON, cacheId: T) => save(data, updCacheId);
    const saveInDb = () => '';

    return callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
