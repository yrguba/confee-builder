import { ChatProxy } from '../../chat/model/types';

export type Call = {
    avatar: string;
    id: string;
    name: string;
    muted: boolean;
    userId: number;
    chatId: number;
    usersIds: number[];
    status: 'incoming' | 'outgoing' | 'in-room';
};

export type CreateMeet = {
    meetId: string;
    chat: ChatProxy;
};

export type SocketIn = 'CallCreated';
export type SocketOut = 'LeftCall';

export type Socket = {
    event: SocketIn;
    data: any;
};
