import { useEnding } from 'shared/hooks';

import { messageConstants } from '../../message';
import { Chat } from '../model/types';

class ChatService {
    checkIsOpenChat(): boolean {
        return !!window.location.href.split('/').find((i) => ['chat'].includes(i));
    }

    checkIsOpenChatInfo(): boolean {
        return !!window.location.href.split('/').find((i) => ['group_chat', 'private_chat'].includes(i));
    }

    getChatSubtitle(chat: Chat | null): string {
        if (!chat) return '';
        if (chat.is_group) {
            const word = useEnding(chat.users.length, ['участник', 'участника', 'участников']);
            return `${chat.users.length} ${word}`;
        }
        return 'last message';
    }

    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages === 0) return 1;
        return Math.ceil(chat.pending_messages / messageConstants.message_limit);
    }
}

export default new ChatService();
