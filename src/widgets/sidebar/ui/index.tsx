import React from 'react';

import { UsersListFeature } from 'features/users';

import styles from './styles.module.scss';

function SidebarWidget() {
    return <div className={styles.sidebar}>{/* <UsersListFeature /> */}</div>;
}

export default SidebarWidget;
