import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import Header from '../widgets/header';

function MainLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/') {
            navigate('/chats');
        }
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
