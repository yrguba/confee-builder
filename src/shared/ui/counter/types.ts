export type CounterProps = {
    children: number | undefined;
    height?: number;
    maxVisibleNumber?: number;
    zeroVisible?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'negative';
};
