import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function SystemMessageView(props: Props) {
    const { text } = props;

    return <div className={styles.wrapper}>{text}</div>;
}

export default SystemMessageView;
