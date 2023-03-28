import { useQueryClient } from '@tanstack/react-query';

import { useEnding } from 'shared/hooks';

import { Chat } from '../model/types';

class ChatService {
    getChatById(id: string | undefined): Chat | null {
        const queryClient = useQueryClient();
        const chats: any = queryClient.getQueryData(['get-chats']);
        return null;
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
