import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { User } from '../../model/types';

type Props = {
    user: User;
    size?: 's' | 'm';
    onClick?: (arg: User) => void;
    subtitle?: string;
} & BaseTypes.Statuses;

function UserCardView(props: Props) {
    const { user, size = 's', onClick, subtitle } = props;

    const getAvatarSize = () => {
        if (size === 's') return 32;
        if (size === 'm') return 50;
    };

    const getFontSize = () => {
        if (size === 's') return 16;
        if (size === 'm') return 20;
    };

    return (
        <div style={{ cursor: onClick ? 'pointer' : 'default' }} className={styles.userCard} onClick={() => onClick && onClick(user)}>
            <Avatar img={user.avatars[0]} name={user.first_name} size={getAvatarSize()} />
            <div className={styles.infoColumn} style={{ flexDirection: size === 's' ? 'row' : 'column' }}>
                <Title size={getFontSize()}>{user.first_name}</Title>
                {subtitle && <div className={styles.email}>{subtitle}</div>}
            </div>
        </div>
    );
}

export default UserCardView;
