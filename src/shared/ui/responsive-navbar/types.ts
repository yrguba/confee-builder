import { ReactNode } from 'react';

export type Item<Path, Icon> = {
    id: number;
    text: string;
    icon?: Icon;
    path: Path;
    breakpoint: number;
};

export type Props = {
    itemsInRow: Item<any, any>[];
    itemsInDropdown: Item<any, any>[];
    item: (arg: Item<any, any>) => ReactNode;
    rowGap?: number;
    columnGap?: number;
    btnRadius?: number;
};
