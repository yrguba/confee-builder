import React from 'react';

import { BaseTypes } from 'shared/types';
import { Document } from 'shared/ui';

import styles from './styles.module.scss';
import { File } from '../../../../model/types';

type Props = {
    documents: File[];
} & BaseTypes.Statuses;

function DocumentsMessage(props: Props) {
    const { documents } = props;

    return (
        <div className={styles.wrapper}>
            {documents.map((i, index) => (
                <Document key={index} url={i.link} name="document" />
            ))}
        </div>
    );
}

export default DocumentsMessage;
