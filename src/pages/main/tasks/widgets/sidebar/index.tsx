import React from 'react';

import { FilterByCreationDate, FilterByDeadLine, FilterByCustomer, FilterByPriority } from 'features/task';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Icons variants="filter" />
                <div className={styles.title}>Фильтры</div>
            </div>
            <div className={styles.filters}>
                <FilterByCreationDate />
                <FilterByDeadLine />
                <FilterByCustomer />
                <FilterByPriority />
            </div>
        </div>
    );
}

export default Sidebar;
