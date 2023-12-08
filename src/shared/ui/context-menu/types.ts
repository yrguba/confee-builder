import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

export type Position = 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
export type Trigger = 'left-click' | 'right-click' | 'hover' | null;

export type BaseContextMenuProps = {
    visible: boolean;
    items: ContextMenuItem[];
} & BaseTypes.Statuses;

export type ContextMenuItem = {
    id: number;
    icon?: ReactNode;
    title: string;
    callback: (arg?: any) => void;
    isRed?: boolean;
    hidden?: boolean;
};
