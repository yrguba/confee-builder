import chatProxy from './proxy';
import { getUniqueArr } from '../../../shared/lib';
import employeeProxy from '../../company/lib/emloyee-proxy';
import { messageConstants } from '../../message';
import { Chat } from '../model/types';

class ChatService {
    getUpdatedChatsList(chats: any) {
        if (!chats) return null;
        const uniq = getUniqueArr(
            chats?.pages?.reduce((chat: any, page: any) => [...chat, ...[...page.data.data]], []),
            'id'
        );
        return uniq.map((chat: any, index: number) => {
            return chatProxy(chat);
        });
    }

    getOpenChatId() {
        const { pathname } = window.location;
        const splitPath = pathname.split('/');
        const findIndexChat = splitPath.findIndex((i) => i === 'chat');
        return Number(splitPath[findIndexChat + 1]) || null;
    }
}

export default new ChatService();
