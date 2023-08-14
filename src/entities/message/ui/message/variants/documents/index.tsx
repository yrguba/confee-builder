import React from 'react';

import { BaseTypes } from 'shared/types';
import { Document } from 'shared/ui';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../app';

type Props = {
    documents: string[];
    // clickImage: (data: appTypes.ImagesSwiperProps) => void;
} & BaseTypes.Statuses;

function DocumentsMessage(props: Props) {
    const { documents } = props;
    console.log(documents);
    return (
        <div className={styles.wrapper}>
            {documents.map((i, index) => (
                <Document key={index} url={i} name="document" />
            ))}
        </div>
    );
}

export default DocumentsMessage;
