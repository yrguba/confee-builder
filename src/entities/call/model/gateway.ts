import produce from 'immer';

import meetStore from './store';
import { Socket } from './types';
import { viewerStore } from '../../viewer';

function callGateway({ event, data }: Socket, queryClient: any) {
    const viewer = viewerStore.getState().viewer.value;

    switch (event) {
        case 'CallCreated':
            const extraInfo = data.extra_info;
            if (extraInfo.for_user_id !== viewer.id) {
                meetStore.setStateOutsideComponent({
                    incomingCall: {
                        roomId: data.call_id.room,
                        chatId: data.call_id.chat_id,
                        callId: data.call_id.id,
                        avatar: data.chat.avatar,
                        name: data.chat.name,
                        initiatorId: extraInfo.for_user_id,
                        users_ids: [],
                    },
                });
            }
            return;
        case 'CallResponse':
            return meetStore.setStateOutsideComponent({
                responses: [...meetStore.getState().responses.value, { callId: data.call_id, response: data.response }],
            });

        // store.invitationToConference.set({
        //     id: extraInfo.confee_video_room,
        //     avatar: data.chat.avatar,
        //     name: data.chat.name,
        //     muted: extraInfo.muted,
        // });

        // ['all', 'personal', `for-company/17`].forEach((i) =>
        //     queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
        //         if (!cacheData?.pages?.length) return cacheData;
        //         return produce(cacheData, (draft: any) => {
        //             draft?.pages.forEach((page: any) => {
        //                 page.data.data = page?.data?.data.map((chat: any) => {
        //                     if (data.chat.id === chat.id) return { ...chat, meetId: extraInfo.confee_video_room };
        //                     return chat;
        //                 });
        //             });
        //         });
        //     })
        // );
        // queryClient.setQueryData(['get-chat', data.chat.id], (cacheData: any) => {
        //     if (!cacheData?.data?.data) return cacheData;
        //     return produce(cacheData, (draft: any) => {
        //         draft.data.data = { ...draft.data.data, meetId: extraInfo.confee_video_room };
        //     });
        // });
    }
}

export default callGateway;