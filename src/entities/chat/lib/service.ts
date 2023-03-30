import { useEnding } from 'shared/hooks';

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
}

export default new ChatService();
