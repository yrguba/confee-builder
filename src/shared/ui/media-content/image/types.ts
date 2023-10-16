import { CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

export type BaseImageProps = {
    id?: number | string;
    url: string;
    width?: string;
    maxWidth?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
    borderRadius?: boolean;
    remove?: (id: number | string) => void;
    objectFit?: 'cover' | 'contain';
} & BaseTypes.Statuses;

export type ImagesListItem = {
    id: number | string;
} & BaseImageProps;

export type ImagesListProps = {
    items: ImagesListItem[] | BaseTypes.Empty;
    style?: CSSProperties;
} & BaseTypes.Statuses;

export type ImageCardProps = {
    url: string;
    name: string;
    size: number;
} & BaseTypes.Statuses;

export type ImagesSwiperProps = {
    visible: boolean;
    closeClick: () => void;
    initialSlide?: number;
    items: ImagesListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
