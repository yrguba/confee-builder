import { useQueryClient, UseInfiniteQueryResult, onlineManager, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { appService } from '../../entities/app';

import { useEasyState, useFs } from './index';

export type CallbackProps<T> = {
    save: (data: any) => void;
};

function useQueryWithLocalDb<D, T extends string[] = any>(cacheId: T, enabled: boolean, callback: (props: CallbackProps<T>) => D) {
    const fs = useFs();
    const queryClient = useQueryClient();

    const saveInDb = (data: any) => {
        // if (!cacheId.includes('undefined') && enabled) {
        //     fs.saveAsJson({ baseDir: 'document', folder: 'cache', fileName: cacheId.join('-'), data });
        // }
    };

    const data: any = callback({ save: saveInDb });
    // console.log('tt');
    // if (enabled && !data?.data) {
    //     const path = { baseDir: 'document', folder: 'cache', fileType: 'json', fileName: cacheId.join('-') } as any;
    //     // queryClient.prefetchInfiniteQuery(cacheId, () => fs.getJson(path), { networkMode: 'always' });
    // }

    return data;
}
export default useQueryWithLocalDb;
