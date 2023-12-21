import { BaseTypes } from '../../../shared/types';
import { InputTypes, TabBarTypes } from '../../../shared/ui';
import { companyTypes } from '../../company';
import { Employee, EmployeeProxy } from '../../company/model/types';
import { contactTypes } from '../../contact';
import { Message } from '../../message/model/types';
import { User, UserProxy } from '../../user/model/types';

export type Chat = {
    name: string;
    avatar: string | null;
    created_at: Date;
    id: number;
    is_group: boolean;
    last_message: Message;
    members: User[];
    employee_members: Employee[];
    members_count: number | null;
    employee_members_count: number | null;
    messages_count: number;
    pending_messages_count: number;
    updated_at: Date;
    permittedReactions: any[];
    company_id: number | null;
    draft: any[];
    pinned: boolean;
};

export type ChatProxy = {
    is_personal: boolean;
    typing: string;
    secondUser: UserProxy | null;
    secondEmployee: EmployeeProxy | null;
    lastMessageTitle: string;
    date: string;
    checkIsMyLastMessage: boolean;
    subtitle: string;
    authorLastMessage: string;
    meetId: string;
} & Chat;

export type ChatsTypes = 'all' | 'personal' | 'company';

export type UseChatsTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: ChatProxy[] | BaseTypes.Empty;
    getNextPage: () => void;
    searchInput: InputTypes.UseReturnedType;
    foundChats: ChatProxy[] | BaseTypes.Empty;
};

export type PrivateChatActions = 'delete' | 'audioCall' | 'videoCall' | 'message';
export type GroupChatActions = 'leave' | 'audioCall' | 'videoCall' | 'add-members';
export type SocketIn = 'ChatCreated' | 'ChatDeleted' | ' ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated';
export type SocketOut = 'ChatListenersUpdated';
