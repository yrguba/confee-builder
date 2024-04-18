import { QueryClient } from '@tanstack/react-query';
import produce from 'immer';

import meetStore from './store';
import { Socket } from './types';
import { viewerStore } from '../../viewer';

function callGateway({ event, data }: Socket, queryClient: QueryClient) {
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
        case 'JoinedCall':
            queryClient.invalidateQueries(['get-chat', data.extra_info.chat_id]);
            return queryClient.invalidateQueries(['get-call', data.extra_info.chat_id, data.extra_info.call.id]);
        case 'LeftCall':
            queryClient.invalidateQueries(['get-chat', data.extra_info.chat_id]);
            return queryClient.invalidateQueries(['get-call', data.extra_info.chat_id, data.extra_info.call.id]);
    }
}

export default callGateway;
