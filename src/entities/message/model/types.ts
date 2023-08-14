import { UseFileUploaderTypes } from 'shared/hooks';

import { userTypes } from '../../user';

export type Content = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type MessageType = 'text' | 'images' | 'videos' | 'audios' | 'documents' | 'voices' | 'system';

export enum MediaContentType {
    'image' = 'фото',
    'audio' = 'аудио',
    'video' = 'видео',
    'document' = 'документы',
}

export type MediaContentTypeKeys = keyof typeof MediaContentType;

export type File = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type Message = {
    author: userTypes.User;
    chat_id?: number;
    created_at: Date;
    files: any[];
    forwarded_from_messages: Message[] | [];
    id: number;
    is_edited: boolean;
    is_read: boolean;
    reply_to_message: Message | null;
    text: string;
    type: MessageType;
    reactions: Record<string, []>;
    users_have_read: number[] | [];
};

export type MessageProxy = {
    onClick: () => void;
    isMock: boolean;
    isMy: boolean;
    isFirstUnread: boolean;
    firstOfDay: string;
    date: string;
    authorName: string;
    systemMessages: string[];
    lastMessageInBlock: boolean;
} & Message;

export type MessageMenuActions = 'reply' | 'edit' | 'fixed' | 'copy' | 'forward' | 'delete' | 'highlight';
export type InputMenuActions = UseFileUploaderTypes.Accept;

export type SocketIn = 'MessageCreated' | 'ChatPendingMessagesCountUpdated' | 'MessageUpdated';
export type SocketOut = 'ChatListenersUpdated';
