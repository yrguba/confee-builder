import produce from 'immer';

import chatProxy from './proxy';
import { getUniqueArr } from '../../../shared/lib';
import employeeProxy from '../../company/lib/emloyee-proxy';
import { userProxy } from '../../user';
import { User } from '../../user/model/types';
import { viewerService, viewerStore } from '../../viewer';
import { ChatProxy } from '../model/types';

class ChatService {
    viewer = viewerStore.getState().viewer.value;

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

    getMembersWithoutMe(chat?: ChatProxy | null): User[] | null {
        if (!chat) return null;
        const viewerId = this.viewer?.id;
        const users: any = chat?.is_personal ? chat.members : chat?.employee_members.filter((i) => i.user).map((i) => i.user);
        return users?.filter((i: any) => i.id !== viewerId).map((i: any) => i);
    }

    getMemberNameByUserId(chat?: ChatProxy | null, id?: number): string {
        if (!chat) return '';
        const viewerId = this.viewer.id;
        if (chat.is_personal) {
            const found = chat.members.find((i) => i.id === id);
            if (found) {
                return userProxy(found)?.full_name || '';
            }
        } else {
            const found = chat.employee_members.find((i) => i.user?.id === id);
            if (found) {
                return employeeProxy(found)?.full_name || '';
            }
        }
        return '';
    }

    getMembersIdsWithoutMe(chat?: ChatProxy | null) {
        if (!chat) return null;
        const viewerId = this.viewer?.id;
        const users: any = chat?.is_personal ? chat.members : chat?.employee_members.filter((i) => i.user).map((i) => i.user);

        return users?.filter((i: any) => i?.id !== viewerId).map((i: any) => i?.id);
    }

    forEachChats(queryClient: any, companyId: number | null, callback: (chats: ChatProxy[], key: string) => void) {
        const keys = ['all', 'personal'];
        if (companyId) {
            keys.push(`for-company/${companyId}`);
        }
        keys.forEach((i) =>
            queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                if (!cacheData?.pages?.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft?.pages.forEach((page: any) => {
                        callback(page.data.data, i);
                    });
                });
            })
        );
    }
}

export default new ChatService();
