import chatProxy from './proxy';
import { getUniqueArr } from '../../../shared/lib';
import employeeProxy from '../../company/lib/emloyee-proxy';
import { messageConstants } from '../../message';
import { viewerService } from '../../viewer';
import { Chat, ChatProxy } from '../model/types';

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

    getMembersIdsWithoutMe(chat?: ChatProxy | null) {
        const viewerId = viewerService.getId();
        const users: any = chat?.is_personal ? chat.members : chat?.employee_members;
        return users?.filter((i: any) => i.id !== viewerId).map((i: any) => i.id);
    }
}

export default new ChatService();
