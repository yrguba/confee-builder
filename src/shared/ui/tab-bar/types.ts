import { IconsTypes } from '../index';

export type TabBarItem = {
    id: number | string;
    title?: string;
    icon?: IconsTypes.BaseIconsVariants;
    callback: () => void;
};

export type BaseTabBarProps = {
    items: TabBarItem[];
    activeItemId: number;
    variant?: 'icons';
};
