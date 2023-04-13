import { usePrevious } from 'react-use';

import { useLocation } from '../../../shared/hooks';
import { UniversalStorage } from '../../../shared/services';
import { useMessageStore } from '../../message';
import { ChatService } from '../index';

function chatObserver() {
    const { pathname } = useLocation();
    const setMessageToEdit = useMessageStore.use.setMessageToEdit();
    const setMessagesToDelete = useMessageStore.use.setMessagesToDelete();
    const setMessageToReply = useMessageStore.use.setMessageToReply();
    const setMessagesToForward = useMessageStore.use.setMessagesToForward();

    const openChatId = ChatService.getOpenChatId();
    const prevOpenChat = usePrevious(openChatId);
    const subscribeToChat = UniversalStorage.localStorageGet('subscribed_to_chat');

    if (!openChatId && subscribeToChat) {
        ChatService.unsubscribeFromChat(Number(subscribeToChat));
    }

    if (!openChatId || openChatId !== prevOpenChat) {
        setMessageToEdit(null);
        setMessageToReply(null);
        setMessagesToDelete([]);
        setMessagesToForward([]);
    }
}

export default chatObserver;
