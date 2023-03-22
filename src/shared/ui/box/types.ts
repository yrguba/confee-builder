import { AnimatePresenceProps, AnimationProps, MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

import * as animationVariants from './animation-variants';
import { baseTypes } from '../../types';

export type AnimationVariants = keyof typeof animationVariants;

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
