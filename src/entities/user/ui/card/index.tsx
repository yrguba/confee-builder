import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes } from '../..';

type Props = {
    user: userTypes.User;
    size?: 's' | 'm';
    onClick?: (arg: userTypes.User) => void;
} & baseTypes.Statuses;

function UserCardView(props: Props) {
    const { user, size = 's', onClick } = props;

    const getAvatarSize = () => {
        if (size === 's') return 32;
        if (size === 'm') return 60;
    };

    const getFontSize = () => {
        if (size === 's') return 16;
        if (size === 'm') return 20;
    };

    return (
        <div style={{ cursor: onClick ? 'pointer' : 'default' }} className={styles.userCard} onClick={() => onClick && onClick(user)}>
            <Avatar name={user.name} size={getAvatarSize()} />
            <div className={styles.infoColumn}>
                <Title width={220} size={getFontSize()}>
                    {user.name}
                </Title>
                {size !== 's' && <div className={styles.email}>{user.email}</div>}
            </div>
        </div>
    );
}

export default UserCardView;
