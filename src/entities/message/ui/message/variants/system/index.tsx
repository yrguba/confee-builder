import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function SystemMessage(props: Props) {
    const { text } = props;

    if (!text) return null;

    return <div className={styles.wrapper}>{text}</div>;
}

export default SystemMessage;
