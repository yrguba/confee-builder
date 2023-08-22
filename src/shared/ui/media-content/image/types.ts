import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type BaseImageProps = {
    img: string;
    width?: string;
    horizontalImgWidth?: string;
    height?: string;
    onClick?: () => void;
} & BaseTypes.Statuses;

export type ImagesListItem = {} & BaseImageProps;

export type ImagesListProps = {
    items: ImagesListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
