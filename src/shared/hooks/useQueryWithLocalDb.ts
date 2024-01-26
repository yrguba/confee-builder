import { useQueryClient, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useUpdateEffect } from 'react-use';

import useDatabase from './useDatabase';

export type CallbackProps<T> = {
    save: (data: any, entity: T) => void;
};

function useQueryWithLocalDb<T extends string[]>(cacheId: T, callback: (props: CallbackProps<T>) => UseInfiniteQueryResult) {
    const { save, get, check } = useDatabase();

    const queryClient = useQueryClient();

    useUpdateEffect(() => {
        check(cacheId.join('')).then((found) => {
            if (found) {
                queryClient.prefetchQuery(cacheId, () => get(cacheId.join('')));
            }
        });
    }, [cacheId]);

    const saveInDb = (data: JSON, cacheId: T) => save(data, cacheId.join(''));

    return callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
