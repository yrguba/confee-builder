import produce from 'immer';

import { chatTypes } from 'entities/chat';

import { Socket } from './types';
import chatService from '../../chat/lib/service';
import { Chat } from '../../chat/model/types';
import { viewerService, viewerStore } from '../../viewer';

function userGateway({ event, data }: Socket, queryClient: any) {
    const viewerId = viewerStore.getState().viewer.value.id;
    const openChatId = chatService.getOpenChatId();

    switch (event) {
        case 'UserUpdated':
            queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
                if (!cacheData?.pages?.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft?.pages.forEach((page: any) => {
                        page.data.data = page?.data?.data.map((chat: chatTypes.Chat) => {
                            if (!chat.is_group && viewerId !== data.user_id) {
                                return {
                                    ...chat,
                                    members: chat?.members?.map((i) => {
                                        if (i.id === data.user_id) return { ...i, ...data.updated_values };
                                        return i;
                                    }),
                                };
                            }

                            return chat;
                        });
                    });
                });
            });
            openChatId &&
                queryClient.setQueryData(['get-chat', openChatId], (cacheData: any) => {
                    return produce(cacheData, (draft: any) => {
                        if (!draft?.data?.data) return draft;
                        const chat: Chat = cacheData?.data?.data;
                        draft.data.data.members = chat.members?.map((user) => {
                            if (user.id === data.user_id) return { ...user, ...data.updated_values };
                            return user;
                        });
                    });
                });
    }
}

export default userGateway;
