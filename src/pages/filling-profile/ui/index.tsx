import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';
import { appObserver } from '../../../entities/app';
import Wrapper from '../../wrapper';

function FillingProfilePage() {
    appObserver();

    return (
        <Wrapper>
            <div className={styles.wrapper}>
                <Outlet />
            </div>
        </Wrapper>
    );
}

export default FillingProfilePage;
