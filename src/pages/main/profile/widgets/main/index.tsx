import React from 'react';

import { UserCard } from 'features/user';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.card}>
                <UserCard />
            </div>
            <div className={styles.addCompanyMail}>addCompanyMail</div>
        </Box.Animated>
    );
}

export default Main;
