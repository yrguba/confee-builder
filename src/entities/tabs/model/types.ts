export type Tab<T> = {
    id: number;
    text: string;
    icon?: T;
    path: T;
    breakpoint: number;
};
