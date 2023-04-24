import { UserTypes } from '../../user';

export type Content = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type MessageType = 'text' | 'images' | 'videos' | 'audios' | 'documents' | 'voices' | 'system';
export type MediaContentType = 'image' | 'audio' | 'video' | 'document';

export type MessageStatus = 'pending' | 'read';
export type File = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type Message = {
    id: number;
    text: string;
    content: File[];
    user: UserTypes.User;
    message_type: MessageType;
    message_status: MessageStatus;
    reactions: Record<string, []>;
    replyMessage: Message | null;
    forwarded_messages: Message[] | [];
    users_have_read: number[] | [];
    is_edited: boolean;
    created_at: Date;
};

export type MessageProxy = {
    onClick: () => void;
    isMock: boolean;
    isMy: boolean;
    isFirstUnread: boolean;
    firstOfDay: string;
} & Message;

export type MessageMenuIcons = 'answer' | 'forward' | 'copy' | 'edit' | 'delete' | 'mention' | 'convert';
export type InputMenuIcons = MediaContentType;

type MenuItem<T> = {
    id: number;
    title: string;
    icon: T;
    onClick: () => void;
};

export type MessageMenuItem = MenuItem<MessageMenuIcons>;
export type InputMenuItem = MenuItem<InputMenuIcons>;
