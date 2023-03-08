import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderWidget } from 'widgets/header';
import { LeftSidebarWidget } from 'widgets/left-sidebar';
import { NestedPagesTabsWidget } from 'widgets/nested-pages-tabs';

import styles from './styles.module.scss';
import Wrapper from '../wrapper';

function MainPage() {
    return (
        <Wrapper>
            <div className={styles.main}>
                <div className={styles.leftSidebar}>
                    <LeftSidebarWidget />
                </div>
                <div className={styles.mainColumn}>
                    <HeaderWidget />
                    <NestedPagesTabsWidget />
                    <Outlet />
                </div>
            </div>
        </Wrapper>
    );
}

export default MainPage;
