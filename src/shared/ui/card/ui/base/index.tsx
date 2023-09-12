import React, { useCallback } from 'react';

import styles from './styles.module.scss';
import { useStyles } from '../../../../hooks';
import { Avatar } from '../../../index';
import Title from '../../../title';
import { BaseCardProps } from '../../types';

function Card(props: BaseCardProps) {
    const { loading, img, title, subtitle, onClick, size = 's', name, avatarNetworkStatus, avatarEmployeeStatuses, icon, visibleAvatar = true } = props;

    const getAvatarSize = useCallback(() => {
        if (!visibleAvatar) return 0;
        if (size === 's') return 44;
        if (size === 'm') return 52;
    }, [size, visibleAvatar]);

    const avatarSize = getAvatarSize();

    const classes = useStyles(styles, 'wrapper', {
        [size]: size,
    });

    const titleVar: any = {
        s: 'H4S',
        m: 'H3S',
    };

    const subtitleVar: any = {
        s: 'H4M',
        m: 'H3R',
    };

    return (
        <div className={classes} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            {visibleAvatar && (
                <div className={styles.avatar}>
                    {!icon && (
                        <Avatar
                            loading={loading}
                            employeeStatuses={avatarEmployeeStatuses}
                            networkStatus={avatarNetworkStatus}
                            img={img}
                            name={name}
                            size={avatarSize}
                        />
                    )}
                    {icon && icon}
                </div>
            )}
            <div className={styles.caption} style={{ width: `calc(100% - ${avatarSize}px - 12px)` }}>
                <Title variant={titleVar[size]}>{title}</Title>
                <Title primary={false} variant={subtitleVar[size]}>
                    {subtitle}
                </Title>
            </div>
        </div>
    );
}

export default Card;
