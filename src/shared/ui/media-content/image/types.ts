import { ButtonHTMLAttributes, ReactNode } from 'react';

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
