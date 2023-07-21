export type SelectItemInList = {
    id: number;
    title: string;
    action: (arg?: any) => void;
};

export type SelectProps = {
    items: SelectItemInList[];
    title?: string;
    defaultValue?: string;
};
