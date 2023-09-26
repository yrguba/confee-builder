import React, { memo, useCallback } from 'react';

import styles from './styles.module.scss';
import { CompanyTagView } from '../../../../../entities/company';
import { messageService } from '../../../../../entities/message';
import { createMemo, useStyles } from '../../../../hooks';
import { Avatar } from '../../../index';
import Title from '../../../title';
import { BaseCardProps } from '../../types';

const memoAvatarSize = createMemo((visibleAvatar, size) => {
    if (!visibleAvatar) return 0;
    if (size === 's') return 36;
    if (size === 'm') return 44;
    if (size === 'l') return 52;
});

function Card(props: BaseCardProps) {
    const {
        companyNames,
        loading,
        img,
        title,
        subtitle,
        onClick,
        size = 'm',
        name,
        avatarNetworkStatus,
        avatarEmployeeStatuses,
        icon,
        visibleAvatar = true,
    } = props;

    const avatarSize = memoAvatarSize(visibleAvatar, size);

    const classes = useStyles(styles, 'wrapper', {
        [size]: size,
    });

    const titleVar: any = {
        s: 'H4S',
        m: 'H4S',
        l: 'H3S',
    };

    const subtitleVar: any = {
        s: 'H4M',
        m: 'H4M',
        l: 'H3M',
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
                <div className={styles.title}>
                    <Title textAlign="left" variant={titleVar[size]}>
                        {title}
                    </Title>
                    {companyNames?.length ? <CompanyTagView name={companyNames[0]} /> : null}
                </div>

                <Title primary={false} variant={subtitleVar[size]}>
                    {subtitle}
                </Title>
            </div>
        </div>
    );
}
export default memo(Card, (prevProps, nextProps): any => {
    if (prevProps.img !== nextProps.img) return false;
    if (prevProps.subtitle !== nextProps.subtitle) return false;
    if (prevProps.avatarNetworkStatus !== nextProps.avatarNetworkStatus) return false;
    return true;
});
// export default Card;
