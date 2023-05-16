import React from 'react';

import { UserTypes, UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    users: UserTypes.User[];
    userClick: (user: UserTypes.User) => void;
} & BaseTypes.Statuses;

function ChatUsersListView(props: Props) {
    const { users, userClick } = props;

    return (
        <div className={styles.wrapper}>
            {users.map((user, index) => (
                <UserCardView onClick={userClick} key={user.id} user={user} />
            ))}
        </div>
    );
}

export default ChatUsersListView;
