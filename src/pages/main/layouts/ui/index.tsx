import React from 'react';
import { Outlet } from 'react-router-dom';

import { useRouter } from 'shared/hooks';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const { params } = useRouter();

    const currentlyPlaying = Audio.store.use.currentlyPlaying();

    return (
        <>
            <div
                className={styles.wrapper}
                style={{
                    height: !currentlyPlaying.value?.src ? '100vh' : params.chat_id ? '100vh' : 'calc(100vh - 60px)',
                }}
            >
                <div className={styles.navbar}>
                    <Navbar />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MainLayout;
