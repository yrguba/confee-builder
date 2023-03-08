import React from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { usersTypes } from '../..';

type Props = {
    user: usersTypes.User;
} & baseTypes.ComponentProps;

function UserCard(props: Props) {
    const { user } = props;

    return <div className={styles.userCard}>{user.name}</div>;
}

export default UserCard;
