import { useQueryClient, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useUpdateEffect } from 'react-use';

import useDatabase from './useDatabase';

export type CallbackProps<T> = {
    save: (data: any, entity: T) => void;
};

function useQueryWithLocalDb<T extends string[]>(cacheId: T, callback: (props: CallbackProps<T>) => UseInfiniteQueryResult) {
    const { save, get } = useDatabase();

    const queryClient = useQueryClient();

    useUpdateEffect(() => {
        queryClient.prefetchQuery(cacheId, () => get(cacheId.join('').split('/').join('')));
    }, [cacheId]);

    const saveInDb = (data: JSON, cacheId: T) => save(data, cacheId.join('').split('/').join(''));

    return callback({ save: saveInDb });
}
export default useQueryWithLocalDb;
