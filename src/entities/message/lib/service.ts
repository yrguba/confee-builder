import { useQueryClient } from '@tanstack/react-query';
import { sendNotification } from '@tauri-apps/api/notification';
import produce from 'immer';

import { appApi } from 'entities/app';
import { getUniqueArr } from 'shared/lib';

import { messages_limit } from './constants';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';
import { messageProxy, messageService } from '../index';
import { File, Message, MessageProxy } from '../model/types';

class MessageService {
    getUpdatedList(messageData: any) {
        const uniq = getUniqueArr(messageData?.pages?.reduce((messages: any, page: any) => [...[...page.data.data].reverse(), ...messages], []) || [], 'id');
        return uniq.map((message: any, index: number) => {
            return messageProxy({
                prevMessage: (uniq[index - 1] as Message) || null,
                message,
                nextMessage: (uniq[index + 1] as Message) || null,
            });
        });
    }

    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages_count === 0) return 1;
        return Math.ceil(chat.pending_messages_count / messages_limit);
    }

    notification(title: string, body: string) {
        if (window.localStorage.getItem('notification')) {
            return sendNotification({ title, body });
        }
    }

    updateMockMessage(data: any, queryClient: any) {
        const message = data.data.data;
        queryClient.setQueryData(['get-messages', message.chat_id], (cacheData: any) => {
            return produce(cacheData, (draft: any) => {
                draft.pages[0].data.data.forEach((i: MessageProxy, index: number) => {
                    if (i.isMock && i.sending && message.type === i.type) {
                        draft.pages[0].data.data[index] = { ...i, sending: false, isRead: true, isMock: false };
                    }
                });
            });
        });
    }
}

export default new MessageService();
