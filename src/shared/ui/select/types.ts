export type SelectItemInList = {
    id: number;
    title: string;
};

export type SelectProps = {
    items: SelectItemInList[];
    title?: string;
    onChange: (arg: SelectItemInList) => void;
    defaultValue?: string;
};
