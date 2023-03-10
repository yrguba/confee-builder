import { ReactNode } from 'react';

export type Tab<T> = {
    id: number;
    text: string;
    icon?: ReactNode;
    path: T;
    breakpoint: number;
};
