import React from 'react';
import { useLocation } from 'react-router-dom';

import { SwitchingNestedPagesOfCompanyPage } from 'features/tabs';

import styles from './styles.module.scss';

function HeaderForCompanyPage() {
    const { pathname } = useLocation();
    const suffixPath: any = pathname.split('/').pop();

    return (
        <div className={styles.header}>
            <div className={styles.tabs}>
                yy
                {/* <SwitchingNestedPagesOfCompanyPage /> */}
            </div>
        </div>
    );
}

export default HeaderForCompanyPage;
