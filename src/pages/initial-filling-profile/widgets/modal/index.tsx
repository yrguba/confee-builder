import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { viewerApi } from 'entities/viewer';
import { Icons, Steps } from 'shared/ui';

import styles from './styles.module.scss';

function Modal() {
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const { mutate: handleLogout } = viewerApi.handleLogout();
    const activeStep = Number(pathname.slice(-1));

    const goBack = () => {
        if (pathname === '/filling_profile' || pathname === '/step1') {
            handleLogout(null, {
                onSuccess: () => window.location.reload(),
            });
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.backArrow} onClick={goBack}>
                <Icons variants="arrow-left" />
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

export default Modal;
