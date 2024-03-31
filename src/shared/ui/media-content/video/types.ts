import { CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

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
    visibleDropdown?: boolean;
} & BaseTypes.Statuses;

export type VideoListItem = {
    id: number | string;
} & BaseVideoProps;

export type VideoListProps = {
    items: VideoListItem[] | BaseTypes.Empty;
    style?: CSSProperties;
    videoClick?: (index: number) => void;
    visibleDropdown?: boolean;
} & BaseTypes.Statuses;

export type VideoCardProps = {
    videoUrl?: string;
    previewUrl?: string;
    name: string;
    size: number;
} & BaseTypes.Statuses;
