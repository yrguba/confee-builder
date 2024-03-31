export type SocketIn = 'UWS_CLIENT_IDENTIFICATION';

export type NetworkState = {
    online: boolean;
    speed?: 'fast' | 'slow' | 'no';
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    downlink?: number;
};

export type PhotoAndVideoSwiperItemsType = {
    id: number;
    url: string;
};

export type PhotoAndVideoSwiperType = {
    type: 'img' | 'video';
    startIndex: number;
    items: PhotoAndVideoSwiperItemsType[];
    description: {
        title: string;
        subtitle: string;
        avatar: string;
    };
};
