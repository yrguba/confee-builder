export type BreadcrumbItem = {
    id: number;
};

export type BreadcrumbProps = {
    items: BreadcrumbItem[];
    onClick: (arg: BreadcrumbItem) => void;
};
