import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Message } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function SystemMessageView(props: Props) {
    const { text } = props;

    // const date = useDate(message.created_at);

    return <div>{text}</div>;
}

export default SystemMessageView;
