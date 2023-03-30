export type Empty = undefined | null;

export type Statuses = {
    active?: boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
};

export type Error = {
    message: string;
    type: string;
};
