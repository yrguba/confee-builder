import React from 'react';

import { ChatProxy } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Title } from '../../../../../shared/ui';
import { CallInActiveCallList } from '../../../model/types';

type Props = {
    chat: ChatProxy | null;
} & BaseTypes.Statuses;

function ActiveCallListModalView(props: Props) {
    const { chat } = props;
    console.log(chat);
    return (
        <div className={styles.wrapper}>
            {chat?.calls?.map((i) => (
                <div key={i.id}>{i.room}</div>
            ))}
        </div>
    );
}

export default ActiveCallListModalView;
