import { messages_limit } from './constants';
import { useArray } from '../../../shared/hooks';
import { Chat } from '../../chat/model/types';
import { messageProxy } from '../index';

class MessageService {
    getUpdatedList(messageData: any) {
        const { getUniqueArr } = useArray({});
        const uniq = getUniqueArr(messageData?.pages?.reduce((messages: any, page: any) => [...[...page.data.data].reverse(), ...messages], []) || [], 'id');
        const firstUnreadMessage = uniq.find((i) => !i.is_read);
        return uniq.map((message: any, index: number) => messageProxy(uniq[index - 1], message, firstUnreadMessage as any)) || [];
    }

    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages_count === 0) return 1;
        return Math.ceil(chat.pending_messages_count / messages_limit);
    }
}

export default new MessageService();
