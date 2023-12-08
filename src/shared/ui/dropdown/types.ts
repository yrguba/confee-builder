import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

import { AnimationVariants } from '../box/types';

export type Position = 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';

export type BaseDropdownProps = {
    visible: boolean;
    content?: ReactNode;
    position?: Position;
    animationVariant?: AnimationVariants;
    openCloseTrigger?: (arg: boolean) => void;
    onClick?: () => void;
    clickAway?: () => void;
} & BaseTypes.Statuses;
