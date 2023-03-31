import { UserTypes } from '../../user';

export type Content = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type MessageType = 'text' | 'images' | 'videos' | 'audios' | 'documents' | 'voices' | 'system';
export type MessageStatus = 'pending' | 'read';

export type Massage = {
    id: number;
    text: string;
    user: UserTypes.User;
    message_type: MessageType;
    message_status: MessageStatus;
    reactions: object;
    reply_messages: Massage;
    users_have_read: number[];
    created_at: Date;
};

export type MessageMenuIcons = 'answer' | 'forward' | 'copy' | 'edit' | 'delete' | 'mention' | 'convert';

export type MessageMenuItem = {
    id: number;
    title: string;
    icon: MessageMenuIcons;
};
