import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

type SharedProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'negative' | 'inherit';
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    animateTrigger?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    BaseTypes.Statuses;

export type BaseButtonProps = {
    size?: number | 's' | 'm';
    direction?: 'vertical' | 'horizontal';
    width?: string;
    height?: string;
    chips?: boolean;
    tag?: boolean;
} & SharedProps;

export type CircleButtonProps = {
    radius?: number;
} & SharedProps;
