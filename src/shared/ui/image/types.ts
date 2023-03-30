import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type ImageProps = {
    img: string;
    size?: number;
} & ButtonHTMLAttributes<HTMLImageElement> &
    BaseTypes.Statuses;
