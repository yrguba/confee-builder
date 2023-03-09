import React from 'react';

import { Subheader } from 'widgets/subheader';

import styles from './styles.module.scss';

function CompanyPage() {
    return (
        <div className={styles.page}>
            <div>
                <Subheader />
                CompanyNestedPage
            </div>
        </div>
    );
}

export default CompanyPage;
