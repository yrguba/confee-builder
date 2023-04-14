import { usePrevious } from 'react-use';

import useMessageStore from './store';
import { ChatService } from '../../chat';

function messageObserver() {
    const messageToEdit = useMessageStore.use.messageToEdit();
    const messagesToDelete = useMessageStore.use.messagesToDelete();
    const messageToReply = useMessageStore.use.messageToReply();
    const messagesToForward = useMessageStore.use.messagesToForward();
    const setMessageToEdit = useMessageStore.use.setMessageToEdit();
    const setMessagesToDelete = useMessageStore.use.setMessagesToDelete();
    const setMessageToReply = useMessageStore.use.setMessageToReply();
    const setMessagesToForward = useMessageStore.use.setMessagesToForward();

    const openChatId = ChatService.getOpenChatId();
    const prevOpenChat = usePrevious(openChatId);

    if (!openChatId || openChatId !== prevOpenChat) {
        messageToEdit && setMessageToEdit(null);
        messageToReply && setMessageToReply(null);
        messagesToDelete.length && setMessagesToDelete([]);
        messagesToForward.length && setMessagesToForward([]);
    }
}

export default messageObserver;
