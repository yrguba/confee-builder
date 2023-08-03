export type TitleProps = {
    primary?: boolean;
    children: string | number | undefined;
    variant: 'H1' | 'H2' | 'H3B' | 'H3S' | 'H3M' | 'H4S' | 'H4M' | 'Body16' | 'Body14' | 'caption1S' | 'caption1M' | 'caption2S' | 'caption2M';
    isError?: boolean;
    className?: string;
    textWrap?: boolean;
    textAlign?: 'center' | 'left' | 'right';
};
