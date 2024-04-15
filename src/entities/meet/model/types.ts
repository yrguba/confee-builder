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
    meetId: string;
    chat: ChatProxy;
};

export type IncomingCall = {
    meetId: string;
    chatId: number;
};

export type SocketIn = 'CallCreated';
export type SocketOut = 'LeftCall' | 'CallResponse';

export type Socket = {
    event: SocketIn;
    data: any;
};
