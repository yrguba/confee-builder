import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useRouter, useWebSocket } from 'shared/hooks';

import useMeetStore from './store';
import { SocketOut, SocketIn } from './types';
import { viewerService } from '../../viewer';
import ChatService from '../lib/service';

function meetGateway() {
    const { navigate } = useRouter();
    const queryClient = useQueryClient();

    const invitationsToConference = useMeetStore.use.invitationsToConference();

    useEffect(() => {
        const { onMessage } = useWebSocket<SocketIn, SocketOut>();
        onMessage('CallCreated', (socketData) => {
            const extraInfo = socketData.data.extra_info;
            invitationsToConference.push({ id: extraInfo.confee_video_room, avatar: socketData.data.chat.avatar, name: socketData.data.chat.name });
            // ['all', 'personal', `for-company/17`].forEach((i) =>
            //     queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
            //         if (!cacheData?.pages?.length) return cacheData;
            //         return produce(cacheData, (draft: any) => {
            //             draft?.pages.forEach((page: any) => {
            //                 page.data.data = page?.data?.data.map((chat: any) => {
            //                     if (socketData.data.chat.id === chat.id) return { ...chat, meetId: extraInfo.confee_video_room };
            //                     return chat;
            //                 });
            //             });
            //         });
            //     })
            // );
            // queryClient.setQueryData(['get-chat', socketData.data.chat.id], (cacheData: any) => {
            //     if (!cacheData?.data?.data) return cacheData;
            //     return produce(cacheData, (draft: any) => {
            //         draft.data.data = { ...draft.data.data, meetId: extraInfo.confee_video_room };
            //     });
            // });
        });
    }, []);
}

export default meetGateway;
