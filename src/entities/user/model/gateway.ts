import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { chatTypes } from 'entities/chat';
import { useRouter, useWebSocket } from 'shared/hooks';

import { SocketOut, SocketIn } from './types';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';

function userGateway() {
    const queryClient = useQueryClient();
    const { params } = useRouter();
    useEffect(() => {
        const { onMessage } = useWebSocket<SocketIn, SocketOut>();
        const viewerId = viewerService.getId();
        onMessage('UserUpdated', (socketData) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft?.data?.data.map((chat: chatTypes.Chat) => {
                        if (!chat.is_group && viewerId !== socketData.data.user_id) {
                            return {
                                ...chat,
                                members: chat.members.map((i) => {
                                    if (i.id === socketData.data.user_id) return { ...i, ...socketData.data.updated_values };
                                    return i;
                                }),
                            };
                        }

                        return chat;
                    });
                });
            });
            params.chat_id &&
                queryClient.setQueryData(['get-chat', Number(params.chat_id)], (cacheData: any) => {
                    if (cacheData?.data?.data.is_group) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        const chat: Chat = cacheData?.data?.data;
                        draft.data.data.members = chat.members?.map((user) => {
                            if (user.id === socketData.data.user_id) return { ...user, ...socketData.data.updated_values };
                            return user;
                        });
                    });
                });
        });
    }, []);
}

export default userGateway;
