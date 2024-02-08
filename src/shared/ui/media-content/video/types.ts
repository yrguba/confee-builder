import { CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';
import { SwiperTypes } from 'shared/ui';

export type BaseVideoProps = {
    url: string;
    previewUrl?: string;
    id?: number | string;
    name?: string;
    width?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
    borderRadius?: boolean;
    reset?: boolean;
    visibleCover?: boolean;

    disableDownload?: boolean;
} & BaseTypes.Statuses;

export type VideoListItem = {
    id: number | string;
} & BaseVideoProps;

export type VideoListProps = {
    items: VideoListItem[] | BaseTypes.Empty;
    style?: CSSProperties;

    disableDownload?: boolean;
} & BaseTypes.Statuses;

export type VideoCardProps = {
    videoUrl?: string;
    previewUrl?: string;
    name: string;
    size: number;
} & BaseTypes.Statuses;

export type VideoSwiperProps = {
    visible: boolean;
    closeClick: () => void;
    initialSlide?: number;
    items: VideoListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses &
    SwiperTypes.SwiperProps;
