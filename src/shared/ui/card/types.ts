import { ReactNode } from 'react';

import { companyTypes } from 'entities/company';
import { userTypes } from 'entities/user';

import { UseArrayReturnType } from '../../hooks';
import { BaseTypes } from '../../types';

export type BaseCardProps = {
    img?: string | BaseTypes.Empty;
    icon?: ReactNode;
    name?: string;
    title?: string;
    subtitle?: string;
    visibleAvatar?: boolean;
    size?: 's' | 'm' | 'l';
    onClick?: () => void;
    avatarNetworkStatus?: keyof typeof userTypes.NetworkStatuses;
    avatarEmployeeStatuses?: keyof typeof companyTypes.EmployeeStatuses;
    companyNames?: string[];
} & BaseTypes.Statuses;

export type CardListItem<T = any> = {
    id: string | number;
    payload?: T;
    disabledSelect?: boolean;
    remove?: ((id: number, name: string) => void) | null;
} & BaseCardProps;

export type CardListProps = {
    items: CardListItem[] | BaseTypes.Empty;
    selected?: UseArrayReturnType<CardListItem>;
    sortByName?: boolean;
    visibleLastItem?: (value: boolean) => void;
    activeItem?: number | string | null;
};
