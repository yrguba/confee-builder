import React, { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Document, Image } from '../../../../../shared/ui';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function DocumentMessageView(props: Props) {
    const { message, reactionClick } = props;

    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>
                {message.files.map((file, index) => (
                    <div key={index} className={styles.row}>
                        {/* <Document url={http.url + file.url} size={file.size} name={file.name} /> */}
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default DocumentMessageView;
