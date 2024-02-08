import { BaseTypes } from 'shared/types';

type SharedProps = {
    id?: number | string;
    url: string;
    name?: string;
    authorName?: string;
} & BaseTypes.Statuses;

export type AudioForPlayer = {
    id: number | string;
    apiUrl: string;
    name?: string;
    authorName?: string;
    description?: string;
    src: string;
    currentTime?: string;
    duration?: string;
    currentSec?: number;
};

export type PlayerProps = {
    width: number;
    sliderPosition?: 'top' | 'bottom';
    autoHeight?: boolean;
};

export type BaseAudioProps = {
    disabledDownloads?: boolean;
    description?: string;
    cover?: string;
} & SharedProps;

export type VoiceProps = {
    disabled?: boolean;
    date?: Date;
} & SharedProps;

export type TimingProps = {
    currentSec: number;
    totalSec: number;
    visible: boolean;
};

export type AudioListItem = {
    id: number | string;
} & BaseAudioProps;

export type AudioListProps = {
    items: AudioListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
