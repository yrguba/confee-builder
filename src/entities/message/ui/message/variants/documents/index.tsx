import React from 'react';

import { BaseTypes } from 'shared/types';
import { Document } from 'shared/ui';

import styles from './styles.module.scss';
import { UseEasyStateReturnType } from '../../../../../../shared/hooks';
import { File, MediaContentType, MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function DocumentsMessage(props: Props) {
    const { message } = props;

    return (
        <div className={styles.wrapper}>
            {message.files.map((i, index) => (
                <div key={i.id} className={styles.item}>
                    <Document id={i.id} url={i.url} name={i.name} extension={i.extension} />
                </div>
            ))}
        </div>
    );
}

export default DocumentsMessage;
