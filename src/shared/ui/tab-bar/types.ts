import { BaseTypes } from 'shared/types';

export type TabBarItem = {
    id: number;
    title: string;
    callback: () => void;
};

export type BaseTabBarProps = {
    items: TabBarItem[];
    activeItemId: number;
};
