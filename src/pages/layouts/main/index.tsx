import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { Header } from 'widgets';

import styles from './styles.module.scss';

function MainLayout() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;
