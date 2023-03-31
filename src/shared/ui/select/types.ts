export type SelectItemInList = {
    id: number;
    title: string;
};

export type SelectProps = {
    items: SelectItemInList[];
    onChange: (arg: SelectItemInList) => void;
    defaultValue?: string;
};
