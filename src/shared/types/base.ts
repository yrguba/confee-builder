export type Empty = undefined | null;

export type Statuses = {
    active?: boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
};

export type Item<I, P> = {
    id: number;
    title: string;
    icon?: I;
    payload: P;
};
