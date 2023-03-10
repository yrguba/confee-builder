import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { chatTypes } from '../..';

type Props = {
    chat: any;
} & baseTypes.ComponentProps;

function Card(props: Props) {
    const { chat } = props;

    return (
        <div className={styles.userCard}>
            <Avatar name={chat.name} size={32} />
            <Title width={200}>{chat.name}</Title>
            <Title width={200}>{chat.lastMsg}</Title>
        </div>
    );
}

export default Card;
