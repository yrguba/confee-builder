import { ChatService, ChatApi } from 'entities/chat';
import { useLocation } from 'shared/hooks';
import { UniversalStorage } from 'shared/services';

function routingObserver() {
    const { pathname } = useLocation();
    // подписка/отписка чата

    const openChatId = ChatService.getOpenChatId();
    if (openChatId) {
        console.log('sub');
    } else {
        console.log('exit');
    }
}

export default routingObserver;
