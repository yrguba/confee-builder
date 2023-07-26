import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Header } from 'widgets';

import styles from './styles.module.scss';
import { ContactsModal } from '../../../features/user';

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
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;
