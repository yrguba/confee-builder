import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';
import { useToggle } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import Header from '../header';

function PrivateChatInfoFromChatsPage() {
    const { pathname } = useLocation();

    const [visible, toggle] = useToggle(true);

    return (
        <Box.Animated visible={visible} className={styles.wrapper} animationVariant="autoWidth">
            <div className={styles.header}>
                <Header toggleVisible={toggle} />
            </div>
            <div className={styles.main}>
                <div className={styles.dossier}>
                    <UserDossier direction="column" />
                </div>
                <div className={styles.nav}>
                    <ChatContentNav />
                </div>
                <div className={styles.outlet}>
                    <Box.Animated key={pathname} visible className={styles.wrapper}>
                        <Outlet />
                    </Box.Animated>
                </div>
            </div>
        </Box.Animated>
    );
}

export default PrivateChatInfoFromChatsPage;
