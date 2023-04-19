export type SelectItemInList = {
    id: number;
    title: string;
};

export type SelectProps = {
    items: SelectItemInList[];
    title?: string;
    onChange: (arg: string) => void;
    defaultValue?: string;
};
