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
            <div className={styles.card}>
                <UserCardView
                    resize={false}
                    visibleHeader
                    type="user"
                    visibleActionsMenu
                    name={user?.full_name}
                    aboutMe=""
                    avatar={user?.avatar}
                    birth={user?.birth}
                    phone={user?.phone}
                    nickname={user?.nickname}
                    email={user?.email}
                />
            </div>
        </div>
    );
}

export default UserProfileView;
