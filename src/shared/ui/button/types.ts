import { ButtonHTMLAttributes, ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

type SharedProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'negative';
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    BaseTypes.Statuses;

export type ButtonBaseProps = {
    size?: number | 's' | 'm';
    width?: string;
    chips?: boolean;
    tag?: boolean;
} & SharedProps;

export type LinkButtonProps = {
    fontSize?: number;
    fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
    gap?: number;
} & SharedProps;

export type CircleButtonProps = {
    radius?: number;
} & SharedProps;
