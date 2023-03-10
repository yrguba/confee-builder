import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderForMainPage } from 'widgets/headers';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function MainPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderForMainPage />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </Wrapper>
    );
}

export default MainPage;
