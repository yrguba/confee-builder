import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes } from '../..';

type Props = {
    user: userTypes.User;
} & baseTypes.ComponentProps;

function Card(props: Props) {
    const { user } = props;

    return (
        <div className={styles.userCard}>
            <Avatar name={user.name} size={32} />
            <Title width={200}>{user.name}</Title>
        </div>
    );
}

export default Card;
