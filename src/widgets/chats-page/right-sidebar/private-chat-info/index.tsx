import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';

import styles from './styles.module.scss';
import { Box, Icons } from '../../../../shared/ui';

function PrivateChatInfoFromChatsPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const closeSidebar = () => {
        const path = pathname.split('/');
        path.splice(-2);
        navigate(path.join('/'));
    };

    return (
        <Box.Animated visible className={styles.wrapper} animationVariant="autoWidth">
            <div className={styles.header}>
                <div className={styles.title}>Информация</div>
                <div onClick={closeSidebar} className={styles.icon}>
                    <Icons variants="exit" />
                </div>
            </div>
            <div className={styles.dossier}>
                <UserDossier direction="column" />
            </div>
            <div className={styles.nav}>
                <ChatContentNav />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default PrivateChatInfoFromChatsPage;
