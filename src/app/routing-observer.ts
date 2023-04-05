import { ChatService, ChatApi } from 'entities/chat';
import { useLocation } from 'shared/hooks';
import { UniversalStorage } from 'shared/services';

function routingObserver() {
    const { pathname } = useLocation();
    const handleUnsubscribeFromChat = ChatApi.handleUnsubscribeFromChat();

    // отписка от чата
    const openChatId = ChatService.getOpenChatId();
    const subscribeToChat = UniversalStorage.localStorageGet('subscribed_to_chat');
    if (!openChatId && subscribeToChat) {
        ChatService.unsubscribeFromChat(Number(subscribeToChat));
    }
}

export default routingObserver;
