import { CSSProperties } from 'react';

import { IconsTypes } from '../index';

export type TabBarItem<T = any> = {
    id: number | string;
    title?: string;
    icon?: IconsTypes.BaseIconsVariants;
    callback: () => void;
    payload?: T;
    hidden?: boolean;
};

export type BaseTabBarProps = {
    items: TabBarItem[];
    activeItemId?: number | string;
    variant?: 'icons';
    bodyStyle?: CSSProperties;
    clickTab?: (tab: TabBarItem) => void;
};

export type TabBarWithLineProps = {
    wrapperStyle?: CSSProperties;
    visibleBorder?: boolean;
} & BaseTabBarProps;
