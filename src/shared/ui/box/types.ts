import { AnimatePresenceProps, AnimationProps, MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

import * as animationVariants from './animation-variants';
import { BaseTypes } from '../../types';

export type AnimationVariants = keyof typeof animationVariants;

type Shared = {} & HTMLAttributes<HTMLDivElement> & BaseTypes.Statuses;

export type BaseBoxProps = {
    children?: ReactNode;
} & Shared;

export type AnimatedBoxProps = {
    children?: ReactNode;
    visible: boolean;
    animationVariant?: AnimationVariants;
    presence?: boolean;
    presenceProps?: AnimatePresenceProps;
    backBtn?: boolean;
} & Shared &
    AnimationProps &
    MotionProps;

export type ReplaceBoxProps = {
    items: { item: ReactNode; visible?: boolean }[];
    animationVariant?: AnimationVariants;
} & Shared &
    AnimationProps &
    MotionProps;
