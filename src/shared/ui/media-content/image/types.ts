import { BaseTypes } from 'shared/types';

export type BaseImageProps = {
    url: string;
    width?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
    borderRadius?: boolean;
} & BaseTypes.Statuses;

export type ImagesListItem = {
    id: number | string;
} & BaseImageProps;

export type ImagesListProps = {
    items: ImagesListItem[] | BaseTypes.Empty;
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
