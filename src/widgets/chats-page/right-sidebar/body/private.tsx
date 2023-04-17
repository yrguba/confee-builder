import React, { useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Outlet, useLocation } from 'react-router-dom';

import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';
import { useScrollTo, useToggle, useInView, useSize } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import Header from '../header';

function PrivateChatInfoFromChatsPage() {
    const { pathname } = useLocation();

    const [visible, toggle] = useToggle(true);

    const scroll: Record<string, number> = {
        images: -100,
        videos: 100,
        files: 300,
    };

    const navRefBase = useRef<HTMLDivElement>(null);
    const [executeScroll, navRef] = useScrollTo();
    const { ref: navRef2, inView } = useInView();
    const { width } = useSize();

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
                    <UserDossier direction="column" />
                </div>
                <div className={styles.nav} ref={mergeRefs([navRefBase, navRef, navRef2])}>
                    <ChatContentNav />
                </div>
                {!inView && width < 680 && (
                    <div className={styles.navSticky} ref={mergeRefs([navRef])}>
                        <ChatContentNav />
                    </div>
                )}
                <Box.Animated key={pathname} visible className={styles.outlet}>
                    <Outlet />
                </Box.Animated>
            </div>
        </Box.Animated>
    );
}

export default PrivateChatInfoFromChatsPage;
