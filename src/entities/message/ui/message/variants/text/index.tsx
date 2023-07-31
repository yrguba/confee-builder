import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;

    return <Box className={styles.wrapper}>{text}</Box>;
}

export default TextMessage;
