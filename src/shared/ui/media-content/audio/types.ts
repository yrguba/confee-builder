import { BaseTypes } from 'shared/types';

export type BaseAudioProps = {
    url: string;
    id?: number | string;
    author: string;
    songName: string;
} & BaseTypes.Statuses;

export type VoicePlayerProps = {
    url: string;
    id?: number | string;
    name?: string;
    size?: number;
    isVisibleMeta?: boolean;
    btnRadius?: number;
    visibleWave?: boolean;
    disabled?: boolean;
} & BaseTypes.Statuses;

export type AudioListItem = {
    id: number | string;
} & BaseAudioProps;

export type AudioCardProps = {
    url: string;
    name: string;
    size: number;
    disabled?: boolean;
} & BaseTypes.Statuses;

export type AudioListProps = {
    items: AudioListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
