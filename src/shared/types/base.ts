import { ReactNode } from 'react';

export type Empty = undefined | null | '';

export type Statuses = {
    active?: boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: string;
};

export type Error = {
    message: string;
    type: string;
};
