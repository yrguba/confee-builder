import { BaseTypes } from 'shared/types';

type SharedProps = {
    id?: number | string;
    url: string;
    name?: string;
    authorName?: string;
} & BaseTypes.Statuses;

export type PlayerProps = {
    id?: number | string;
    url: string;
    name?: string;
    authorName?: string;
};

export type BaseAudioProps = {
    size?: number;
    date?: Date;
    disabledDownloads?: boolean;
} & SharedProps;

export type VoiceProps = {
    disabled?: boolean;
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
