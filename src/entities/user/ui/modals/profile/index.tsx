import React from 'react';

import { UserCardView } from 'entities/user/index';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { UserProxy } from '../../../model/types';

type Props = {
    user: UserProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function UserProfileView(props: Props) {
    const { user } = props;

    return (
        <div className={styles.wrapper}>
            <UserCardView resize={false} visibleHeader type="user" visibleActionsMenu user={user} />
        </div>
    );
}

export default UserProfileView;
