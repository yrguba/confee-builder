import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useWebSocket } from 'shared/hooks';

import { Message } from './types';

type SocketIn = 'MessageCreated';
type SocketOut = '';

function messageGateway() {
    const { onMessage } = useWebSocket<SocketIn, SocketOut>();
    const queryClient = useQueryClient();
    useEffect(() => {
        onMessage('MessageCreated', (socketData) => {
            queryClient.setQueryData(['get-messages', socketData.data.message.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;

                return {
                    ...cacheData,
                    data: {
                        ...cacheData.data.data,
                        data: [...cacheData.data.data, socketData.data.message],
                    },
                };
            });
        });
    }, []);
}

export default messageGateway;
