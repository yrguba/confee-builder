import { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import { AnimationVariants } from '../box/types';

export type DropdownBaseProps = {
    children?: ReactNode;
    content?: ReactNode;
    trigger?: 'left-click' | 'right-click' | 'hover';
    position?: 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
    animationVariant?: AnimationVariants;
    openCloseTrigger?: (arg: boolean) => void;
} & BaseTypes.Statuses;
