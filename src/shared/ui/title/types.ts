import { BaseTypes } from 'shared/types';

export type TitleVariants =
    | 'H1'
    | 'H2'
    | 'H3B'
    | 'H3S'
    | 'H3M'
    | 'H3R'
    | 'H4S'
    | 'H4M'
    | 'Body16'
    | 'Body14'
    | 'caption1S'
    | 'caption1M'
    | 'caption2S'
    | 'caption2M';
export type TitleProps = {
    primary?: boolean;
    children: string | number | undefined;
    variant: TitleVariants;
    isError?: boolean;
    className?: string;
    textWrap?: boolean;
    textAlign?: 'center' | 'left' | 'right';
    animateTrigger?: string;
    updCallback?: ((value: string | number | undefined) => void) | null;
} & BaseTypes.Statuses;
