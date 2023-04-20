import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type AudioPlayerProps = {
    url: string;
} & BaseTypes.Statuses;
