export type PageClick = (arg: number) => void;

export type PaginationProps = {
    pageCount: number;
    pageClick: PageClick;
};
