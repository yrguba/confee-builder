import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

import { AnimationVariants } from '../box/types';

export type Position = 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
export type Trigger = 'left-click' | 'right-click' | 'hover' | null;

export type BaseDropdownProps = {
    children?: ReactNode;
    visible?: boolean;
    content?: ReactNode;
    trigger?: Trigger;
    position?: Position;
    animationVariant?: AnimationVariants;
    openCloseTrigger?: (arg: boolean) => void;
    closeAfterClick?: boolean;
    top?: number;
    left?: number;
    style?: CSSProperties;
} & BaseTypes.Statuses;

export type DynamicDropdownProps = {
    reverseY?: boolean;
    reverseX?: boolean;
    style?: CSSProperties;
} & BaseDropdownProps;

export type DropdownMenuItem = {
    id: number;
    icon?: ReactNode;
    title: string;
    action: (arg?: any) => void;
    isRed?: boolean;
};

export type DropdownMenuProps = {
    items: DropdownMenuItem[];
} & BaseDropdownProps;
