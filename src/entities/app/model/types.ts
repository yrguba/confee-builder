export type ValuesInStorage = 'access_token' | 'refresh_token' | 'theme' | 'notification_scope' | 'viewer_id' | 'cache_size';

export type ImagesSwiperProps = {
    images: string[];
    startIndex: number;
};
export type Modals = {
    imagesSwiper: ImagesSwiperProps;
};
export type SocketIn = 'UWS_CLIENT_IDENTIFICATION';
