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
    callback?: () => void;
};

export type StoreSelectorType<T> = {
    value: T;
    set: (arg: T) => void;
};
