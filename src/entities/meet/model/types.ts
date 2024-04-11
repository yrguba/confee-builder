export type Call = {
    avatar: string;
    id: string;
    name: string;
    muted: boolean;
    userId: number;
    status: 'incoming' | 'outgoing' | 'in-room';
};

export type SocketIn = 'CallCreated';
export type SocketOut = 'LeftCall';

export type Socket = {
    event: SocketIn;
    data: any;
};
