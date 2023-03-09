import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'widgets/header';
import { SidebarWidget } from 'widgets/sidebar';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function MainPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.main}>
                    <div className={styles.sidebar}>
                        <SidebarWidget />
                    </div>
                    <div className={styles.nestedPages}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default MainPage;
