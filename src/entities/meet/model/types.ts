export type Meet = {
    avatar: string;
    id: string;
    name: string;
    muted: boolean;
};

export type SocketIn = 'CallCreated';
export type SocketOut = '';

export type Socket = {
    event: SocketIn;
    data: any;
};
