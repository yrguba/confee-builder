import { ReactNode } from 'react';

type Shared = {
    item: (arg: ResponsiveNavbarItem<any, any>) => ReactNode;
};

export type ResponsiveNavbarItem<Path, Icon> = {
    id: number;
    text: string;
    icon?: Icon;
    path: Path;
    breakpoint: number;
};

export type BaseNavbarProps = {
    items: ResponsiveNavbarItem<any, any>[];
    gap?: number;
    direction: 'column' | 'row';
} & Shared;

export type ResponsiveNavbarProps = {
    itemsInRow: ResponsiveNavbarItem<any, any>[];
    itemsInDropdown: ResponsiveNavbarItem<any, any>[];
    rowGap?: number;
    columnGap?: number;
    btnRadius?: number;
} & Shared;
