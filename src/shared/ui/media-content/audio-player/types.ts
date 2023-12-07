import { BaseTypes } from 'shared/types';

import { MediaContentType } from '../../../../entities/message/model/types';
import { UseEasyStateReturnType } from '../../../hooks';

export type BaseAudioPlayerProps = {
    url: string;
    id?: number | string;
    name?: string;
    size?: number;
    isVisibleMeta?: boolean;
    btnRadius?: number;
    visibleWave?: boolean;
    disabled?: boolean;
    clickedFile?: UseEasyStateReturnType<{ blob: Blob; name: string; id: number | string; type: MediaContentType } | null>;
} & BaseTypes.Statuses;

export type AudioListItem = {
    id: number | string;
} & BaseAudioPlayerProps;

export type AudioCardProps = {
    url: string;
    name: string;
    size: number;
    disabled?: boolean;
} & BaseTypes.Statuses;

export type AudioListProps = {
    items: AudioListItem[] | BaseTypes.Empty;
} & BaseTypes.Statuses;
