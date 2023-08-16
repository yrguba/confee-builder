import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type BaseAudioPlayerProps = {
    url: string;
} & BaseTypes.Statuses;

export type VoiceAudioPlayerProps = {
    url: string;
    size?: number;
    isVisibleMeta?: boolean;
} & BaseTypes.Statuses;
