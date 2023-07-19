import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Icons, Steps } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const activeStep = Number(pathname.slice(-1));
    return (
        <div className={styles.wrapper}>
            <div className={styles.backArrow} onClick={() => navigate(-1)}>
                <Icons variants="backArrow2" />
            </div>
            <div className={styles.steps}>
                <Steps stepsCount={3} activeStep={activeStep || 1} />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Main;
