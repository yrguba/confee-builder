import { User, Statuses } from '../../user/model/types';

export type Chat = {
    avatar: string;
    created_at: Date;
    id: number;
    is_group: boolean;
    last_message: any;
    members: User[];
    members_count: number;
    messages_count: number;
    name: string;
    pending_messages_count: number;
    updated_at: Date;
    permittedReactions: any[];
};

export type ChatProxy = {
    messageAction: string;
    secondMember: User | null;
    lastMessageTitle: string;
    date: string;
    checkIsMyLastMessage: boolean;
    subtitle: string;
    secondMemberStatus: keyof typeof Statuses | null;
} & Chat;

export type ModalName = 'chat-settings';
export type SocketIn = 'ChatCreated' | 'ChatDeleted' | ' ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated' | 'ChatPendingMessagesCountUpdated';
export type SocketOut = 'ChatListenersUpdated';
