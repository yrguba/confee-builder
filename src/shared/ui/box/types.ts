import { AnimationProps, MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

import { baseTypes } from '../../types';

export type BoxProps = {
    children?: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
    baseTypes.Statuses;

export type BoxAnimateProps = {} & BoxProps & AnimationProps & MotionProps;
