import React, { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    children: ReactNode;
    message: MessageProxy;
} & BaseTypes.Statuses;

function WrapperForForwarded(props: Props) {
    const { message, children } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.userName}>{message.user.name}</div>
            <div className={styles.messageBody}>{children}</div>
        </div>
    );
}

export default WrapperForForwarded;
