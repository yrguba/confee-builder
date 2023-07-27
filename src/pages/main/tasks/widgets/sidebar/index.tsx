import React from 'react';

import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Icons variants="filter" />
                <div className={styles.title}>Фильтры</div>
            </div>
            <div className={styles.filters} />
        </div>
    );
}

export default Sidebar;
