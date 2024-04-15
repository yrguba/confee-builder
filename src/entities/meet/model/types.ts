import { ChatProxy } from '../../chat/model/types';

export type Call = {
    avatar: string;
    id: string;
    name: string;
    muted: boolean;
    userId: number;
    chatId: number;
    usersIds: number[];
    type: 'out' | 'in';
};

export type Meet = {
    roomId: string;
    callId?: number;
    avatar: string;
    name: string;
    chatId: number;
    initiatorId: number;
    users_ids: number[];
};

export type CallResponse = {
    room_id: string;
    chat_id: number | null;
    call_id: string;
    response: 'accepted' | 'reject' | 'timeout';
    user_id: number;
};

export type SocketIn = 'CallCreated';
export type SocketOut = 'LeftCall' | 'CallResponse';

export type Socket = {
    event: SocketIn;
    data: any;
};
