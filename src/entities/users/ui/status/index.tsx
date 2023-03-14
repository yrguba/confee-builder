import React from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { UserStatuses } from '../../model/types';

type Props = {
    status: UserStatuses;
} & baseTypes.Statuses;

function UserStatus(props: Props) {
    const { status } = props;

    return <div>{status}</div>;
}

export default UserStatus;
