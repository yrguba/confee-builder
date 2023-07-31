import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';
import { number } from 'yup';

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
                return produce(cacheData, (draft: any) => {
                    draft.pages[0].data.data.unshift(socketData.data.message);
                });
            });
        });
    }, []);
}

export default messageGateway;
