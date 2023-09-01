import { companyTypes } from 'entities/company';
import { userTypes } from 'entities/user';

import { UseArrayReturnType } from '../../hooks';
import { BaseTypes } from '../../types';

export type BaseCardProps = {
    img?: string | BaseTypes.Empty;
    name?: string;
    title?: string;
    subtitle?: string;
    visibleAvatar?: boolean;
    size?: 's' | 'm';
    onClick?: () => void;
    avatarStatus?: keyof typeof userTypes.Statuses | null;
};

export type CardListItem<T = any> = {
    id: number;
    payload?: T;
} & BaseCardProps;

export type CardListProps = {
    items: CardListItem[] | BaseTypes.Empty;
    selected?: UseArrayReturnType<CardListItem>;
    sortByName?: boolean;
    visibleLastItem?: (value: boolean) => void;
};
