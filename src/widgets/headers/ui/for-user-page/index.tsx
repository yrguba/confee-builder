import React from 'react';

import { UserPageNavigation } from 'features/navbars';

import styles from './styles.module.scss';

function HeaderForUserPage() {
    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <UserPageNavigation />
            </div>
        </div>
    );
}

export default HeaderForUserPage;
