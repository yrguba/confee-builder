import { BaseTypes } from '../../types';

export type CardProps = {
    img?: string | BaseTypes.Empty;
    name?: string;
    title?: string;
    subtitle?: string;
    size?: 's' | 'm';
    onClick?: () => void;
};
