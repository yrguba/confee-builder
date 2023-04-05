import React, { useRef } from 'react';

import { UserTypes, UserCardView } from 'entities/user';
import { useSize, useGrid, useStyles } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    users: UserTypes.User[];
} & BaseTypes.Statuses;

function ChatUsersListView(props: Props) {
    const { users } = props;

    return (
        <div className={styles.wrapper}>
            {users.map((user, index) => (
                <UserCardView key={user.id} user={user} />
            ))}
        </div>
    );
}

export default ChatUsersListView;
