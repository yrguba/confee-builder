import { CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

import { MediaContentType } from '../../../../entities/message/model/types';
import { UseEasyStateReturnType } from '../../../hooks';

export type BaseImageProps = {
    id?: number | string;
    url: string;
    name?: string;
    width?: string;
    maxWidth?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
    borderRadius?: boolean;
    remove?: (id: number | string) => void;
    objectFit?: 'cover' | 'contain';
    clickedFile?: UseEasyStateReturnType<{ blob: Blob; name: string; type: MediaContentType } | null>;
} & BaseTypes.Statuses;

export type ImagesListItem = {
    id: number | string;
} & BaseImageProps;

export type ImagesListProps = {
    items: ImagesListItem[] | BaseTypes.Empty;
    style?: CSSProperties;
    clickedFile?: UseEasyStateReturnType<{ blob: Blob; name: string; type: MediaContentType } | null>;
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
