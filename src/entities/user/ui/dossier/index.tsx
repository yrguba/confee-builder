import React from 'react';

import { baseTypes } from 'shared/types';
import { Avatar, Box, Button, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes } from '../..';

type Props = {
    user: userTypes.User | baseTypes.Empty;
    onClick?: (arg: userTypes.User) => void;
} & baseTypes.Statuses;

function UserDossierView(props: Props) {
    const { user, onClick, loading, error } = props;

    return (
        <Box.Animated visible loading={loading} style={{ cursor: onClick ? 'pointer' : 'default' }} className={styles.wrapper}>
            {user && (
                <>
                    <Avatar circle={false} name={user.name} img={user.avatar} size={160} />
                    <div className={styles.infoColumn}>
                        <div className={styles.mainInfo}>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.status}>status</div>
                        </div>
                        <div className={styles.role}>Android разработчик</div>
                        <div className={styles.department}>IT департамент</div>
                        <div className={styles.division}>Отдел мобильной разработки</div>
                        <Button.Link active>{user.email}</Button.Link>
                    </div>
                </>
            )}
        </Box.Animated>
    );
}

export default UserDossierView;
