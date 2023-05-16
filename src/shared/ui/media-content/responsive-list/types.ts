import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type ResponsiveMediaContentsProps = {
    list: string[];
    type: 'image' | 'audio' | 'video' | 'document';
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
} & BaseTypes.Statuses;
