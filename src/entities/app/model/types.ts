import { MessageProxy } from '../../message/model/types';

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
    name: string;
};

export type PhotoAndVideoSwiperType = {
    update?: boolean;
    message?: MessageProxy;
    type: 'img' | 'video';
    startIndex: number;
    items: PhotoAndVideoSwiperItemsType[];
};
