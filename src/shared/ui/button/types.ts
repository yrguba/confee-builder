import { ButtonHTMLAttributes, ReactNode } from 'react';

import { baseTypes } from 'shared/types';

type SharedProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    baseTypes.Statuses;

export type ButtonBaseProps = {
    size?: number | 's' | 'm' | 'l' | 'xl';
} & SharedProps;

export type LinkButtonProps = {
    fontSize?: number;
    fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    gap?: number;
} & SharedProps;

export type CircleButtonProps = {
    radius?: number;
} & SharedProps;
