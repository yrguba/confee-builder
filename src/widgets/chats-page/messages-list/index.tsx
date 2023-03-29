import React from 'react';
import { useLocation } from 'react-router-dom';

import { MessagesList } from 'features/message';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function MessagesListForChatsPage() {
    const { pathname } = useLocation();
    return (
        <Box.Animated visible key={pathname.split('/')[4]} className={styles.wrapper}>
            <MessagesList />
        </Box.Animated>
    );
}

export default MessagesListForChatsPage;
