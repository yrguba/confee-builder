import { BaseTypes } from 'shared/types';

import { File, MediaContentType } from '../../../../entities/message/model/types';
import { UseEasyStateReturnType } from '../../../hooks';

export type BaseDocumentProps = {
    url: string;
    id?: number | string;
    name?: string;
    size?: number;
    extension?: string;
    disableDownload?: boolean;
    date?: Date;
};

export type DocumentsListItemProps = {
    id: number | string;
} & BaseDocumentProps;

export type DocumentsListProps = {
    items: DocumentsListItemProps[] | BaseTypes.Empty;
};
