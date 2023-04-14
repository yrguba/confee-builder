import { UniversalStorage } from 'shared/services';

import { ChatService } from '../index';

function chatObserver() {
    const openChatId = ChatService.getOpenChatId();
    const subscribeToChat = UniversalStorage.localStorageGet('subscribed_to_chat');

    if (!openChatId && subscribeToChat) {
        ChatService.unsubscribeFromChat(Number(subscribeToChat));
    }
}

export default chatObserver;
