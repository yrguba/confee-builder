import { ReactNode } from 'react';

export type ResponsiveNavbarItem<Path, Icon> = {
    id: number;
    text: string;
    icon?: Icon;
    path: Path;
    breakpoint: number;
};

export type ResponsiveNavbarProps = {
    itemsInRow: ResponsiveNavbarItem<any, any>[];
    itemsInDropdown: ResponsiveNavbarItem<any, any>[];
    item: (arg: ResponsiveNavbarItem<any, any>) => ReactNode;
    rowGap?: number;
    columnGap?: number;
    btnRadius?: number;
};
