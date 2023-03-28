import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Icons } from 'shared/ui';

import PrivateChatInfoRightSidebarChatsPage from './private-chat-info';
import styles from './styles.module.scss';

function RightSidebarChatsPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const path = pathname.split('/').splice(-2, 1).join();

    const dictionary: Record<string, { title: string; component: ReactNode }> = {
        private_chat: {
            title: 'Информация',
            component: <PrivateChatInfoRightSidebarChatsPage />,
        },
    };

    const closeSidebar = () => {
        const path = pathname.split('/');
        path.splice(-2);
        navigate(path.join('/'));
    };

    const current = dictionary[path];

    return (
        <Box.Animated visible={!!current} className={styles.wrapper} animationVariant="autoWidth">
            <div className={styles.header}>
                <div className={styles.title}>{current?.title}</div>
                <div onClick={closeSidebar} className={styles.icon}>
                    <Icons variants="exit" />
                </div>
            </div>
            <div className={styles.outlet}>{current?.component}</div>
        </Box.Animated>
    );
}

export default RightSidebarChatsPage;
