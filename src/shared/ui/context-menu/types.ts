import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

import { DropdownTypes } from '../index';

export type BaseContextMenuProps = {
    visible: boolean;
    items: ContextMenuItem[];
    mouseLeave?: () => void;
} & BaseTypes.Statuses &
    DropdownTypes.BaseDropdownProps;

export type ContextMenuItem = {
    id: number;
    icon?: ReactNode;
    title: string;
    callback: (arg?: any) => void;
    isRed?: boolean;
    hidden?: boolean;
};
