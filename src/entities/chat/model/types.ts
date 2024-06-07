import { BaseTypes } from '../../../shared/types';
import { InputTypes, TabBarTypes } from '../../../shared/ui';
import { Call, CallInActiveCallList } from '../../call/model/types';
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
    last_message: Message | null;
    members: User[];
    employee_members: Employee[];
    members_count: number | null;
    employee_members_count: number | null;
    messages_count: number;
    pending_messages_count: number;
    updated_at: Date;
    permittedReactions: any[];
    company_id: number | null;
    chat_pinned: boolean;
    draft:
        | {
              message_text: string;
          }[]
        | null;
    is_muted: boolean;
    current_user_role: 'Chat member' | 'Owner';
    description?: string;
    calls: CallInActiveCallList[];
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
    currentShortMembers: CurrentShortMember[];
    isDeleted: boolean;
    isOwner: boolean;
} & Chat;

export type CurrentShortMember = {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    full_name: string;
};

export type ChatsTypes = 'all' | 'personal' | 'company';

export type ChatTabsActions = 'goMeet' | 'search';

export type UseChatsTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: ChatProxy[] | BaseTypes.Empty;
    getNextPage: () => void;
    searchInput: InputTypes.UseReturnedType;
    foundChats: ChatProxy[] | BaseTypes.Empty;
};

export type PrivateChatActions = 'pin' | 'delete' | 'goMeet' | 'message' | 'mute';
export type GroupChatActions = 'pin' | 'leave' | 'goMeet' | 'add-members' | 'mute' | 'open-edit';
export type SocketIn = 'ChatCreated' | 'ChatDeleted' | 'ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated';
export type SocketOut = 'ChatListenersUpdated';

export type Socket = {
    event: SocketIn;
    data: any;
};
