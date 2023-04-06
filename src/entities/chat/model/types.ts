import { Message } from '../../message/model/types';
import { User } from '../../user/model/types';

export type Chat = {
    id: number;
    name: string;
    avatar: string;
    message: Message[];
    created_at: Date;
    updated_at: Date;
    is_group: boolean;
    users: number[];
    chatUsers: User[];
    pending_messages: number;
    totalMessages: number;
};

export type ChatProxy = {} & Chat;
