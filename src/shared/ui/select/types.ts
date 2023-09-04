export type SelectItemInList = {
    id: number;
    title: string;
    callback: (arg?: any) => void;
};

export type SelectProps = {
    items: SelectItemInList[];
    title?: string;
    defaultValue?: string;
    variant?: 'inherit';
};
