import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

export type Trigger = 'contextmenu' | 'click';

export type BaseContextMenuProps = {
    visible: boolean;
    items: ContextMenuItem[];
    trigger?: Trigger;
} & BaseTypes.Statuses;

export type ContextMenuItem = {
    id: number;
    icon?: ReactNode;
    title: string;
    callback: (arg?: any) => void;
    isRed?: boolean;
    hidden?: boolean;
};
