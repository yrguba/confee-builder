import { ChatProxy } from '../../chat/model/types';

export type Call = {
    avatar: string;
    id: string;
    name: string;
    muted: boolean;
    userId: number;
    chatId: number;
    usersIds: number[];
};

export type CreateMeet = {
    roomId: string;
    chat: ChatProxy;
};

export type IncomingCall = {
    roomId: string;
    callId: number;
    avatar: string;
    name: string;
    chatId: number;
    initiatorId: number;
};

export type SocketIn = 'CallCreated';
export type SocketOut = 'LeftCall' | 'CallResponse';

export type Socket = {
    event: SocketIn;
    data: any;
};
