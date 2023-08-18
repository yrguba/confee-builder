import { userTypes } from '../../user';

export type Content = {
    extension: string;
    name: string;
    size: number;
    url: string;
};

export type MediaContentType = 'images' | 'videos' | 'audios' | 'documents' | 'voices';
export type MessageType = 'text' | 'system' | MediaContentType;

export type File = {
    chat_id?: number;
    created_at?: Date;
    employee_id?: number | null;
    extension?: string;
    hash_id?: string;
    id?: number;
    link: string;
    name?: string;
    path?: string;
    size?: number;
    subtype?: number;
    type?: MediaContentType;
    updated_at?: Date;
    user_id?: number;
};

export type Message = {
    author: userTypes.User;
    chat_id?: number;
    created_at: Date;
    files: File[];
    forwarded_from_message: Message | null;
    id: number;
    is_edited: boolean;
    is_read: boolean;
    reply_to_message: Message | null;
    text: string;
    type: MessageType;
    reactions: Record<string, []>;
    users_have_read: number[] | [];
    isMock: boolean;
};

export type MessageProxy = {
    onClick: () => void;
    isMy: boolean;
    isFirstUnread: boolean;
    firstOfDay: string;
    date: string;
    authorName: string;
    systemMessages: string[];
    lastMessageInBlock: boolean;
} & Message;

export type VoiceEvents = 'start' | 'send' | 'stop' | 'cancel';

export type MessageMenuActions = 'reply' | 'edit' | 'fixed' | 'copy' | 'forward' | 'delete' | 'highlight';

export type Modals = {
    forwardMessages: null;
};

export type SocketIn = 'MessageCreated' | 'ChatPendingMessagesCountUpdated' | 'MessageUpdated' | 'MessageRead' | 'Typing';
export type SocketOut = 'ChatListenersUpdated' | 'Typing' | 'MessageRead';
