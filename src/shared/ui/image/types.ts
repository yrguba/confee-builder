import { ButtonHTMLAttributes, ReactNode } from 'react';

import { baseTypes } from 'shared/types';

export type ImageProps = {
    img: string;
    size?: number;
} & ButtonHTMLAttributes<HTMLImageElement> &
    baseTypes.Statuses;
