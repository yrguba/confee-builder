import { appApi } from 'entities/app';
import { getUniqueArr } from 'shared/lib';

import { messages_limit } from './constants';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';
import { messageProxy } from '../index';
import { File, Message } from '../model/types';

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

    getAuthorName(message: Message | null) {
        if (!message) return '';
        const viewerId = viewerService.getId();
        return message?.author?.id === viewerId ? 'Вы' : message?.author?.first_name;
    }
}

export default new MessageService();
