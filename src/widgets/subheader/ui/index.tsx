import React from 'react';
import { useLocation } from 'react-router-dom';

import { SwitchingNestedPagesOfCompanyPage } from 'features/tabs';

import styles from './styles.module.scss';

function Subheader() {
    const { pathname } = useLocation();
    const suffixPath: any = pathname.split('/').pop();

    const dictionary: Record<string, any> = {
        company: <SwitchingNestedPagesOfCompanyPage />,
    };
    return (
        <div className={styles.subheader}>
            <div className={styles.tabs}>{dictionary[suffixPath]}</div>
        </div>
    );
}

export default Subheader;
