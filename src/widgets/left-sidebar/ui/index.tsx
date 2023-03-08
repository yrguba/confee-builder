import React from 'react';

import { UsersListFeature } from 'features/users';

import styles from './styles.module.scss';

function LeftSidebarWidget() {
    return (
        <div className={styles.leftSidebar}>
            <UsersListFeature />
        </div>
    );
}

export default LeftSidebarWidget;
