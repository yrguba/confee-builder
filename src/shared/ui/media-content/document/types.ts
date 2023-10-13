import { BaseTypes } from 'shared/types';

export type BaseDocumentProps = {
    url: string;
    name?: string;
    size?: number;
    extension?: string;
    disableDownload?: boolean;
};

export type DocumentsListItemProps = {
    id: number | string;
} & BaseDocumentProps;

export type DocumentsListProps = {
    items: DocumentsListItemProps[] | BaseTypes.Empty;
};
