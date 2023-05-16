import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type ResponsiveMediaContentsProps = {
    list: { url: string; name: string }[];
    type: 'images' | 'audios' | 'videos' | 'documents';
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
} & BaseTypes.Statuses;
