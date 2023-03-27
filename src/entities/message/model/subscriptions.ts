import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import useMessageStore from './store';
import { $socket } from '../../../shared/configs';

const messageSubscriptions = () => {
    const queryClient = useQueryClient();
    const setSubscriptionsTrigger = useMessageStore.use.setSubscriptionsTrigger();

    useEffect(() => {
        $socket().then((socket) => {
            socket.on('receiveMessage', ({ message }) => {
                queryClient.setQueriesData(['get-messages', message.chat_id], (oldData: any) => {
                    oldData.pages[oldData.pages.length - 1].data.data.unshift(message);
                    setSubscriptionsTrigger();
                    return oldData;
                });
            });
        });
    }, []);
};

export default messageSubscriptions;
