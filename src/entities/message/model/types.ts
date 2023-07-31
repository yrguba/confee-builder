import { User } from '../../user/model/types';

export type MessageType = 'text' | 'images' | 'videos' | 'audios' | 'documents' | 'voices' | 'system';

export type Message = {
    author: User;
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
} & Message;

type SocketIn = 'MessageCreated' | 'MessageRead' | 'ChatListenersUpdated';
type SocketOut = '';
