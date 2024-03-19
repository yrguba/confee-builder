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
    | 'H4R'
    | 'Body16'
    | 'Body14'
    | 'caption1S'
    | 'caption1M'
    | 'caption2S'
    | 'caption2M';

export type BaseTitleProps = {
    primary?: boolean;
    children: string | number | undefined;
    variant: TitleVariants;
    isError?: boolean;
    className?: string;
    textWrap?: boolean;
    wordBreak?: boolean;
    textAlign?: 'center' | 'left' | 'right';
    animateTrigger?: string;
    updCallback?: ((value: string | number | undefined) => void) | null;
    maxLength?: number;
    color?: 'red' | 'inactive' | 'green' | 'fixed' | '';
    replaceEmoji?: boolean;
    textSelect?: boolean;
} & BaseTypes.Statuses;

export type TitleReplaceEmoji = {
    children: string;
} & BaseTypes.Statuses;
