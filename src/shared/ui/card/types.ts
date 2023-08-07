import { userTypes } from 'entities/user';

import { BaseTypes } from '../../types';

export type BaseCardProps = {
    img?: string | BaseTypes.Empty;
    name?: string;
    title?: string;
    subtitle?: string;
    size?: 's' | 'm';
    onClick?: () => void;
    avatarStatus?: keyof typeof userTypes.Statuses | null;
};
