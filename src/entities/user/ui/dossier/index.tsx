import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, LoadingIndicator } from 'shared/ui';

import styles from './styles.module.scss';
import { useStyles } from '../../../../shared/hooks';
import { ViewerTypes } from '../../../viewer';
import { User } from '../../model/types';
import UserStatusView from '../status';

type Props = {
    user: User | ViewerTypes.Viewer | BaseTypes.Empty;
    onClick?: (arg: User) => void;
    direction?: 'column' | 'row';
} & BaseTypes.Statuses;

function UserDossierView(props: Props) {
    const { user, onClick, loading, direction, error } = props;

    const wrapperClasses = useStyles(styles, 'wrapper', {
        directionColumn: direction === 'column',
    });

    return (
        <div style={{ cursor: onClick ? 'pointer' : 'default' }} className={wrapperClasses}>
            <LoadingIndicator.Glare visible={!!loading} />
            {user && (
                <>
                    <Avatar circle={false} name={user.first_name} img="" size={direction === 'column' ? 252 : 160} />
                    <div className={styles.infoColumn}>
                        <div className={styles.header}>
                            <div className={styles.caption}>
                                <div className={styles.name}>{user.first_name}</div>
                                <div className={styles.date}>15 января</div>
                            </div>
                            <div className={styles.status}>
                                <UserStatusView status="home-work" />
                            </div>
                        </div>
                        <div className={styles.role}>Android разработчик</div>
                        <div className={styles.department}>IT департамент</div>
                        <div className={styles.division}>Отдел мобильной разработки</div>
                        <div className={styles.emailll}>{user.email}</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserDossierView;
