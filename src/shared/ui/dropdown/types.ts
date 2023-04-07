import { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import { AnimationVariants } from '../box/types';

export type Position = 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
export type Trigger = 'left-click' | 'right-click' | 'hover';

export type DropdownBaseProps = {
    children?: ReactNode;
    content?: ReactNode;
    trigger?: Trigger;
    position?: Position;
    animationVariant?: AnimationVariants;
    openCloseTrigger?: (arg: boolean) => void;
    top?: number | string;
    left?: number | string;
} & BaseTypes.Statuses;
