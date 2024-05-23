import produce from 'immer';

import { Chat, ChatProxy, Socket } from './types';
import { chatService } from '../index';
import ChatService from '../lib/service';

function chatGateway({ event, data }: Socket, queryClient: any, navigate: any) {
    switch (event) {
        case 'ChatUpdated':
            ['all', 'personal', `for-company/18`].forEach(
                (i) => queryClient.invalidateQueries(['get-chats', i])
                // queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                //     if (!cacheData?.pages?.length) return cacheData;
                //     return produce(cacheData, (draft: any) => {
                //         draft?.pages.forEach((page: any) => {
                //             page.data.data = page?.data?.data.map((chat: Chat) => {
                //                 if (data.chat_id === chat.id) return { ...chat, ...data.updated_values };
                //                 return chat;
                //             });
                //         });
                //     });
                // })
            );
            return queryClient.setQueryData(['get-chat', data.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, ...data.updated_values };
                });
            });

        case 'ChatCreated':
            return chatService.forEachChats(queryClient, data?.chat?.company_id, (chats, key) => {
                queryClient.invalidateQueries([key]);
            });

        case 'ChatDeleted':
            const openChatId = ChatService.getOpenChatId();
            return ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    if (Number(openChatId) === data.chat_id) {
                        navigate('/chats');
                    }
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            page.data.data = page.data.data.filter((chat: ChatProxy) => chat.id !== data.chat_id);
                        });
                    });
                })
            );

        case 'ChatMembersDeleted':
            return queryClient.invalidateQueries(['get-chat', data.chat_id]);
        case 'ChatMembersCreated':
            return queryClient.invalidateQueries(['get-chat', data.chat_id]);
    }
}

export default chatGateway;
