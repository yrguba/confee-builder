import { ReactNode } from 'react';

import { baseTypes } from 'shared/types';

import { AnimationVariants } from '../box/types';

export type DropdownMenuItem = {
    id: number;
    title: string;
    icon?: ReactNode;
    onclick: () => void;
};

export type DropdownBaseProps = {
    children: ReactNode;
    trigger?: 'left-click' | 'right-click' | 'hover';
    position?: 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
    animationVariant?: AnimationVariants;
    items?: DropdownMenuItem[];
    content?: ReactNode;
} & baseTypes.Statuses;
