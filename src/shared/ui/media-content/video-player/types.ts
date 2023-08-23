import { BaseTypes } from 'shared/types';

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

export type AudioListProps = {
    items: VideoListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
