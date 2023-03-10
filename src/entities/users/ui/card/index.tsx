import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { usersTypes } from '../..';

type Props = {
    user: usersTypes.User;
} & baseTypes.ComponentProps;

function UserCard(props: Props) {
    const { user } = props;

    return (
        <div className={styles.userCard}>
            <Avatar name={user.name} size={32} />
            <Title width={200}>{user.name}</Title>
        </div>
    );
}

export default UserCard;
