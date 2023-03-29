import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Box, Button, LoadingIndicator } from 'shared/ui';

import styles from './styles.module.scss';
import { useStyles } from '../../../../shared/hooks';
import { User } from '../../model/types';
import UserStatusView from '../status';

type Props = {
    user: User | baseTypes.Empty;
    onClick?: (arg: User) => void;
    direction?: 'column' | 'row';
} & baseTypes.Statuses;

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
                    <Avatar circle={false} name={user.name} img={user.avatar} size={direction === 'column' ? 252 : 160} />
                    <div className={styles.infoColumn}>
                        <div className={styles.header}>
                            <div className={styles.caption}>
                                <div className={styles.name}>{user.name}</div>
                                <div className={styles.date}>15 января</div>
                            </div>
                            <div className={styles.status}>
                                <UserStatusView status="home-work" />
                            </div>
                        </div>
                        <div className={styles.role}>Android разработчик</div>
                        <div className={styles.department}>IT департамент</div>
                        <div className={styles.division}>Отдел мобильной разработки</div>
                        <Button.Link active>{user.email}</Button.Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserDossierView;
