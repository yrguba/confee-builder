import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import useRecognizeSpeech from '../../../../shared/hooks/useRecognizeSpeech';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useRecognizeSpeech();
    useEffect(() => {
        if (pathname === '/') {
            navigate('/chats');
        }
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
