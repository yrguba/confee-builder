import { messageConstants } from '../../message';
import { Chat, ChatProxy } from '../model/types';

class ChatService {
    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages_count === 0) return 1;
        return Math.ceil(chat.pending_messages_count / messageConstants.message_limit);
    }
}

export default new ChatService();
