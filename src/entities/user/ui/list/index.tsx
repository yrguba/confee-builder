import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Statuses } from '../../model/types';

type Props = {
    status: Statuses;
} & BaseTypes.Statuses;

function UsersListView(props: Props) {
    const { status } = props;

    return <div className={styles.wrapper}>UsersListView</div>;
}

export default UsersListView;
