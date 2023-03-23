import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Box, Button, LoadingIndicator, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes } from '../..';
import UserStatusView from '../status';

type Props = {
    user: userTypes.User | baseTypes.Empty;
    onClick?: (arg: userTypes.User) => void;
} & baseTypes.Statuses;

function UserDossierView(props: Props) {
    const { user, onClick, loading, error } = props;

    return (
        <div style={{ cursor: onClick ? 'pointer' : 'default' }} className={styles.wrapper}>
            <LoadingIndicator.Glare visible={!!loading} />
            {user && (
                <>
                    <Avatar circle={false} name={user.name} img={user.avatar} size={160} />
                    <div className={styles.infoColumn}>
                        <div className={styles.mainInfo}>
                            <div className={styles.name}>{user.name}</div>
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
