import React from 'react';

import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';

import styles from './styles.module.scss';

function PrivateChatInfoRightSidebarChatsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.dossier}>
                <UserDossier direction="column" />
            </div>
            <div className={styles.nav}>
                <ChatContentNav />
            </div>
        </div>
    );
}

export default PrivateChatInfoRightSidebarChatsPage;
