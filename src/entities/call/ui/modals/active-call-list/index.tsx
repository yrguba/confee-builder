import React from 'react';

import { ChatProxy } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { CallInActiveCallList } from '../../../model/types';

type Props = {
    chat: ChatProxy;
} & BaseTypes.Statuses;

function ActiveCallListModalView(props: Props) {
    const { chat } = props;
    console.log(chat);
    return <div className={styles.wrapper}>ActiveCallListModalView</div>;
}

export default ActiveCallListModalView;
