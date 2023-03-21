export type SelectItemInList = {
    id: number;
    title: string;
};

export type SelectProps = {
    items: SelectItemInList[];
    defaultValue?: string;
};
