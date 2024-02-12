import { sendNotification } from '@tauri-apps/api/notification';
import produce from 'immer';

import { getUniqueArr } from 'shared/lib';

import { messages_limit } from './constants';
import { Chat } from '../../chat/model/types';
import { messageProxy } from '../index';
import { File, Message, MessageProxy, MessageType } from '../model/types';

class MessageService {
    getUpdatedList(messageData: any) {
        const uniq = getUniqueArr(messageData?.pages?.reduce((messages: any, page: any) => [...messages, ...[...page.data.data]], []) || [], 'id');
        return uniq.map((message: any, index: number) => {
            return messageProxy({
                prevMessage: (uniq[index + 1] as Message) || null,
                message,
                nextMessage: (uniq[index - 1] as Message) || null,
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

    updateMockMessage(data: { users_have_read?: number[]; chatId: number; filesType: MessageType; id?: number }, queryClient: any, sendingError?: boolean) {
        queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
            return produce(cacheData, (draft: any) => {
                console.log(draft);
                draft.pages[0].data.data.find((i: MessageProxy, index: number) => {
                    if (i.isMock && i.sending && data.filesType === i.type) {
                        draft.pages[0].data.data[index] = {
                            ...i,
                            id: data.id || i.id,
                            sending: false,
                            isRead: true,
                            isMock: false,
                            sendingError,
                            users_have_read: data.users_have_read,
                        };
                    }
                });
            });
        });
    }
}

export default new MessageService();
