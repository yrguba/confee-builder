import { BaseTypes } from '../../types';

export type CardProps = {
    img?: string | BaseTypes.Empty;
    title?: string;
    subtitle?: string;
    size?: 's';
    imgCover?: string;
    onClick?: () => void;
};
