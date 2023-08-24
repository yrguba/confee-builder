import { BaseTypes } from 'shared/types';

import { ImagesListItem } from '../image/types';

export type BaseVideoPlayerProps = {
    url: string;
    width?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
    borderRadius?: boolean;
} & BaseTypes.Statuses;

export type VideoListItem = {
    id: number | string;
} & BaseVideoPlayerProps;

export type VideoListProps = {
    items: VideoListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;

export type VideoSwiperProps = {
    visible: boolean;
    closeClick: () => void;
    initialSlide?: number;
    items: VideoListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
