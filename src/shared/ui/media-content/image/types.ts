import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

export type ImageProps = {
    img: string;
    width?: string;
    height?: string;
} & ButtonHTMLAttributes<HTMLImageElement> &
    BaseTypes.Statuses;
