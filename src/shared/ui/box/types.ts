import { AnimationProps, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

import { baseTypes } from '../../types';

export type BoxProps = {
    skeletonCount?: number;
} & HTMLAttributes<HTMLDivElement> &
    baseTypes.ComponentProps;

export type BoxAnimateProps = {} & BoxProps & AnimationProps & MotionProps;
