import { BaseTypes } from 'shared/types';

export type BaseAudioPlayerProps = {
    url: string;
    size?: number;
    isVisibleMeta?: boolean;
} & BaseTypes.Statuses;

export type AudioListItem = {
    id: number | string;
} & BaseAudioPlayerProps;

export type AudioListProps = {
    items: AudioListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
