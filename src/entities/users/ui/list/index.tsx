import React from 'react';

import { baseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes, Card } from '../..';

type Props = {
    list: userTypes.User[] | baseTypes.Empty;
} & baseTypes.Statuses;

function List(props: Props) {
    const { list, loading, error } = props;

    return (
        <Box loading={loading} className={styles.list}>
            {list && list.map((user) => <Card key={user.id} user={user} />)}
        </Box>
    );
}

export default List;
