import React from 'react';

import { baseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { usersTypes, UserCard } from '../..';

type Props = {
    list: usersTypes.User[] | baseTypes.Empty;
} & baseTypes.ComponentProps;

function UsersList(props: Props) {
    const { list, loading, error } = props;

    return (
        <Box skeletonCount={100} className={styles.list} loading>
            {list && list.map((user) => <UserCard key={user.id} user={user} />)}
        </Box>
    );
}

export default UsersList;
