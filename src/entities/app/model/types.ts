export type SocketIn = 'UWS_CLIENT_IDENTIFICATION';

export type NetworkState = {
    online: boolean;
    speed?: 'fast' | 'slow' | 'no';
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    downlink?: number;
};
