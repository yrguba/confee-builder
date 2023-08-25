import { BaseTypes } from 'shared/types';

export type BaseAudioPlayerProps = {
    url: string;
    size?: number;
    isVisibleMeta?: boolean;
    btnRadius?: number;
    visibleWave?: boolean;
} & BaseTypes.Statuses;

export type AudioListItem = {
    id: number | string;
} & BaseAudioPlayerProps;

export type AudioCardProps = {
    url: string;
    name: string;
    size: number;
} & BaseTypes.Statuses;

export type AudioListProps = {
    items: AudioListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
