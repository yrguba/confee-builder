import { useQueryClient } from '@tanstack/react-query';

import { Storage } from 'entities/app';

import { messageConstants } from '../../message';
import { ViewerService } from '../../viewer';
import { Chat, ChatProxy } from '../model/types';

class ChatService {
    getOpenChatId(): number | null {
        if (window.location.href.split('/').find((i) => ['chat'].includes(i))) {
            return Number(window.location.href.split('/')[5]);
        }
        return null;
    }

    getChatInList(id: number | null) {
        const queryClient = useQueryClient();
        const data: { data: { data: Chat[] } } | undefined = queryClient.getQueryData(['get-chats']);
        return data ? data.data.data.find((chat) => chat.id === id) : null;
    }

    checkChatIsSubscribed(): boolean {
        return !!Storage.localStorageGet('subscribed_to_chat');
    }

    subscribeToChat(id: number) {
        // const { mutate: handleSubscribeToChat } = ChatApi.handleSubscribeToChat();
        // handleSubscribeToChat(id);
        // UniversalStorage.localStorageSet('subscribed_to_chat', id);
    }

    unsubscribeFromChat(id: number) {
        // const { mutate: handleUnsubscribeFromChat } = ChatApi.handleUnsubscribeFromChat();
        // handleUnsubscribeFromChat(id);
        // UniversalStorage.localStorageRemove('subscribed_to_chat');
    }

    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages_count === 0) return 1;
        return Math.ceil(chat.pending_messages_count / messageConstants.message_limit);
    }

    getSecondMember(chat: Chat) {
        if (chat.is_group) return null;

        const viewer = ViewerService.getViewer();
        const found = chat.members.find((i) => i.id !== viewer?.id);
        return null;
    }
}

export default new ChatService();
