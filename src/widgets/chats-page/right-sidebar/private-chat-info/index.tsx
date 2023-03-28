import React from 'react';

import { UserDossier } from 'features/user';

import styles from './styles.module.scss';

function PrivateChatInfoRightSidebarChatsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.dossier}>
                <UserDossier direction="column" />
            </div>
            <div className={styles.content}>wdd</div>
        </div>
    );
}

export default PrivateChatInfoRightSidebarChatsPage;
