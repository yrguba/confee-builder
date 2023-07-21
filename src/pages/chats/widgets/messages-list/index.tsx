import React from 'react';
import { useLocation } from 'react-router-dom';

import { useChatStore } from 'entities/chat';
import { ChatHeaderMenu } from 'features/chat';
import { MessagesList as MessagesListFeature } from 'features/message';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function MessagesList() {
    const { pathname } = useLocation();

    const visibleHeaderMenu = useChatStore.use.visibleHeaderMenu();

    return (
        <Box.Animated visible key={pathname.split('/')[4]} className={styles.wrapper}>
            <MessagesListFeature />
            <Box.Animated visible={visibleHeaderMenu} className={styles.headerMenu}>
                <ChatHeaderMenu />
            </Box.Animated>
        </Box.Animated>
    );
}

export default MessagesList;
