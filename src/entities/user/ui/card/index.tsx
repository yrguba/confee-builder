import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { User } from '../../model/types';

type Props = {
    user: User;
    size?: 's' | 'm';
    onClick?: (arg: User) => void;
} & BaseTypes.Statuses;

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
            <Avatar img={user.avatar} name={user.name} size={getAvatarSize()} />
            <div className={styles.infoColumn}>
                <Title size={getFontSize()}>{user.name}</Title>
                {size !== 's' && <div className={styles.email}>{user.email}</div>}
            </div>
        </div>
    );
}

export default UserCardView;
