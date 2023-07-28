import { Message } from '../../message/model/types';
import { User } from '../../user/model/types';

export type Chat = {
    avatar: string;
    created_at: Date;
    id: number;
    is_group: boolean;
    last_message: Message;
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
} & Chat;
