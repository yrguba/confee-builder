import { messageConstants } from '../../message';
import { Chat } from '../model/types';

class ChatService {
    getOpenChatId() {
        const { pathname } = window.location;
        const splitPath = pathname.split('/');
        const findIndexChat = splitPath.findIndex((i) => i === 'chat');
        return Number(splitPath[findIndexChat + 1]) || null;
    }
}

export default new ChatService();
