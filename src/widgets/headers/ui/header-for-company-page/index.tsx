import React from 'react';

import { SwitchingNestedPagesOfCompanyPage } from 'features/tabs';

import styles from './styles.module.scss';

function HeaderForCompanyPage() {
    return (
        <div className={styles.header}>
            <div className={styles.tabs}>
                <SwitchingNestedPagesOfCompanyPage />
            </div>
        </div>
    );
}

export default HeaderForCompanyPage;
