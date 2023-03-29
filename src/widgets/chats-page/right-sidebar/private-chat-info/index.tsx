import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';
import { useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import { Box, Icons } from '../../../../shared/ui';
import Header from '../header';

function PrivateChatInfoFromChatsPage() {
    const { pathname } = useLocation();

    const [visible, toggle] = useToggle(true);

    return (
        <Box.Animated visible={visible} className={styles.wrapper} animationVariant="autoWidth">
            <Header toggleVisible={toggle} />
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
        </Box.Animated>
    );
}

export default PrivateChatInfoFromChatsPage;
