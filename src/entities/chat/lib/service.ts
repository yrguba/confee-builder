import { messageConstants } from '../../message';
import { Chat } from '../model/types';

class ChatService {
    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages_count === 0) return 1;
        return Math.ceil(chat.pending_messages_count / 15);
    }
}

export default new ChatService();
