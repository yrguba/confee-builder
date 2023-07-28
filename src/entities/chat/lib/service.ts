import { useQueryClient } from '@tanstack/react-query';

import { Storage } from 'entities/app';

import { messageConstants } from '../../message';
import { ViewerService } from '../../viewer';
import { Chat, ChatProxy } from '../model/types';

class ChatService {
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
}

export default new ChatService();
