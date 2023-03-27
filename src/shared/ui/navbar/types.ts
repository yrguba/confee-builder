import { ReactNode } from 'react';

import { DropdownBaseProps } from '../dropdown/types';

type Shared = {
    item: (arg: any) => ReactNode;
};

export type BaseItem<Path, Icon> = {
    id: number;
    text: string;
    icon?: Icon;
    path: Path;
};

export type ResponsiveItem<Path, Icon> = {
    breakpoint: number;
} & BaseItem<Path, Icon>;

export type BaseNavbarProps = {
    items: BaseItem<any, any>[];
    gap?: number;
    direction?: 'column' | 'row';
    align?: 'start' | 'center' | 'end';
} & Shared;

export type ResponsiveNavbarProps = {
    itemsInRow: ResponsiveItem<any, any>[];
    itemsInDropdown: ResponsiveItem<any, any>[];
    rowGap?: number;
    columnGap?: number;
    btnRadius?: number;
    dropDownProps?: DropdownBaseProps;
} & Shared;

export type NavbarWithLineProps = {
    items: BaseItem<any, any>[];
    direction?: 'column' | 'row';
    activeItemId: number;
    gap?: number;
} & Shared;