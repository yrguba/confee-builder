import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ChatContentNav, ChatDossier } from 'features/chat';
import { useScrollTo, useToggle } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import Header from '../header';

function GroupChatInfoFromChatsPage() {
    const { pathname } = useLocation();

    const [visible, toggle] = useToggle(true);

    const scroll: Record<string, number> = {
        users: -100,
        images: 50,
        videos: 220,
        files: 400,
    };

    const [executeScroll, navRef] = useScrollTo();

    useEffect(() => {
        const lastPath = pathname.split('/').pop();
        lastPath && executeScroll({ left: scroll[lastPath] });
    }, [pathname]);

    return (
        <Box.Animated visible={visible} className={styles.wrapper} animationVariant="autoWidth">
            <div className={styles.header}>
                <Header toggleVisible={toggle} />
            </div>
            <div className={styles.main}>
                <div className={styles.dossier}>
                    <ChatDossier direction="column" />
                </div>
                <div className={styles.nav} ref={navRef}>
                    <ChatContentNav withUsers />
                </div>

                <Box.Animated key={pathname} visible className={styles.outlet}>
                    <Outlet />
                </Box.Animated>
            </div>
        </Box.Animated>
    );
}

export default GroupChatInfoFromChatsPage;
