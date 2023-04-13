import { useQueryClient } from '@tanstack/react-query';

import { useEnding } from 'shared/hooks';
import { UniversalStorage } from 'shared/services';

import { messageConstants } from '../../message';
import ChatApi from '../model/api';
import { Chat, ChatProxy } from '../model/types';

class ChatService {
    getOpenChatId(): number | null {
        if (window.location.href.split('/').find((i) => ['chat'].includes(i))) {
            return Number(window.location.href.split('/')[6]);
        }
        return null;
    }

    checkIsOpenChatInfo(): boolean {
        return !!window.location.href.split('/').find((i) => ['group_chat', 'private_chat'].includes(i));
    }

    getChatInList(id: number) {
        const queryClient = useQueryClient();
        const data: { data: { data: Chat[] } } | undefined = queryClient.getQueryData(['get-chats']);
        return data ? data.data.data.find((chat) => chat.id === id) : null;
    }

    checkChatIsSubscribed(): boolean {
        return !!UniversalStorage.localStorageGet('subscribed_to_chat');
    }

    subscribeToChat(id: number) {
        const currentChatId = UniversalStorage.localStorageGet('subscribed_to_chat');
        const { mutate: handleUnsubscribeFromChat } = ChatApi.handleUnsubscribeFromChat();
        currentChatId && handleUnsubscribeFromChat(Number(currentChatId));
        const { mutate: handleSubscribeToChat } = ChatApi.handleSubscribeToChat();
        handleSubscribeToChat(id);
        UniversalStorage.localStorageSet('subscribed_to_chat', String(id));
    }

    unsubscribeFromChat(id?: number) {
        const idInLs = UniversalStorage.localStorageGet('subscribed_to_chat');
        const { mutate: handleUnsubscribeFromChat } = ChatApi.handleUnsubscribeFromChat();
        handleUnsubscribeFromChat(id || Number(idInLs));
        UniversalStorage.localStorageRemove('subscribed_to_chat');
    }

    getInitialPage(chat: Chat | undefined) {
        if (!chat) return undefined;
        if (chat.pending_messages === 0) return 1;
        return Math.ceil(chat.pending_messages / messageConstants.message_limit);
    }
}

export default new ChatService();
