import { BaseTypes } from '../../../shared/types';
import { TabBarTypes } from '../../../shared/ui';
import { companyTypes } from '../../company';
import { contactTypes } from '../../contact';
import { Message } from '../../message/model/types';
import { User, Statuses } from '../../user/model/types';

export type Chat = {
    name: string;
    avatar: string | null;
    created_at: Date;
    id: number;
    is_group: boolean;
    last_message: Message;
    members: User[];
    members_count: number;
    messages_count: number;
    pending_messages_count: number;
    updated_at: Date;
    permittedReactions: any[];
};

export type ChatProxy = {
    typing: string;
    secondMember: User | null;
    lastMessageTitle: string;
    date: string;
    checkIsMyLastMessage: boolean;
    subtitle: string;
    secondMemberStatus: keyof typeof Statuses | null;
} & Chat;

export type UseChatsTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: ChatProxy[] | BaseTypes.Empty;
};

export type Actions = 'delete' | 'leave' | 'audioCall' | 'videoCall';
export type SocketIn = 'ChatCreated' | 'ChatDeleted' | ' ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated';
export type SocketOut = 'ChatListenersUpdated';
