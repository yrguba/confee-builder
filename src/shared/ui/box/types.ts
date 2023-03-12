import { AnimatePresenceProps, AnimationProps, MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

import { baseTypes } from '../../types';

export type AnimationVariants = 'visible-hidden' | 'auto-height';

type Shared = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
    baseTypes.Statuses;

export type AnimatedBoxProps = {
    visible: boolean;
    animationVariant?: AnimationVariants;
    presence?: boolean;
    presenceProps?: AnimatePresenceProps;
} & Shared &
    AnimationProps &
    MotionProps;

export type BaseBoxProps = {} & Shared;
