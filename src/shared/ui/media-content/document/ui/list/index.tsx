import React from 'react';

import styles from './styles.module.scss';
import { DocumentsListProps } from '../../types';
import Document from '../base';

function DocumentList(props: DocumentsListProps) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            {items?.map((i) => (
                <div className={styles.item}>
                    <Document key={i.id} {...i} />
                </div>
            ))}
        </div>
    );
}

export default DocumentList;
