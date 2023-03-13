export type Props = {
    children: string | number | undefined;
    secondary?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    animation?: boolean;
    size?: number;
    width?: number;
    align?: 'left' | 'center' | 'right';
};
