import { UseInfiniteQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import useDatabase, { Entities } from './useDatabase';
import { Chat } from '../../entities/chat/model/types';
import { axiosClient } from '../configs';
import { httpHandlers } from '../lib';

export type CallbackProps = {
    enabled: boolean;
    save: (data: any, entity: Entities) => void;
};

function useQueryWithLocalDb(cacheId: any[], callback: (props: CallbackProps) => UseInfiniteQueryResult) {
    const [enabled, setEnabled] = useState(false);

    const { save, get } = useDatabase();

    useEffect(() => {}, [cacheId]);

    // useQuery(cacheId, () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
    //     // staleTime: Infinity,
    //     enabled: !!data.chatId,
    //     select: (data) => {
    //         const res = httpHandlers.response<{ data: Chat }>(data);
    //         return res.data?.data;
    //     },
    // });

    return callback({ enabled, save });
}
export default useQueryWithLocalDb;
