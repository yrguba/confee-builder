import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function ForwardMessage(props: Props) {
    const { message } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Title active variant="H4S">
                    {`Переслано от ${message.authorName}`}
                </Title>
            </div>
        </div>
    );
}

export default ForwardMessage;
