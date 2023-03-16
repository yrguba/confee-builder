export type BreadcrumbItem = {
    id: number;
    path: string;
    name: string;
};

export type BreadcrumbProps = {
    items: BreadcrumbItem[];
    onClick: (arg: BreadcrumbItem) => void;
};
